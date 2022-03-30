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

  public direction = 1;

  /**
   * Convert the Lottie JSON object to class instance.
   *
   * @param json    JSON object
   * @returns       EllipseShape instance
   */
  public fromJSON(json: Record<string, any>): EllipseShape {
    // Base shape
    super.fromJSON(json);

    // This shape
    this.position.fromJSON(json.p);
    this.size.fromJSON(json.s);
    this.direction = json.d;

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
      p: this.position,
      s: this.size,
      d: this.direction,
    });
  }
}
