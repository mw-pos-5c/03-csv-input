/* tslint:disable:no-console */
import * as fs from 'fs';
import EOL from 'os';

const filename = process.argv[2];
if (filename === undefined) {
    console.log('Missing path to input file');
    process.exit(0);
}

const file = fs.readFileSync(filename, 'utf-8');
const lines = file.split(EOL.EOL);

const result: {[id: string]: number} = {};

for (let i = 1; i < lines.length ; i++) {
    const [_, custId, _2, _3, revenue] = lines[i].split(',');
    result[custId] = (result[custId] || 0) + +revenue;
}

console.log('| customerid |    revenue |\n|------------|------------|');
for (const key in result) {
    if (!result.hasOwnProperty(key)) continue;
    const value = result[key].toFixed(1);
    console.log(`| ${key}${' '.repeat(11-key.length)}|${' '.repeat(11-value.length)}${value} |`);
}
