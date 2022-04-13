import { PropertyType, TextBased, TextShape } from '../constants';
import { Property } from '../properties';

export class TextSelector {
  public startTime = 0;
  public randomize = false;
  public textShape: TextShape = TextShape.SQUARE;
  public basedOn: TextBased = TextBased.CHARACTERS;
  public maxEase: Property = new Property(this, PropertyType.MAX_EASE);
  public minEase: Property = new Property(this, PropertyType.MIN_EASE);
  public maxAmount: Property = new Property(this, PropertyType.MAX_AMOUNT);
  public rangeUnits?: number;
  public offset?: Property;
  public expressionSelector?: Property;
  public start?: Property;
  public end?: Property;

  /**
   * Convert the Lottie JSON object to class instance.
   *
   * @param json    JSON object
   * @returns       TextSelectorProperty instance
   */
  public fromJSON(json: Record<string, any>): TextSelector {
    this.startTime = json.t;
    this.randomize = json.r === 1;
    this.rangeUnits = json.rn;
    this.textShape = json.sh;
    this.basedOn = json.b;

    if ('a' in json) {
      this.maxAmount.fromJSON(json.a);
    }
    if ('e' in json) {
      this.end = new Property(this, PropertyType.END).fromJSON(json.e);
    }
    if ('xe' in json) {
      this.maxEase = new Property(this, PropertyType.MAX_EASE).fromJSON(json.xe);
    }
    if ('ne' in json) {
      this.minEase = new Property(this, PropertyType.MIN_EASE).fromJSON(json.ne);
    }
    if ('o' in json) {
      this.offset = new Property(this, PropertyType.OFFSET).fromJSON(json.o);
    }
    if ('sm' in json) {
      this.expressionSelector = new Property(this, PropertyType.EXPRESSION_SELECTOR).fromJSON(json.sm);
    }
    if ('s' in json) {
      this.start = new Property(this, PropertyType.START).fromJSON(json.s);
    }

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
      t: this.startTime,
      xe: this.maxEase,
      ne: this.minEase,
      a: this.maxAmount,
      b: this.basedOn,
      rn: this.rangeUnits,
      sh: this.textShape,
      o: this.offset,
      r: this.randomize ? 1 : 0,
      sm: this.expressionSelector,
      s: this.start,
      e: this.end,
    };
  }
}
