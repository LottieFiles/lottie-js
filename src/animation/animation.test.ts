import fetch from 'cross-fetch';

import { useRegistry } from '../utils/use-registry';
import { Color } from '../values';
import { Animation } from './animation';

function sortObjectKeys(value: any): Record<string, any> {
  if (Array.isArray(value)) {
    const newValues = value.map(v => sortObjectKeys(v));
    newValues.sort();
    return newValues;
  } else if (value && typeof value === 'object') {
    const objectKeys = Object.keys(value);
    objectKeys.sort();
    return Object.fromEntries(objectKeys.map(key => [key, sortObjectKeys(value[key])]));
  } else {
    return value;
  }
}

beforeEach(() => {
  const registry = useRegistry();
  registry.clear();
});

test('Load an animation', async () => {
  const result = await fetch('https://assets1.lottiefiles.com/packages/lf20_SUdZc0.json');
  const json = await result.json();
  json.meta = {};

  const anim = await Animation.fromURL('https://assets1.lottiefiles.com/packages/lf20_SUdZc0.json');

  const sortedJson = sortObjectKeys(json);
  const sortedAnim = sortObjectKeys(JSON.parse(JSON.stringify(anim)));

  /**
   * Sort the converted Lottie and the original lottie objects by key to make it easier to do a
   * simple string comparison.
   */
  expect(sortedAnim).toStrictEqual(sortedJson);
});

test('Get unique colors', async () => {
  const anim = await Animation.fromURL('https://assets2.lottiefiles.com/private_files/lf30_k2c7t4.json');

  const colors = [
    Color.fromJSON([1, 1, 1, 1]),
    Color.fromJSON([0.997385600969, 0.721629961799, 0.301171276616, 1]),
    Color.fromJSON([0.803921987496, 0.062001998752, 0.062001998752, 1]),
  ];

  expect(anim.colors).toEqual(colors);
});

test('Get text layer', async () => {
  const anim = await Animation.fromURL('https://assets10.lottiefiles.com/packages/lf20_8MANkV.json');
  expect(Object.keys(anim.textLayers)).toContain('0.text_two');
  expect(Object.keys(anim.textLayers)).toContain('1.text_one');
});

test('Must have expected number of colors', async () => {
  const color1 = await Animation.fromURL('https://assets9.lottiefiles.com/packages/lf20_ecmsvaa7.json');
  const color2 = await Animation.fromURL('https://assets3.lottiefiles.com/packages/lf20_pmxrarjp.json');

  expect(color1.colors.length).toEqual(1);
  expect(color2.colors.length).toEqual(1);
});
