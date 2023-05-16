import { Command } from 'commander';
import { makeStatus } from '../src/index.js';
const program = new Command();

program
    .name('gendiff')
    .description('Compares two files and shows a difference.')
    .version('0.0.1')
    .option('-f, --format <type>', 'output format')
    .arguments('<filepath1> <filepath2>')
    .action(makeStatus)
    
program.parse();

export default program;