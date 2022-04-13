import { PropertyType } from '../constants';
import { Property } from '../properties';
import { TextAnimator } from './text-animator';
import { TextOptions } from './text-options';

export class TextData {
  public textDocument: Property = new Property(this, PropertyType.TEXT_DATA);
  public textOptions: TextOptions = new TextOptions();
  public maskedPath: any;
  public textAnimators: TextAnimator[] = [];

  /**
   * Convert the Lottie JSON object to class instance.
   *
   * @param json    JSON object
   * @returns       TextLayer instance
   */
  public fromJSON(json: Record<string, any>): TextData {
    this.textDocument.fromJSON(json.d);
    this.textOptions.fromJSON(json.m);
    this.maskedPath = json.p;
    if ('a' in json && Array.isArray(json.a)) {
      this.textAnimators = json.a.map((animatorJson: Record<string, any>) => this.createTextAnimator(animatorJson));
    }

    return this;
  }

  public createTextAnimator(json: Record<string, any>) {
    return new TextAnimator().fromJSON(json);
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
      a: this.textAnimators.map(animator => animator.toJSON()),
      d: this.textDocument,
      m: this.textOptions,
      p: this.maskedPath,
    };
  }
}
