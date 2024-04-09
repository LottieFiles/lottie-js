import { LayerType, PropertyType } from '../constants';
import { Property } from '../properties';
import { Layer } from './layer';

/**
 * Precomposition layer type.
 */
export class PrecompositionLayer extends Layer {
  public readonly type = LayerType.PRECOMPOSITION;

  public height = 512;

  public refId?: string;

  public timeRemap: Property | undefined;

  public width = 512;

  /**
   * Convert the Lottie JSON object to class instance.
   *
   * @param json    JSON object
   * @returns       PrecompositionLayer instance
   */
  public fromJSON(json: Record<string, any>): PrecompositionLayer {
    super.fromJSON(json);

    // This layer props
    this.height = json.h;
    this.refId = json.refId;
    this.width = json.w;
    if (json.tm) {
      if (!this.timeRemap) {
        this.timeRemap = new Property(this, PropertyType.TIME_REMAP);
      }
      this.timeRemap.fromJSON(json.tm);
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
      h: this.height,
      refId: this.refId,
      w: this.width,
      tm: this.timeRemap && this.timeRemap.toJSON(),
    });
  }
}
