import { LayerType, PropertyType } from '../constants';
import { Property } from '../properties';
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
    this.autoOrient = json.ao === 1;
    this.blendMode = json.bm;
    this.effects = json.ef;
    this.height = json.h;
    this.id = json.ln;
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
    this.opacity.fromJSON(json.ks.o);
    this.position.fromJSON(json.ks.p);
    this.anchor.fromJSON(json.ks.a);
    this.scale.fromJSON(json.ks.s);

    this.rotation = new Property(this, PropertyType.ROTATION).fromJSON(json.ks.r);

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
      ks: {
        a: this.anchor,
        o: this.opacity,
        p: this.position,
        r: this.rotation,
        s: this.scale,
      },
      ln: this.id,
      nm: this.name,
      mn: this.matchName,
      op: this.outPoint,
      parent: this.parent?.index,
      sc: this.solidColor,
      sh: this.solidHeight,
      sw: this.solidWidth,
      sr: this.timeStretch,
      st: this.startTime,
      ty: this.type,
      w: this.width,
      tt: this.matteMode,
      td: this.matteTarget,
      hd: this.isHidden !== undefined ? Number(this.isHidden) : undefined,
    };
  }
}
