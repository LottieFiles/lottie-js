import { PropertyType } from '../constants/PropertyType';
import { ShapeType } from '../constants/ShapeType';
import { Property } from '../properties/Property';
import { Shape } from './Shape';

export class RectangleShape extends Shape {
  /**
   * Rectangle shape type: rc
   */
  public readonly type = ShapeType.RECTANGLE;

  public direction?: number;

  public position: Property = new Property(PropertyType.POSITION);

  public roundness: Property = new Property(PropertyType.ROUNDNESS);

  public size: Property = new Property(PropertyType.SIZE);

  public static fromJSON(json: Record<string, any>): RectangleShape {
    const shape = new RectangleShape();

    // Base shape
    shape.classNames = json.cl;
    shape.id = json.ln;
    shape.isHidden = json.hd;
    shape.matchName = json.mn;
    shape.name = json.nm;

    // This shape
    shape.direction = json.d;
    shape.position = Property.fromJSON(PropertyType.POSITION, json.p);
    shape.roundness = Property.fromJSON(PropertyType.ROUNDNESS, json.r);
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
      d: this.direction,
      p: this.position,
      r: this.roundness,
      s: this.size,
    };
  }
}
