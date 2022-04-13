import { PropertyType, ShapeType } from '../constants';
import { Property } from '../properties';
import { Shape } from './shape';

/**
 * Twist shape.
 */
export class TwistShape extends Shape {
  /**
   * Twist shape type: 'tw'
   */
  public readonly type = ShapeType.TWIST;

  /**
   * Angle to twist by: 'a'. number, default: 0
   */
  public angle: Property = new Property(this, PropertyType.ANGLE);

  /**
   * Center of twist: 'c'. array, default: [0, 0]
   */
  public center: Property = new Property(this, PropertyType.CENTER);

  /**
   * Convert the Lottie JSON object to class instance.
   *
   * @param json    JSON object
   * @returns       TwistShape instance
   */
  public fromJSON(json: Record<string, any>): TwistShape {
    // Base shape
    super.fromJSON(json);

    // This shape
    this.center.fromJSON(json.c);
    this.angle.fromJSON(json.a);

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
      c: this.center,
      a: this.angle,
    });
  }
}
