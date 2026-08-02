(function () {
  'use strict';

  const MB = 1024 * 1024;
  const TARGET_BYTES = 10 * MB;
  const LETTER = Object.freeze({
    portrait: Object.freeze({ width: 612, height: 792 }),
    landscape: Object.freeze({ width: 792, height: 612 })
  });
  const LETTER_PIXELS = Object.freeze({
    portrait: Object.freeze({ width: 1275, height: 1650 }),
    landscape: Object.freeze({ width: 1650, height: 1275 })
  });

  function formatBytes(bytes) {
    if (!Number.isFinite(bytes) || bytes < 0) return 'Unknown size';
    if (bytes < 1024) return `${bytes} bytes`;
    if (bytes < MB) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / MB).toFixed(2)} MB`;
  }

  function safeBaseName(name, fallback) {
    const cleaned = String(name || fallback || 'document')
      .replace(/\.[^.]+$/, '')
      .replace(/[<>:"/\\|?*\u0000-\u001F]/g, '-')
      .replace(/\s+/g, ' ')
      .trim();
    return cleaned || fallback || 'document';
  }

  function downloadBlob(blob, filename) {
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    link.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1500);
  }

  function canvasToBlob(canvas, type, quality) {
    return new Promise((resolve, reject) => {
      canvas.toBlob((blob) => {
        if (blob) resolve(blob);
        else reject(new Error('The browser could not encode an image.'));
      }, type, quality);
    });
  }

  function makeCanvas(width, height) {
    const canvas = document.createElement('canvas');
    canvas.width = Math.max(1, Math.round(width));
    canvas.height = Math.max(1, Math.round(height));
    return canvas;
  }

  function downscaleCanvas(source, width, height) {
    const target = makeCanvas(width, height);
    const ctx = target.getContext('2d', { alpha: false });
    ctx.fillStyle = '#fff';
    ctx.fillRect(0, 0, target.width, target.height);
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';
    ctx.drawImage(source, 0, 0, target.width, target.height);
    return target;
  }

  async function bestJpegAtCurrentSize(canvas, budgetBytes, minQuality, maxQuality) {
    const minimum = await canvasToBlob(canvas, 'image/jpeg', minQuality);
    if (minimum.size > budgetBytes) {
      return { fits: false, blob: minimum, quality: minQuality };
    }

    let bestBlob = minimum;
    let bestQuality = minQuality;
    let low = minQuality;
    let high = maxQuality;

    for (let i = 0; i < 8; i += 1) {
      const quality = (low + high) / 2;
      const blob = await canvasToBlob(canvas, 'image/jpeg', quality);
      if (blob.size <= budgetBytes) {
        bestBlob = blob;
        bestQuality = quality;
        low = quality;
      } else {
        high = quality;
      }
    }

    return { fits: true, blob: bestBlob, quality: bestQuality };
  }

  async function encodeCanvasToJpegBudget(sourceCanvas, budgetBytes, options) {
    const settings = Object.assign({
      minQuality: 0.10,
      maxQuality: 0.92,
      minimumLongSide: 96
    }, options || {});

    let working = sourceCanvas;
    let ownsWorking = false;
    let lastResult = null;

    try {
      for (let pass = 0; pass < 12; pass += 1) {
        const result = await bestJpegAtCurrentSize(
          working,
          Math.max(700, Math.floor(budgetBytes)),
          settings.minQuality,
          settings.maxQuality
        );
        lastResult = result;

        if (result.fits) {
          return {
            blob: result.blob,
            width: working.width,
            height: working.height,
            quality: result.quality
          };
        }

        const longSide = Math.max(working.width, working.height);
        if (longSide <= settings.minimumLongSide) break;

        const ratio = Math.sqrt(Math.max(0.02, budgetBytes / result.blob.size)) * 0.90;
        const shrink = Math.min(0.82, Math.max(0.45, ratio));
        let nextWidth = Math.max(1, Math.floor(working.width * shrink));
        let nextHeight = Math.max(1, Math.floor(working.height * shrink));

        if (Math.max(nextWidth, nextHeight) < settings.minimumLongSide) {
          const floorScale = settings.minimumLongSide / longSide;
          nextWidth = Math.max(1, Math.floor(working.width * floorScale));
          nextHeight = Math.max(1, Math.floor(working.height * floorScale));
        }

        const next = downscaleCanvas(working, nextWidth, nextHeight);
        if (ownsWorking) {
          working.width = 1;
          working.height = 1;
        }
        working = next;
        ownsWorking = true;
      }

      return {
        blob: lastResult.blob,
        width: working.width,
        height: working.height,
        quality: lastResult.quality
      };
    } finally {
      if (ownsWorking) {
        working.width = 1;
        working.height = 1;
      }
    }
  }

  function orientationFor(width, height) {
    return width > height ? 'landscape' : 'portrait';
  }

  function fitInside(sourceWidth, sourceHeight, boxWidth, boxHeight, allowUpscale) {
    let scale = Math.min(boxWidth / sourceWidth, boxHeight / sourceHeight);
    if (!allowUpscale) scale = Math.min(1, scale);
    return {
      width: Math.max(1, Math.round(sourceWidth * scale)),
      height: Math.max(1, Math.round(sourceHeight * scale)),
      scale
    };
  }

  function drawSourceToLetterCanvas(source, sourceWidth, sourceHeight) {
    const orientation = orientationFor(sourceWidth, sourceHeight);
    const box = LETTER_PIXELS[orientation];
    const fitted = fitInside(sourceWidth, sourceHeight, box.width, box.height, false);
    const canvas = makeCanvas(fitted.width, fitted.height);
    const ctx = canvas.getContext('2d', { alpha: false });
    ctx.fillStyle = '#fff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';
    ctx.drawImage(source, 0, 0, canvas.width, canvas.height);
    return { canvas, orientation };
  }

  async function loadImageSource(file) {
    let blob = file;
    const lowerName = String(file.name || '').toLowerCase();
    const isHeic = /\.(heic|heif)$/.test(lowerName) || /image\/(heic|heif)/i.test(file.type || '');

    if (isHeic) {
      if (typeof window.heic2any !== 'function') {
        throw new Error('The HEIC conversion library did not load. Check the internet connection and reload the page.');
      }
      const converted = await window.heic2any({
        blob: file,
        toType: 'image/jpeg',
        quality: 0.95
      });
      blob = Array.isArray(converted) ? converted[0] : converted;
    }

    if ('createImageBitmap' in window) {
      try {
        const bitmap = await createImageBitmap(blob, { imageOrientation: 'from-image' });
        return {
          source: bitmap,
          width: bitmap.width,
          height: bitmap.height,
          close: () => bitmap.close()
        };
      } catch (error) {
        // Fall through to an HTMLImageElement for formats/options not accepted by createImageBitmap.
      }
    }

    const url = URL.createObjectURL(blob);
    try {
      const image = await new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve(img);
        img.onerror = () => reject(new Error(`The browser could not read ${file.name}.`));
        img.src = url;
      });
      return {
        source: image,
        width: image.naturalWidth,
        height: image.naturalHeight,
        close: () => URL.revokeObjectURL(url)
      };
    } catch (error) {
      URL.revokeObjectURL(url);
      throw error;
    }
  }

  function imageBudgetForPages(pageCount, scale) {
    const reserve = Math.min(2.2 * MB, 320 * 1024 + pageCount * 1800);
    return Math.max(64 * 1024, (TARGET_BYTES - reserve) * (scale || 1));
  }

  function setBusy(button, busy, busyText) {
    if (!button) return;
    if (busy) {
      button.dataset.originalText = button.textContent;
      button.textContent = busyText || 'Working…';
      button.disabled = true;
    } else {
      button.textContent = button.dataset.originalText || button.textContent;
      button.disabled = false;
    }
  }

  function installDropZone(zone, input, onFiles) {
    ['dragenter', 'dragover'].forEach((eventName) => {
      zone.addEventListener(eventName, (event) => {
        event.preventDefault();
        zone.classList.add('dragover');
      });
    });
    ['dragleave', 'drop'].forEach((eventName) => {
      zone.addEventListener(eventName, (event) => {
        event.preventDefault();
        zone.classList.remove('dragover');
      });
    });
    zone.addEventListener('drop', (event) => {
      const files = Array.from(event.dataTransfer.files || []);
      if (files.length) onFiles(files);
    });
    input.addEventListener('change', () => {
      const files = Array.from(input.files || []);
      if (files.length) onFiles(files);
      input.value = '';
    });
  }

  window.PdfTools = Object.freeze({
    MB,
    TARGET_BYTES,
    LETTER,
    LETTER_PIXELS,
    formatBytes,
    safeBaseName,
    downloadBlob,
    makeCanvas,
    canvasToBlob,
    encodeCanvasToJpegBudget,
    orientationFor,
    fitInside,
    drawSourceToLetterCanvas,
    loadImageSource,
    imageBudgetForPages,
    setBusy,
    installDropZone
  });
}());
