import { PropertyType, ShapeType } from '../constants';
import { Property } from '../properties';
import { Shape } from './shape';

/**
 * Ellipse shape type.
 */
export class EllipseShape extends Shape {
  /**
   * Shape type
   */
  public readonly type = ShapeType.ELLIPSE;

  public position: Property = new Property(this, PropertyType.POSITION);

  public size: Property = new Property(this, PropertyType.SIZE);

  /**
   * Convert the Lottie JSON object to class instance.
   *
   * @param json    JSON object
   * @returns       EllipseShape instance
   */
  public fromJSON(json: Record<string, any>): EllipseShape {
    // Base shape
    this.classNames = json.cl;
    this.id = json.ln;
    this.isHidden = json.hd;
    this.matchName = json.mn;
    this.name = json.nm;

    // This shape
    this.position.fromJSON(json.p);
    this.size.fromJSON(json.s);

    return this;
  }

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
