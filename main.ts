// SPDX-License-Identifier: MIT
// Entrypoint for make.fun best-national-statistics-site-20261126-0539.
// Copies static site files (app/) and browser captures (screenshots/) into
// the output volume and emits canonical dossier.json via vendor/makefun-frontend.ts.

import { cpSync, existsSync, mkdirSync, readdirSync, rmSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { buildDossier } from './vendor/makefun-frontend.ts';

const ROOT_DIR = fileURLToPath(new URL('.', import.meta.url));
const OUTPUT_DIR = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

const DOSSIER_CAPS = {
  text_max_bytes: 163840,
  screenshots: { max: 4, max_bytes: 262144 },
  app_max_files: 993,
  app_max_bytes: 16777216,
};

function cleanOutputRoot(outputDir: string): void {
  if (!existsSync(outputDir)) return;
  for (const entry of readdirSync(outputDir)) {
    if (entry === 'lost+found') continue;
    rmSync(join(outputDir, entry), { recursive: true, force: true });
  }
}

function syncDirectory(sourceDir: string, targetDir: string): void {
  mkdirSync(targetDir, { recursive: true });
  if (existsSync(sourceDir)) {
    cpSync(sourceDir, targetDir, { recursive: true });
  }
}

export function emitEntry(rootDir = ROOT_DIR, outputDir = OUTPUT_DIR): Uint8Array {
  mkdirSync(outputDir, { recursive: true });
  cleanOutputRoot(outputDir);
  syncDirectory(join(rootDir, 'app'), join(outputDir, 'app'));
  syncDirectory(join(rootDir, 'screenshots'), join(outputDir, 'screenshots'));
  const dossier = buildDossier(outputDir, DOSSIER_CAPS);
  writeFileSync(join(outputDir, 'dossier.json'), dossier);
  return dossier;
}

emitEntry();
