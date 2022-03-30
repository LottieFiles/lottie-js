import { KeyFrame } from '..';
import { BlendMode, FillRuleType } from '../constants';
import { PropertyType } from '../constants/property-type';
import { ShapeType } from '../constants/shape-type';
import { Property } from '../properties';
import { Shape } from './shape';

/**
 * Fill shape type.
 */
export class FillShape extends Shape {
  /**
   * Fill shape type: fl
   */
  public readonly type = ShapeType.FILL;

  public blendMode: BlendMode = BlendMode.NORMAL;

  public direction?: number;

  public color: Property = new Property(this, PropertyType.COLOR);

  public fillRule: FillRuleType = FillRuleType.EVEN_ODD;

  public opacity: Property = new Property(this, PropertyType.OPACITY, [new KeyFrame(0, 100)]);

  /**
   * Convert the Lottie JSON object to class instance.
   *
   * @param json    JSON object
   * @returns       FillShape instance
   */
  public fromJSON(json: Record<string, any>): FillShape {
    // Base shape
    super.fromJSON(json);

    // This shape
    this.blendMode = json.bm;
    this.color.fromJSON(json.c);
    this.fillRule = json.r in FillRuleType ? json.r : FillRuleType.EVEN_ODD;
    this.opacity.fromJSON(json.o);

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
      // This shape
      bm: this.blendMode,
      c: this.color,
      r: this.fillRule,
      o: this.opacity,
    });
  }
}
