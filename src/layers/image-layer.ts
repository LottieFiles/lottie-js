import { LayerType } from '../constants';
import { Layer } from './layer';

/**
 * Image layer type.
 */
export class ImageLayer extends Layer {
  public readonly type = LayerType.IMAGE;

  public refId!: string;

  /**
   * Convert the Lottie JSON object to class instance.
   *
   * @param json    JSON object
   * @returns       ImageLayer instance
   */
  public fromJSON(json: Record<string, any>): ImageLayer {
    super.fromJSON(json);
    // This layer props
    this.refId = json.refId;

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
      refId: this.refId,
    });
  }
}
