import { PropertyType } from '../constants';
import { EffectValueType } from '../constants';
import { Property } from '../properties';

export class EffectValue {
  public name = '';
  public matchName?: string;
  public index = 0;
  public value: Property = new Property(this, PropertyType.EFFECT_VALUE);
  public type: EffectValueType;

  public constructor(type: EffectValueType) {
    this.type = type;
  }

  /**
   * Convert the Lottie JSON object to class instance.
   *
   * @param json    JSON object
   * @returns       Mask instance
   */
  public fromJSON(json: Record<string, any>): EffectValue {
    this.name = json.nm;
    this.matchName = json.mn;
    this.index = json.ix;
    this.value.fromJSON(json.v);

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
      nm: this.name,
      mn: this.matchName,
      ix: this.index,
      v: this.value,
    };
  }
}
