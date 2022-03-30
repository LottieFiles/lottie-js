/**
 * Text layer type.
 */
import { Font } from './font';

export class FontList {
  public list: Font[] = [];

  /**
   * Convert the Lottie JSON object to class instance.
   *
   * @param json    JSON object
   * @returns       TextLayer instance
   */

  public fromJSON(json: Record<string, any>): FontList {
    this.list = json.list.map((fontJSON: Record<string, any>) => new Font().fromJSON(fontJSON));
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
      list: this.list,
    };
  }
}
