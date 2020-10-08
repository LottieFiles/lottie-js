import { LayerType, PropertyType } from '../constants';
import { Property } from '../properties';
import { createShapeFromJSON, Shape } from '../shapes';
import { Layer } from '.';

export class ShapeLayer extends Layer {
  // Shape layer type = 4
  public readonly type = LayerType.SHAPE;

  public shapes: Shape[] = [];

  public skew?: Property;
  public skewAxis?: Property;

  public static fromJSON(json: Record<string, any>): ShapeLayer {
    const layer = new ShapeLayer();

    // Base layer props
    layer.autoOrient = json.ao === 1;
    layer.blendMode = json.bm;
    layer.classNames = json.cl;
    layer.effects = json.ef;
    layer.height = json.h;
    layer.id = json.ld;
    layer.index = json.ind;
    layer.inPoint = json.ip;
    layer.is3D = json.ddd;
    layer.name = json.nm;
    layer.outPoint = json.op;
    layer.parent = json.parent;
    layer.startTime = json.st;
    layer.timeStretch = json.sr;
    layer.width = json.w;

    // Transforms
    layer.opacity = Property.fromJSON(PropertyType.OPACITY, json.ks.o);
    layer.rotation = Property.fromJSON(PropertyType.ROTATION, json.ks.r);
    layer.position = Property.fromJSON(PropertyType.POSITION, json.ks.p);
    layer.anchor = Property.fromJSON(PropertyType.ANCHOR, json.ks.a);
    layer.scale = Property.fromJSON(PropertyType.SCALE, json.ks.s);

    // This layer props
    if (json.ks.sk) {
      layer.skew = Property.fromJSON(PropertyType.SKEW, json.ks.sk);
    }

    if (json.ks.sa) {
      layer.skewAxis = Property.fromJSON(PropertyType.SKEW_AXIS, json.ks.sa);
    }

    layer.shapes = json.shapes.map((jShape: Record<string, any>) => createShapeFromJSON(jShape)).filter(Boolean);

    return layer;
  }

  public toJSON(): Record<string, any> {
    return {
      ao: this.autoOrient ? 1 : 0,
      bm: this.blendMode,
      cl: this.classNames,
      ddd: this.is3D ? 1 : 0,
      ef: this.effects,
      h: this.height,
      ind: this.index,
      ip: this.inPoint,
      ks: {
        a: this.anchor,
        o: this.opacity,
        p: this.position,
        r: this.rotation,
        s: this.scale,
        sk: this.skew,
        sa: this.skewAxis,
      },
      shapes: this.shapes,
      ln: this.id,
      nm: this.name,
      op: this.outPoint,
      parent: this.parent,
      sr: this.timeStretch,
      st: this.startTime,
      ty: this.type,
      w: this.width,
    };
  }
}
