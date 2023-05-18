import { test, expect } from '@jest/globals';
import { notAsame, isEqual } from '../src/index.js';
import { sample1, sample2 } from '../__fixtures__/fortest.js';
import { formatParse } from '../src/parsers.js';

test('notAsame', () => {
  expect(notAsame('./__fixtures__/file1.json', './__fixtures__/file2.json')).toEqual(sample1);
});

test('formatParse', () => {
  expect(formatParse('./__fixtures__/file1.json')).toEqual({
    follow: false,
    host: 'hexlet.io',
    proxy: '123.234.53.22',
    timeout: 50,
  });
  expect(formatParse('./__fixtures__/file1.yml')).toEqual({
    host: 'hexlet.io,',
    timeout: '50,',
    proxy: '123.234.53.22,',
    follow: false
  });
});

test('isEqual', () => {
  expect(isEqual(sample2, sample2)).toEqual(true);
});
