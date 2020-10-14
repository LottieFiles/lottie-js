// import clipboardy from 'clipboardy';
import fetch from 'cross-fetch';

// import { inspect } from 'util';
import { Animation } from './animation';

function sortObjectKeys(object: Record<string, any>) {
  return Object.keys(object)
    .sort()
    .reduce((accumulator: Record<string, any>, key: string) => {
      if (Array.isArray(object[key])) {
        accumulator[key] = object[key].map(sortObjectKeys);
      }
      if (typeof object[key] === 'object') {
        accumulator[key] = sortObjectKeys(object[key]);
      } else {
        accumulator[key] = object[key];
      }
      return accumulator;
    }, {});
}

test('Load an animation', async () => {
  const result = await fetch('https://assets1.lottiefiles.com/packages/lf20_SUdZc0.json');
  const json = await result.json();

  const anim = await Animation.fromURL('https://assets1.lottiefiles.com/packages/lf20_SUdZc0.json');

  // console.log(inspect(anim.layers[0], false, 20, true));
  // await clipboardy.write(JSON.stringify(anim));

  const sortedJson = sortObjectKeys(json);
  const sortedAnim = sortObjectKeys(JSON.parse(JSON.stringify(anim)));

  /**
   * Sort the converted Lottie and the original lottie objects by key to make it easier to do a
   * simple string comparison.
   */
  expect(sortedAnim).toEqual(sortedJson);
});

test('Get unique colors', async () => {
  const anim = await Animation.fromURL('https://assets2.lottiefiles.com/private_files/lf30_k2c7t4.json');

  expect(anim.colors).toEqual([
    [255, 255, 255, 1],
    [254, 184, 77, 1],
    [205, 16, 16, 1],
  ]);
});
