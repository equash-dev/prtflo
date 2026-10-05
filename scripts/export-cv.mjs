// Regenerate the download after editing config/cv.json. Requires Python/reportlab.
import fs from 'node:fs';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import { SITE } from '../config/site.ts';

const root = process.cwd();
const cv = JSON.parse(fs.readFileSync(path.join(root, 'config/cv.json'), 'utf8'));
const result = spawnSync('python', [path.join(root, 'scripts/export-cv.py')], {
  input: JSON.stringify({ ...cv, email: SITE.contactEmail }),
  encoding: 'utf8',
});
if (result.stdout) process.stdout.write(result.stdout);
if (result.stderr) process.stderr.write(result.stderr);
if (result.error) throw result.error;
process.exitCode = result.status ?? 1;
