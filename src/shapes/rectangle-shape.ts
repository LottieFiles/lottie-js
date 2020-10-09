import { PropertyType, ShapeType } from '../constants';
import { Property } from '../properties';
import { Shape } from './shape';

/**
 * Rectangle shape type.
 */
export class RectangleShape extends Shape {
  // ---------------------------------------------------------------------
  // Public Properties
  // ---------------------------------------------------------------------

  /**
   * Rectangle shape type: rc
   */
  public readonly type = ShapeType.RECTANGLE;

  public direction?: number;

  public position: Property = new Property(PropertyType.POSITION);

  public roundness: Property = new Property(PropertyType.ROUNDNESS);

  public size: Property = new Property(PropertyType.SIZE);

  // ---------------------------------------------------------------------
  // Public Static Methods
  // ---------------------------------------------------------------------

  /**
   * Convert the Lottie JSON object to class instance.
   *
   * @param json    JSON object
   * @returns       RectangleShape instance
   */
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

  // ---------------------------------------------------------------------
  // Public Methods
  // ---------------------------------------------------------------------

  /**
   * Convert the class instance to Lottie JSON object.
   *
   * Called by Javascript when serializing object with JSON.stringify()
   *
   * @returns       JSON object
   */
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
