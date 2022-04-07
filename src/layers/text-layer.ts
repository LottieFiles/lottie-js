import { LayerType } from '../constants';
import { TextData } from '../text';
import { Layer } from './layer';

/**
 * Text layer type.
 */
export class TextLayer extends Layer {
  public readonly type = LayerType.TEXT;

  public textData?: TextData;

  /**
   * Convert the Lottie JSON object to class instance.
   *
   * @param json    JSON object
   * @returns       TextLayer instance
   */
  public fromJSON(json: Record<string, any>): TextLayer {
    // Base layer props
    super.fromJSON(json);

    // This layer props
    if ('t' in json) {
      this.textData = new TextData();
      this.textData.fromJSON(json.t);
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
    const json = super.toJSON();

    return Object.assign(json, {
      t: this.textData,
    });
  }
}
