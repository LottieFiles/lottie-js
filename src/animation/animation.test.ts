import fetch from 'cross-fetch';

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
  const result = await fetch('https://assets1.lottiefiles.com/packages/lf20_u4j3xm6r.json');
  const json = await result.json();

  const anim = Animation.fromJSON(json);

  // console.log([...useRegistry().keys()].filter((p: Property) => p.type === PropertyType.COLOR));
  // console.log(anim.colors);

  // console.log(inspect(anim, false, 20, true));
  // console.log(JSON.stringify(sortObject(anim)));

  /**
   * Sort the converted Lottie and the original lottie objects by key to make it easier to do a
   * simple string comparison.
   */
  expect(sortObjectKeys(anim).toString()).toBe(sortObjectKeys(json).toString());
});
