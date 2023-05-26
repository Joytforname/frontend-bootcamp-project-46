import { test, expect } from '@jest/globals';
import { readFileSync } from 'fs';
import {
  sample1, sample4, sample5, sample6,
} from '../__fixtures__/fortest.js';
import { format, parse } from '../src/parsers.js';
import final from '../src/index.js';

test('final', () => {
  expect(final('./__fixtures__/file1.json', './__fixtures__/file2.json')).toEqual(sample1);
  expect(final('./__fixtures__/step6File1.json', './__fixtures__/step6File2.json')).toEqual(sample4);
  expect(final('./__fixtures__/step6File1.json', './__fixtures__/step6File2.json', 'plain')).toEqual(sample5);
  expect(final('./__fixtures__/step6File1.json', './__fixtures__/step6File2.json', 'json')).toEqual(sample6);
});

test('parse', () => {
  expect(parse(readFileSync('./__fixtures__/file1.json'), format('./__fixtures__/file1.json'))).toEqual({
    follow: false,
    host: 'hexlet.io',
    proxy: '123.234.53.22',
    timeout: 50,
  });
  expect(parse(readFileSync('./__fixtures__/file1.yml'), format('./__fixtures__/file1.yml'))).toEqual({
    host: 'hexlet.io',
    timeout: 50,
    proxy: '123.234.53.22',
    follow: false,
  });
});
