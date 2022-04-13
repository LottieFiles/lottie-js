import { PropertyType, ShapeType } from '../constants';
import { Property } from '../properties';
import { Shape } from './shape';

/**
 * ZigZag shape.
 */
export class ZigZagShape extends Shape {
  /**
   * ZigZag shape type: 'zz'
   */
  public readonly type = ShapeType.ZIG_ZAG;

  /**
   * radius to make it a smoother curve: 'r'
   */
  public radius: Property = new Property(this, PropertyType.RADIUS);

  /**
   * Distance between peaks and troughs: 's'
   */
  public distance: Property = new Property(this, PropertyType.DISTANCE);

  /**
   * Number of ridges: 'pt'
   */
  public numberOfRidges: Property = new Property(this, PropertyType.POINTS);

  /**
   * Convert the Lottie JSON object to class instance.
   *
   * @param json    JSON object
   * @returns       ZigZagShape instance
   */
  public fromJSON(json: Record<string, any>): ZigZagShape {
    // Base shape
    super.fromJSON(json);

    // This shape
    this.radius.fromJSON(json.r);
    this.distance.fromJSON(json.s);
    this.numberOfRidges.fromJSON(json.pt);

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
      r: this.radius,
      s: this.distance,
      pt: this.numberOfRidges,
    });
  }
}
