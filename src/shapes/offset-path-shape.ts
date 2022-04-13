import { LineJoinType, PropertyType, ShapeType } from '../constants';
import { Property } from '../properties';
import { Shape } from './shape';

/**
 * OffsetPath shape.
 */
export class OffsetPathShape extends Shape {
  /**
   * OffsetPath shape type: 'op'
   */
  public readonly type = ShapeType.OFFSET_PATH;

  /**
   * Offset amount: 'a'
   */
  public amount: Property = new Property(this, PropertyType.AMOUNT);

  /**
   * Describes how path segments are joined together
   * Line Join Type: 'lj'
   */
  public lineJoin: LineJoinType = LineJoinType.MITER;

  /**
   * Miter Limit: 'ml'
   */
  public miterLimit: Property = new Property(this, PropertyType.MITER_LIMIT);

  /**
   * Convert the Lottie JSON object to class instance.
   *
   * @param json    JSON object
   * @returns       OffsetPathShape instance
   */
  public fromJSON(json: Record<string, any>): OffsetPathShape {
    // Base shape
    super.fromJSON(json);

    // This shape
    this.miterLimit.fromJSON(json.ml);
    this.amount.fromJSON(json.a);
    this.lineJoin = json.lj;

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
      ml: this.miterLimit,
      a: this.amount,
      lj: this.lineJoin,
    });
  }
}
