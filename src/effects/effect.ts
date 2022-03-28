import { EffectType } from '../constants';
import { EffectValue } from './effect-value';

export class Effect {
  public name = '';
  public matchName?: string;
  public numberOfProperties?: number;
  public index = 0;
  public enabled = true;
  public type: EffectType;
  public values: EffectValue[] = [];

  public constructor(type: EffectType = EffectType.NONE) {
    this.type = type;
  }

  /**
   * Convert the Lottie JSON object to class instance.
   *
   * @param json    JSON object
   * @returns       Mask instance
   */
  public fromJSON(json: Record<string, any>): Effect {
    this.type = json.ty;
    this.name = json.nm;
    this.matchName = json.mn;
    this.numberOfProperties = json.np;
    this.index = json.ix;
    this.enabled = json.en ?? true;
    this.values = json.ef.map((valueJSON: Record<string, any>) => new EffectValue(valueJSON.ty).fromJSON(valueJSON));

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
    const values = this.values.map(value => value.toJSON());
    return {
      ty: this.type,
      nm: this.name,
      np: this.numberOfProperties,
      mn: this.matchName,
      ix: this.index,
      ef: values,
      en: this.enabled ? 1 : this.enabled
    };
  }
}
