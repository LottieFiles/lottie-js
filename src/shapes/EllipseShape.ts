import { PropertyType } from '../constants/PropertyType';
import { ShapeType } from '../constants/ShapeType';
import { Property } from '../properties/Property';
import { Shape } from './Shape';

export class EllipseShape extends Shape {
  /**
   * Shape type
   */
  public readonly type = ShapeType.ELLIPSE;

  public position: Property = new Property(PropertyType.POSITION);

  public size: Property = new Property(PropertyType.SIZE);

  public static fromJSON(json: Record<string, any>): EllipseShape {
    const shape = new EllipseShape();

    // Base shape
    shape.classNames = json.cl;
    shape.id = json.ln;
    shape.isHidden = json.hd;
    shape.matchName = json.mn;
    shape.name = json.nm;

    // This shape
    shape.position = Property.fromJSON(PropertyType.POSITION, json.p);
    shape.size = Property.fromJSON(PropertyType.SIZE, json.s);

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
      p: this.position,
      s: this.size,
    };
  }
}
