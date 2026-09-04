/*
 * PDF Workbench Google-style handwriting modeler experiment.
 *
 * This is an independent JavaScript implementation of the position-modeling
 * algorithms published by Google's Ink Stroke Modeler project:
 *   https://github.com/google/ink-stroke-modeler
 *
 * Google Ink Stroke Modeler is Copyright 2022 Google LLC and is distributed
 * under the Apache License 2.0. This file follows the published mathematical
 * description (wobble smoothing, minimum-rate resampling, spring/mass/drag
 * position modeling, and stroke-end prediction) rather than copying the C++
 * source. Spring/drag use the upstream starting values; Workbench's wobble
 * window/speed thresholds are tuned in native PDF-point/second coordinates
 * from the latest real iPad trace using the upstream tuning guidance.
 */

export const GOOGLE_INK_RENDERER = 'google-ink-v1';

export const DEFAULT_GOOGLE_INK_PARAMS = Object.freeze({
  // Workbench-specific starting values follow upstream tuning guidance,
  // calibrated from the 5.6.5 iPad trace (~410 stored inputs/s and roughly
  // 287 PDF points/s median path speed): timeout ~= 2.5/input-rate; wobble
  // floor/ceiling ~= 2%/3% of expected speed.
  wobbleTimeout: 0.006,
  wobbleSpeedFloor: 6,
  wobbleSpeedCeiling: 9,
  springMassConstant: 11 / 32400,
  dragConstant: 72,
  minOutputRate: 180,
  endOfStrokeStoppingDistance: 0.001,
  endOfStrokeMaxIterations: 20,
});

const clamp = (value, min, max) => Math.max(min, Math.min(max, value));
const lerp = (a, b, t) => a + (b - a) * t;
const dist = (a, b) => Math.hypot((b?.x || 0) - (a?.x || 0), (b?.y || 0) - (a?.y || 0));

function toModelPoint(point) {
  return { x: Number(point?.x) || 0, y: Number(point?.y) || 0 };
}
function fromTipState(state) {
  return { x:state.x, y:state.y, vx:state.vx, vy:state.vy, t:state.t };
}
function cloneState(state) {
  return state ? { x:state.x, y:state.y, vx:state.vx, vy:state.vy, ax:state.ax, ay:state.ay, t:state.t } : null;
}

export class GoogleInkStrokeModeler {
  constructor(params = {}) {
    this.params = { ...DEFAULT_GOOGLE_INK_PARAMS, ...params };
    this.reset();
  }

  reset() {
    this.rawWindow = [];
    this.lastRaw = null;
    this.lastFiltered = null;
    this.tipState = null;
    this.lastAnchor = null;
    this.lastTime = null;
    this.inputCount = 0;
    this.outputCount = 0;
    this.lastWobbleSpeed = 0;
    this.lastWobbleBlend = 0;
  }

  _monotonicTime(timeSeconds) {
    let t = Number(timeSeconds);
    if (!Number.isFinite(t)) t = this.lastTime == null ? 0 : this.lastTime + 1 / 240;
    if (this.lastTime != null && t <= this.lastTime) t = this.lastTime + 1e-4;
    this.lastTime = t;
    return t;
  }

  _filterRaw(raw, eventType) {
    const previous = this.lastRaw;
    const duration = previous ? Math.max(0, raw.t - previous.t) : 0;
    const distance = previous ? dist(previous, raw) : 0;
    const speed = duration > 0 ? distance / duration : 0;
    const sample = {
      ...raw,
      speed,
      duration,
      distance,
      weightedX: raw.x * duration,
      weightedY: raw.y * duration,
    };
    this.rawWindow.push(sample);
    const timeout = Math.max(0, Number(this.params.wobbleTimeout) || 0);
    while (this.rawWindow.length > 1 && this.rawWindow[0].t < raw.t - timeout) this.rawWindow.shift();
    this.lastRaw = sample;

    // Google sends the final Up position directly into the position modeler
    // (the wobble smoother is used for Move events only), and Down seeds the
    // model exactly at first contact.
    if (eventType === 'down' || eventType === 'up' || !previous || timeout <= 0) {
      this.lastWobbleSpeed = speed;
      this.lastWobbleBlend = 1;
      return { x:raw.x, y:raw.y, t:raw.t };
    }

    let weightedX = 0, weightedY = 0, distanceSum = 0, durationSum = 0;
    for (const p of this.rawWindow) {
      weightedX += Number(p.weightedX) || 0;
      weightedY += Number(p.weightedY) || 0;
      distanceSum += Number(p.distance) || 0;
      durationSum += Number(p.duration) || 0;
    }
    if (!(durationSum > 0)) return { x:raw.x, y:raw.y, t:raw.t };
    const avg = { x:weightedX / durationSum, y:weightedY / durationSum };
    const avgSpeed = distanceSum / durationSum;
    const floor = Number(this.params.wobbleSpeedFloor) || 0;
    const ceiling = Math.max(floor + 1e-9, Number(this.params.wobbleSpeedCeiling) || floor + 1);
    const blend = clamp((avgSpeed - floor) / (ceiling - floor), 0, 1);
    this.lastWobbleSpeed = avgSpeed;
    this.lastWobbleBlend = blend;
    return {
      x: lerp(avg.x, raw.x, blend),
      y: lerp(avg.y, raw.y, blend),
      t: raw.t,
    };
  }

