import { Command } from 'commander';
import { notAsame } from '../src/index.js';
const program = new Command();

program
    .name('gendiff')
    .description('Compares two files and shows a difference.')
    .option('-f, --format <type>', 'output format')
    .arguments('<filepath1> <filepath2>')
    .action(notAsame);
    
    
program.parse();

export default program;