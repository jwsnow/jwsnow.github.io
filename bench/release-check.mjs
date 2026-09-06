import fs from 'node:fs';

const read = name => fs.readFileSync(new URL(name, import.meta.url), 'utf8');
const app = read('app.js');
const index = read('index.html');
const sw = read('sw.js');
const readme = read('README.md');
const version = app.match(/const APP_VERSION = '([^']+)'/)?.[1];
if (!version) throw new Error('APP_VERSION was not found in app.js');

const checks = [
  ['app modeler query', app.includes(`google-ink-modeler.js?v=${version}`)],
  ['index CSS query', index.includes(`styles.css?v=${version}`)],
  ['index app query', index.includes(`app.js?v=${version}`)],
  ['Files milestone label', index.includes(`Milestone ${version}`)],
  ['service-worker cache', sw.includes(`pdf-workbench-m${version}-v1`)],
  ['service-worker app query', sw.includes(`app.js?v=${version}`)],
  ['service-worker CSS query', sw.includes(`styles.css?v=${version}`)],
  ['service-worker modeler query', sw.includes(`google-ink-modeler.js?v=${version}`)],
  ['README heading', readme.includes(`Milestone ${version}`)],
];
const failed = checks.filter(([, ok]) => !ok).map(([label]) => label);
if (failed.length) {
  console.error(`Release consistency failed for ${version}: ${failed.join(', ')}`);
  process.exit(1);
}
console.log(`Release consistency OK: ${version}`);
