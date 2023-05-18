import { test, expect } from '@jest/globals';
import { notAsame, isEqual } from '../src/index.js';
import { sample1, sample2 } from '../__fixtures__/fortest.js';

test('notAsame', () => {
  expect(notAsame('./__fixtures__/file1.json', './__fixtures__/file2.json')).toEqual(sample1);
});

test('isEqual', () => {
  expect(isEqual(sample2, sample2)).toEqual(true);
});
