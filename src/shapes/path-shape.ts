import { PropertyType, ShapeType } from '../constants';
import { Property } from '../properties';
import { Shape } from './shape';

/**
 * Path shape type.
 */
export class PathShape extends Shape {
  /**
   * Path shape type: sh
   */
  public readonly type = ShapeType.PATH;

  public direction?: number;

  public vertices: Property = new Property(this, PropertyType.SHAPE);

  /**
   * Convert the Lottie JSON object to class instance.
   *
   * @param json    JSON object
   * @returns       PathShape instance
   */
  public fromJSON(json: Record<string, any>): PathShape {
    // Base shape
    super.fromJSON(json);
    this.itemIndex = json.ind;
    this.shapeIndex = json.ix;

    // This shape
    this.direction = json.d;
    this.vertices.fromJSON(json.ks);

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
      ind: this.itemIndex,
      ix: this.shapeIndex,

      // This shape
      d: this.direction,
      ks: this.vertices,
    });
  }
}
