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
    super.fromJSON(json);

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
    const json = super.toJSON();

    return Object.assign(json, {
      r: this.roundness,
    });
  }
}
