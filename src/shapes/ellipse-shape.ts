import { PropertyType, ShapeType } from '../constants';
import { Property } from '../properties';
import { Shape } from './shape';

/**
 * Ellipse shape type.
 */
export class EllipseShape extends Shape {
  // ---------------------------------------------------------------------
  // Public Properties
  // ---------------------------------------------------------------------

  /**
   * Shape type
   */
  public readonly type = ShapeType.ELLIPSE;

  public position: Property = new Property(PropertyType.POSITION);

  public size: Property = new Property(PropertyType.SIZE);

  // ---------------------------------------------------------------------
  // Public Static Methods
  // ---------------------------------------------------------------------

  /**
   * Convert the Lottie JSON object to class instance.
   *
   * @param json    JSON object
   * @returns       EllipseShape instance
   */
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
      p: this.position,
      s: this.size,
    };
  }
}
