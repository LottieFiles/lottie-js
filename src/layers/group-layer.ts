import { LayerType } from '../constants';
import { Layer } from './layer';

/**
 * Group layer type.
 */
export class GroupLayer extends Layer {
  public readonly type = LayerType.GROUP;

  /**
   * Convert the Lottie JSON object to class instance.
   *
   * @param json    JSON object
   * @returns       GroupLayer instance
   */
  public fromJSON(json: Record<string, any>): GroupLayer {
    // Base layer props
    this.setAttributesFromJSON(json);

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
      ty: this.type,
      w: this.width,
    };
  }
}
