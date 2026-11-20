// gta6-clipper-01 entry program (Node 22, standard library only).
//
// The entry itself is a public YouTube Short whose address lives in
// VIDEO.json at the repository root. The grader expects that file to
// appear in /output once this program has run, so the whole job here is
// a faithful copy: take VIDEO.json from the bot directory and write it
// to the output directory, byte for byte, failing loudly if it is not
// there.
//
// Outside the grader's container, MAKEFUN_BOT_DIR and MAKEFUN_OUTPUT_DIR
// point the program at a local checkout and a scratch output folder:
//   mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts

import { copyFileSync, mkdirSync, statSync } from "node:fs";
import { join } from "node:path";

function main(): void {
  const botDir = process.env.MAKEFUN_BOT_DIR ?? "/bot";
  const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
  const source = join(botDir, "VIDEO.json");
  const target = join(outputDir, "VIDEO.json");
  mkdirSync(outputDir, { recursive: true });
  copyFileSync(source, target);
  // The copy is the whole contract, so prove it landed whole: a staged
  // file that is even one byte short would name the wrong video.
  const expected = statSync(source).size;
  const staged = statSync(target).size;
  if (staged !== expected) {
    throw new Error(`staged VIDEO.json is ${staged} bytes, source is ${expected}`);
  }
}

try {
  main();
} catch (error) {
  console.error(`main: could not stage VIDEO.json: ${(error as Error).message}`);
  process.exit(1);
}