  _integrate(anchor, time, state = this.tipState) {
    if (!state) return null;
    const dt = Math.max(0, time - state.t);
    if (dt <= 0) return cloneState(state);
    const mass = Math.max(1e-9, Number(this.params.springMassConstant) || DEFAULT_GOOGLE_INK_PARAMS.springMassConstant);
    const drag = Math.max(0, Number(this.params.dragConstant) || 0);
    const ax = (anchor.x - state.x) / mass - drag * state.vx;
    const ay = (anchor.y - state.y) / mass - drag * state.vy;
    const vx = state.vx + dt * ax;
    const vy = state.vy + dt * ay;
    return {
      x: state.x + dt * vx,
      y: state.y + dt * vy,
      vx, vy, ax, ay, t: time,
    };
  }

  _modelBetween(previousAnchor, nextAnchor, outputs) {
    if (!this.tipState) return;
    const totalDt = Math.max(0, nextAnchor.t - previousAnchor.t);
    if (totalDt <= 0) return;
    const rate = Math.max(1, Number(this.params.minOutputRate) || 180);
    const steps = Math.max(1, Math.ceil(totalDt * rate));
    for (let i = 1; i <= steps; i += 1) {
      const u = i / steps;
      const anchor = {
        x: lerp(previousAnchor.x, nextAnchor.x, u),
        y: lerp(previousAnchor.y, nextAnchor.y, u),
      };
      const time = lerp(previousAnchor.t, nextAnchor.t, u);
      const candidate = this._integrate(anchor, time);
      if (!candidate) continue;
      this.tipState = candidate;
      outputs.push(fromTipState(candidate));
      this.outputCount += 1;
    }
  }

  _endOfStrokeFromState(initialState, anchor, mutate = false) {
    const outputs = [];
    let state = cloneState(initialState);
    const finish = () => {
      if (mutate && state) this.tipState = cloneState(state);
      return { outputs, state };
    };
    if (!state) return finish();
    const baseDt = 1 / Math.max(1, Number(this.params.minOutputRate) || 180);
    const stop = Math.max(1e-7, Number(this.params.endOfStrokeStoppingDistance) || 0.001);
    const maxIterations = Math.max(1, Math.floor(Number(this.params.endOfStrokeMaxIterations) || 20));
    let dt = baseDt;
    let iterations = 0;
    while (iterations < maxIterations) {
      let accepted = null;
      let tryDt = dt;
      while (iterations < maxIterations && tryDt > 1e-6) {
        iterations += 1;
        const candidate = this._integrate(anchor, state.t + tryDt, state);
        if (!candidate) break;
        const traveled = dist(state, candidate);
        if (traveled < stop) return finish();
        const sx = candidate.x - state.x, sy = candidate.y - state.y;
        const lengthSq = sx*sx + sy*sy;
        const toAnchorX = anchor.x - state.x, toAnchorY = anchor.y - state.y;
        const projection = lengthSq > 1e-12 ? (toAnchorX*sx + toAnchorY*sy) / lengthSq : 1;
        // projection < 1 means the candidate segment has passed the anchor.
        if (projection >= 1 - 1e-9) {
          accepted = candidate;
          break;
        }
        tryDt *= 0.5;
      }
      if (!accepted) break;
      state = accepted;
      dt = tryDt;
      outputs.push(fromTipState(state));
      if (dist(state, anchor) < stop) break;
    }
    return finish();
  }

