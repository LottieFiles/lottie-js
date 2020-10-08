import fetch from 'cross-fetch';

import { Animation } from './Animation';
function sortObjectKeys(obj: Record<string, any>) {
  return Object.keys(obj)
    .sort()
    .reduce((acc: Record<string, any>, key: string) => {
      if (Array.isArray(obj[key])) {
        acc[key] = obj[key].map(sortObjectKeys);
      }
      if (typeof obj[key] === 'object') {
        acc[key] = sortObjectKeys(obj[key]);
      } else {
        acc[key] = obj[key];
      }
      return acc;
    }, {});
}

test('Load an animation', async () => {
  const result = await fetch('https://assets1.lottiefiles.com/packages/lf20_u4j3xm6r.json');
  const json = await result.json();

  const anim = Animation.fromJSON(json);

  // console.log([...useRegistry().keys()].filter((p: Property) => p.type === PropertyType.COLOR));
  // console.log(anim.getColors());

  // console.log(inspect(anim, false, 20, true));
  // console.log(JSON.stringify(sortObject(anim)));

  /**
   * Sort the converted Lottie and the original lottie objects by key to make it easier to do a
   * simple string comparison.
   */
  expect(sortObjectKeys(anim).toString()).toBe(sortObjectKeys(json).toString());
});
