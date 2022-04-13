import { PropertyType, ShapeType } from '../constants';
import { Property } from '../properties';
import { Shape } from './shape';

/**
 * PuckerBloat shape.
 */
export class PuckerBloatShape extends Shape {
  /**
   * PuckerBloat shape type: 'pb'
   */
  public readonly type = ShapeType.PUCKER_BLOAT;

  /**
   * amount to bloat the shape by. -100 to 100
   * field: 'a'
   */
  public amount: Property = new Property(this, PropertyType.AMOUNT);

  /**
   * Convert the Lottie JSON object to class instance.
   *
   * @param json    JSON object
   * @returns       PuckerBloatShape instance
   */
  public fromJSON(json: Record<string, any>): PuckerBloatShape {
    // Base shape
    super.fromJSON(json);
    this.amount.fromJSON(json.a);

    // This shape

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
      a: this.amount,
    });
  }
}
