#!/usr/bin/env node
import { Command } from 'commander';
import final from '../src/index.js';

const program = new Command();

program
  .name('gendiff')
  .description('Compares two files and shows a difference.')
  .option('-f, --format <type>', 'output format', 'stylish')
  .arguments('<filepath1> <filepath2>')
  .action((arg1, arg2) => console.log(final(arg1, arg2, program.opts().format)));

program.parse();
