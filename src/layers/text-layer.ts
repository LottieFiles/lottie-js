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
    this.autoOrient = json.ao === 1;
    this.blendMode = json.bm;
    this.effects = json.ef;
    this.height = json.h;
    this.id = json.ld;
    this.index = json.ind;
    this.inPoint = json.ip;
    this.is3D = json.ddd;
    this.name = json.nm;
    this.outPoint = json.op;
    this.parent = json.parent;
    this.startTime = json.st;
    this.timeStretch = json.sr;
    this.width = json.w;

    // Split classnames into array
    if ('cl' in json) {
      this.classNames = json.cl.split(' ');
    }

    // Transforms
    this.transform.fromJSON(json.ks);

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
      ks: {
        ...this.transform.toJSON(),
      },
      ln: this.id,
      nm: this.name,
      op: this.outPoint,
      parent: this.parent,
      sr: this.timeStretch,
      st: this.startTime,
      w: this.width,

      // This layer props
      t: this.textData,
    };
  }
}
