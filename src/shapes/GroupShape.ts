import { BlendMode, PropertyType, ShapeType } from '../constants';
import { Property } from '../properties';
import { createShapeFromJSON } from '.';
import { Shape } from './Shape';

export class GroupShape extends Shape {
  /**
   * Group shape type: gr
   */
  public readonly type = ShapeType.GROUP;

  public anchor: Property = new Property(PropertyType.ANCHOR);

  public blendMode: BlendMode = BlendMode.NORMAL;

  public contentPropertyIndex?: number;

  public numProperties = 0;

  public opacity: Property = new Property(PropertyType.OPACITY);

  public position: Property = new Property(PropertyType.POSITION);

  public propertyIndex?: number;

  public rotation: Property = new Property(PropertyType.ROTATION);

  public scale: Property = new Property(PropertyType.SCALE);

  public shapes: Shape[] = [];

  public skew?: Property;

  public skewAxis?: Property;

  public static fromJSON(json: Record<string, any>): GroupShape {
    const shape = new GroupShape();

    // Base shape
    shape.classNames = json.cl;
    shape.id = json.ln;
    shape.isHidden = json.hd;
    shape.matchName = json.mn;
    shape.name = json.nm;

    // This shape
    shape.blendMode = json.bm;
    shape.contentPropertyIndex = json.cix;
    shape.propertyIndex = json.ix;
    shape.numProperties = json.np;

    shape.shapes = json.it
      .map((jShape: Record<string, any>) => {
        try {
          if (jShape.ty !== 'tr') {
            return createShapeFromJSON(jShape);
          }

          shape.anchor = Property.fromJSON(PropertyType.ANCHOR, jShape.a);
          shape.opacity = Property.fromJSON(PropertyType.OPACITY, jShape.o);
          shape.position = Property.fromJSON(PropertyType.POSITION, jShape.p);
          shape.rotation = Property.fromJSON(PropertyType.ROTATION, jShape.r);
          shape.scale = Property.fromJSON(PropertyType.SCALE, jShape.s);

          if (jShape.sk) {
            shape.skew = Property.fromJSON(PropertyType.SKEW, jShape.sk);
          }

          if (jShape.sa) {
            shape.skewAxis = Property.fromJSON(PropertyType.SKEW_AXIS, jShape.sa);
          }
        } catch (err) {
          // Swallow
        }

        return false;
      })
      .filter(Boolean);

    return shape;
  }

  public toJSON(): Record<string, any> {
    const shapes = JSON.parse(JSON.stringify(this.shapes));

    shapes.push({
      ty: 'tr',
      nm: 'Transform',
      a: this.anchor,
      o: this.opacity,
      p: this.position,
      r: this.rotation,
      s: this.scale,
      sk: this.skew,
      sa: this.skewAxis,
    });

    return {
      ty: this.type,

      // Base shape
      cl: this.classNames,
      hd: this.isHidden,
      ln: this.id,
      mn: this.matchName,
      nm: this.name,

      // This shape
      bm: this.blendMode,
      cix: this.contentPropertyIndex,
      it: shapes,
      ix: this.propertyIndex,
      np: this.numProperties,
    };
  }
}
