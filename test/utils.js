/*
 * Copyright 2019 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */
import crypto from 'crypto';
import { fork } from 'child_process';
import path from 'path';
import fse from 'fs-extra';
import util from 'util';
import { fileURLToPath } from 'url';

// eslint-disable-next-line no-underscore-dangle
const __dirname = path.resolve(fileURLToPath(import.meta.url), '..');

export async function createTestRoot() {
  const dir = path.resolve(__rootdir, 'test', 'tmp', crypto.randomBytes(16)
    .toString('hex'));
  await fse.ensureDir(dir);
  return dir;
}

const ANSI_REGEXP = RegExp([
  '[\\u001B\\u009B][[\\]()#;?]*(?:(?:(?:[a-zA-Z\\d]*(?:;[a-zA-Z\\d]*)*)?\\u0007)',
  '(?:(?:\\d{1,4}(?:;\\d{0,4})*)?[\\dA-PRZcf-ntqry=><~]))',
].join('|'), 'g');

export class TestLogger {
  constructor() {
    this.messages = [];
  }

  _log(level, ...args) {
    this.messages.push(util.format(...args).replace(ANSI_REGEXP, ''));
    // eslint-disable-next-line no-console
    console[level](...args);
  }

  get output() {
    return this.messages.join('\n');
  }

  debug(...args) {
    this._log('debug', ...args);
  }

  info(...args) {
    this._log('info', ...args);
  }

  warn(...args) {
    this._log('warn', ...args);
  }

  error(...args) {
    this._log('error', ...args);
  }
}

export async function validateBundle(bundlePath, cfg) {
  try {
    const child = fork(path.resolve(__dirname, '..', 'node_modules', '@adobe', 'helix-deploy', 'src', 'template', 'validate-bundle.js'), [bundlePath, JSON.stringify(cfg)]);
    const ret = await new Promise((resolve, reject) => {
      child.on('message', resolve);
      child.on('error', reject);
      child.on('exit', (code) => {
        resolve(JSON.stringify({
          status: 'error',
          error: `Child process stopped with exit code ${code}`,
        }));
      });
    });
    return JSON.parse(ret);
  } catch (e) {
    return {
      status: 'error',
      error: e.message,
    };
  }
}
