import { test, expect } from '@jest/globals';
import { sample1 } from '../__fixtures__/fortest.js';
import { formatParse } from '../src/parsers.js';
import final from '../src/index.js';

test('final', () => {
  expect(final('./__fixtures__/file1.json', './__fixtures__/file2.json')).toEqual(sample1);
});

test('formatParse', () => {
  expect(formatParse('./__fixtures__/file1.json')).toEqual({
    follow: false,
    host: 'hexlet.io',
    proxy: '123.234.53.22',
    timeout: 50,
  });
  expect(formatParse('./__fixtures__/file1.yml')).toEqual({
    host: 'hexlet.io',
    timeout: 50,
    proxy: '123.234.53.22',
    follow: false,
  });
});
