import { TextSelector } from './text-selector';
import { TextTransform } from './text-transform';

export class TextAnimator {
  public name = '';
  public transform: TextTransform = new TextTransform();
  public selector: TextSelector = new TextSelector();

  /**
   * Convert the Lottie JSON object to class instance.
   *
   * @param json    JSON object
   * @returns       Transform instance
   */
  public fromJSON(json: Record<string, any>): TextAnimator {
    this.transform.fromJSON(json.a);
    this.selector.fromJSON(json.s);
    this.name = json.nm;

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
      nm: this.name,
      s: this.selector,
      a: this.transform,
    };
  }
}
