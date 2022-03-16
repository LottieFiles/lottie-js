import { PathShape } from './path-shape';

describe('Path Shape', () => {
  it('fromJSON() is equal to toJSON()?', () => {
    const pathDef = {
      c: true,
      v: [
        [53, 325],
        [429, 147],
      ],
      i: [
        [0, 0],
        [-147, 186],
      ],
      o: [
        [89, -189],
        [40, 189],
      ],
    };
    const shapeDef = {
      nm: 'Path',
      mn: 'Path',
      hd: false,
      ty: 'sh',
      ks: {
        a: 0,
        k: pathDef,
      },
    };

    const shape = new PathShape(null);
    shape.fromJSON(shapeDef);

    expect(shape.vertices.values[0].value).toStrictEqual(pathDef);
    expect(JSON.parse(JSON.stringify(shape))).toEqual(shapeDef);
  });
});
