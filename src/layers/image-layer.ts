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

    if ('tt' in json) {
      this.matteMode = json.tt;
    }

    if ('td' in json) {
      this.matteTarget = json.td;
    }

    if ('hd' in json) {
      this.isHidden = json.hd;
    }

    if ('mn' in json) {
      this.matchName = json.mn;
    }

    // Transforms
    this.transform.fromJSON(json.ks);

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
      ks: {
        ...this.transform.toJSON(),
      },
      ln: this.id,
      nm: this.name,
      mn: this.matchName,
      op: this.outPoint,
      parent: this.parent?.index,
      sr: this.timeStretch,
      st: this.startTime,
      w: this.width,
      tt: this.matteMode,
      td: this.matteTarget,
      hd: this.isHidden !== undefined ? Number(this.isHidden) : undefined,

      // This layer props
      refId: this.refId,
    };
  }
}
