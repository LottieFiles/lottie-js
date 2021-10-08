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
    // Base layer props
    this.setAttributesFromJSON(json);

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
    return {
      ty: this.type,

      // Base layer props
      ao: this.autoOrient ? 1 : 0,
      bm: this.blendMode,
      cl: this.classNames.length ? this.classNames.join(' ') : undefined,
      ddd: this.is3D ? 1 : 0,
      ef: this.effects,
      h: this.height,
      ind: this.index,
      ip: this.inPoint,
      ks: this.transformJSON(),
      ln: this.id,
      nm: this.name,
      op: this.outPoint,
      parent: this.parent,
      sr: this.timeStretch,
      st: this.startTime,
      w: this.width,

      // This layer props
      refId: this.refId,
    };
  }
}
