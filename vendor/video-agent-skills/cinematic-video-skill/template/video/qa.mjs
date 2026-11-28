import {bundle} from '@remotion/bundler';
import {renderStill, selectComposition} from '@remotion/renderer';
import fs from 'fs'; import path from 'path';
const tl = JSON.parse(fs.readFileSync('src/timeline.json'));
const only = process.argv[2] ? process.argv[2].split(',') : null;
const out = path.resolve('../build/qa'); fs.mkdirSync(out, {recursive: true});
const serveUrl = await bundle({entryPoint: path.resolve('src/index.ts')});
const inputProps = {qa: true};
const composition = await selectComposition({serveUrl, id: 'Film', inputProps});
let t = 0; const jobs = [];
for (const s of tl.scenes) {
  if (!only || only.includes(s.id)) {
    jobs.push([s.id + '_a', Math.round((t + s.dur * 0.55) * 30)]);
    jobs.push([s.id + '_b', Math.round((t + s.dur - 1.0) * 30)]);
  }
  t += s.dur;
}
let fails = 0;
for (const [name, frame] of jobs) {
  let log = '';
  await renderStill({composition, serveUrl, inputProps, frame, output: `${out}/${name}.jpg`, imageFormat: 'jpeg', jpegQuality: 80,
    onBrowserLog: (l) => { if (l.text.includes('QA_FRAME')) log = l.text; }});
  const bad = log.includes('QA_FAIL'); if (bad) fails++;
  console.log(`${name.padEnd(16)} f=${frame} ${bad ? log.slice(log.indexOf('QA_FAIL')) : (log ? 'OK ' + log.split(' ')[2] : 'NO-LOG')}`);
}
console.log('FAILS', fails, '/', jobs.length);
process.exit(0);
