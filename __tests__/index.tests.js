import { notAsame } from './src/index.js';


const sample = `{
    - follow: false
      host: hexlet.io
    - proxy: 123.234.53.22
    - timeout: 50
    + timeout: 20
    +  verbose: true
    }`;



test('notAsame', () => {
    expect(notAsame ('./file1.js', './file1.js')).toEqual(sample);
  });


