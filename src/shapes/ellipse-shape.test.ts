import { EllipseShape } from './ellipse-shape';

describe('Test EllipseShape', () => {
  test(`fromJSON() is equal to toJSON()?`, async () => {
    const ellipse = new EllipseShape(null);
    const shapeDef = {
      nm: 'Ellipse',
      mn: 'Ellipses',
      hd: false,
      d: 1,
      ty: 'el',
      s: {
        a: 0,
        k: [42, 42],
        ix: 2,
      },
      p: {
        a: 0,
        k: [0, 0],
        ix: 3,
      },
    };

    ellipse.fromJSON(shapeDef);
    expect(JSON.parse(JSON.stringify(ellipse))).toEqual(shapeDef);
  });
});
