import { LayerType } from '../constants';
import { Layer } from './layer';

/**
 * Solid layer type.
 */
export class SolidLayer extends Layer {
  public readonly type = LayerType.SOLID;

  public solidColor = '#000000';
  public solidHeight = 1;
  public solidWidth = 1;

  /**
   * Convert the Lottie JSON object to class instance.
   *
   * @param json    JSON object
   * @returns       SolidLayer instance
   */
  public fromJSON(json: Record<string, any>): SolidLayer {
    // Base layer props
    this.setAttributesFromJSON(json);

    // This layer props
    this.solidColor = json.sc;
    this.solidHeight = json.sh;
    this.solidWidth = json.sw;

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
      sc: this.solidColor,
      sh: this.solidHeight,
      sw: this.solidWidth,
      sr: this.timeStretch,
      st: this.startTime,
      ty: this.type,
      w: this.width,
    };
  }
}
