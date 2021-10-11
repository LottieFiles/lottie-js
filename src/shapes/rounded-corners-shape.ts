import { PropertyType, ShapeType } from '../constants';
import { Property } from '../properties';
import { Shape } from './shape';

/**
 * Rounded Corners shape type.
 */
export class RoundedCornersShape extends Shape {
  /**
   * RoundedCorners shape type: rp
   */
  public readonly type = ShapeType.ROUNDED_CORNERS;

  public roundness: Property = new Property(this, PropertyType.NUMBER);

  /**
   * Convert the Lottie JSON object to class instance.
   *
   * @param json    JSON object
   * @returns       GroupShape instance
   */
  public fromJSON(json: Record<string, any>): RoundedCornersShape {
    // Base shape
    this.classNames = json.cl;
    this.id = json.ln;
    this.isHidden = json.hd;
    this.matchName = json.mn;
    this.name = json.nm;

    // This shape
    this.roundness.fromJSON(json.r);

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
      r: this.roundness,
    };
  }
}
