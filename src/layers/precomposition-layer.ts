import { LayerType } from '../constants';
import { Layer } from './layer';

/**
 * Precomposition layer type.
 */
export class PrecompositionLayer extends Layer {
  public readonly type = LayerType.PRECOMPOSITION;

  public refId?: string;

  public timeRemap: any;

  /**
   * Convert the Lottie JSON object to class instance.
   *
   * @param json    JSON object
   * @returns       PrecompositionLayer instance
   */
  public fromJSON(json: Record<string, any>): PrecompositionLayer {
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