  update(point, timeSeconds, eventType = 'move') {
    const t = this._monotonicTime(timeSeconds);
    const modelPoint = toModelPoint(point);
    const raw = { x:modelPoint.x, y:modelPoint.y, t };
    const filtered = this._filterRaw(raw, eventType);
    const outputs = [];
    this.inputCount += 1;

    if (!this.tipState || eventType === 'down') {
      this.tipState = { x:filtered.x, y:filtered.y, vx:0, vy:0, ax:0, ay:0, t:filtered.t };
      this.lastFiltered = { ...filtered };
      this.lastAnchor = { x:raw.x, y:raw.y, t:raw.t };
      outputs.push(fromTipState(this.tipState));
      this.outputCount += 1;
      return outputs;
    }

    this._modelBetween(this.lastFiltered, filtered, outputs);
    this.lastFiltered = { ...filtered };
    this.lastAnchor = { x:raw.x, y:raw.y, t:raw.t };

    if (eventType === 'up') {
      const end = this._endOfStrokeFromState(this.tipState, modelPoint, true);
      outputs.push(...end.outputs);
      this.outputCount += end.outputs.length;
    }
    return outputs;
  }

  predict() {
    if (!this.tipState || !this.lastFiltered) return [];
    // Upstream StrokeEndPredictor is fed the wobble-corrected Move position,
    // not the noisier raw observation. Model what would happen if that most
    // recent corrected input were the end of the stroke.
    const anchor = { x:this.lastFiltered.x, y:this.lastFiltered.y };
    return this._endOfStrokeFromState(this.tipState, anchor, false).outputs;
  }

  metrics() {
    return {
      inputs: this.inputCount,
      outputs: this.outputCount,
      wobbleSpeed: this.lastWobbleSpeed,
      wobbleBlend: this.lastWobbleBlend,
      lagPoints: this.tipState && this.lastRaw ? dist(this.tipState, this.lastRaw) : 0,
    };
  }
}

function normalizedTimedPoints(points) {
  const source = Array.isArray(points) ? points : [];
  if (!source.length) return [];
  const result = [];
  let lastT = null;
  for (let i = 0; i < source.length; i += 1) {
    const p = source[i] || {};
    let t = Number(p.t);
    if (!Number.isFinite(t)) {
      if (i === 0) t = 0;
      else {
        const prev = result[result.length - 1];
        const dPoints = Math.hypot((Number(p.x)||0)-prev.x, (Number(p.y)||0)-prev.y);
        const dt = clamp(dPoints / 287, 1 / 480, 1 / 30);
        t = prev.t + dt;
      }
    }
    if (lastT != null && t <= lastT) t = lastT + 1e-4;
    const next = { x:Number(p.x)||0, y:Number(p.y)||0, t };
    result.push(next);
    lastT = t;
  }
  return result;
}

export function modelGoogleInkStroke(points, params = {}) {
  const timed = normalizedTimedPoints(points);
  const started = typeof performance !== 'undefined' && performance.now ? performance.now() : Date.now();
  if (!timed.length) return { points:[], modelMs:0, inputPoints:0, outputPoints:0, endLagPoints:0 };
  if (timed.length === 1) return { points:[{...timed[0],vx:0,vy:0}], modelMs:0, inputPoints:1, outputPoints:1, endLagPoints:0 };
  const modeler = new GoogleInkStrokeModeler(params);
  const modeled = [];
  for (let i = 0; i < timed.length; i += 1) {
    const eventType = i === 0 ? 'down' : (i === timed.length - 1 ? 'up' : 'move');
    const out = modeler.update(timed[i], timed[i].t, eventType);
    for (const p of out) {
      const prev = modeled[modeled.length - 1];
      if (!prev || Math.hypot(p.x-prev.x,p.y-prev.y) > 1e-4 || Math.abs(p.t-prev.t) > 1e-6) modeled.push(p);
    }
  }
  const ended = typeof performance !== 'undefined' && performance.now ? performance.now() : Date.now();
  const metrics = modeler.metrics();
  return {
    points:modeled,
    modelMs:ended-started,
    inputPoints:timed.length,
    outputPoints:modeled.length,
    endLagPoints:metrics.lagPoints,
    wobbleSpeed:metrics.wobbleSpeed,
    wobbleBlend:metrics.wobbleBlend,
  };
}
