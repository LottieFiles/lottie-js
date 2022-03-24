import { LayerType } from '../constants';
import { Layer } from './layer';

/**
 * Text layer type.
 */
export class TextLayer extends Layer {
  public readonly type = LayerType.TEXT;

  public textData?: any;

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
    this.textData = json.t;

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
