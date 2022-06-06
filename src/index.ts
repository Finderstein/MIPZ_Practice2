import * as ts from 'typescript';
import * as path from 'path';
import { analyze } from './analyzer';
import * as fs from 'fs';

const libraryPath = process.argv[2];

if (!libraryPath) {
	throw new Error('Expected library path argument is empty');
}

const tsconfigPath = path.join(path.parse(libraryPath).dir, 'tsconfig.json');

let tsconfig = {};
try {
	tsconfig = JSON.parse(fs.readFileSync(tsconfigPath, 'utf8'));
} catch {
	console.warn('Error while loading tsconfig, using default config!');
}

const program = ts.createProgram({
	rootNames: [libraryPath],
	options: tsconfig,
});

const metrics = analyze(program);
console.log(metrics);
