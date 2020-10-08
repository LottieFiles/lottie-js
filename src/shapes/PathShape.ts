import { PropertyType, ShapeType } from '../constants';
import { Property } from '../properties';
import { Shape } from './Shape';

export class PathShape extends Shape {
  /**
   * Path shape type: sh
   */
  public readonly type = ShapeType.PATH;

  public direction?: number;

  public vertices: Property = new Property(PropertyType.SHAPE);

  public static fromJSON(json: Record<string, any>): PathShape {
    const shape = new PathShape();

    // Base shape
    shape.classNames = json.cl;
    shape.id = json.ln;
    shape.isHidden = json.hd;
    shape.matchName = json.mn;
    shape.name = json.nm;

    // This shape
    shape.direction = json.d;
    shape.vertices = json.ks;

    return shape;
  }

  public toJSON(): Record<string, any> {
    return {
      ty: this.type,

      // Base shape
      cl: this.classNames,
      hd: this.isHidden,
      ln: this.id,
      mn: this.matchName,
      nm: this.name,

      // This shape
      d: this.direction,
      ks: this.vertices,
    };
  }
}
