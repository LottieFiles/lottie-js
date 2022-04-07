import { PropertyType, TextGrouping } from '../constants';
import { Property } from '../properties';

export class TextOptions {
  public alignment = new Property(this, PropertyType.TEXT_ALIGNMENT);
  public grouping: TextGrouping = TextGrouping.CHARACTERS;

  /**
   * Convert the Lottie JSON object to class instance.
   *
   * @param json    JSON object
   * @returns       TextOptions instance
   */
  public fromJSON(json: Record<string, any>): TextOptions {
    this.alignment.fromJSON(json.a);
    this.grouping = json.g;

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
      a: this.alignment,
      g: this.grouping,
    };
  }
}
