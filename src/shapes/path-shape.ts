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
    this.classNames = json.cl;
    this.id = json.ln;
    this.isHidden = json.hd;
    this.matchName = json.mn;
    this.name = json.nm;
    this.itemIndex = json.ind;
    this.shapeIndex = json.ix;

    // This shape
    this.direction = json.d;
    this.vertices = json.ks;

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
      ind: this.itemIndex,
      ix: this.shapeIndex,

      // This shape
      d: this.direction,
      ks: this.vertices,
    };
  }
}
