import { test, expect } from '@jest/globals';
import { notAsame } from '../src/index.js';
import { sample1 } from '../__fixtures__/fortest.js';

test('notAsame', () => {
  expect(notAsame('./__fixtures__/file1.json', './__fixtures__/file2.json')).toEqual(sample1);
});
