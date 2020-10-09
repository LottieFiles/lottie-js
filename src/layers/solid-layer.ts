import { LayerType, PropertyType } from '../constants';
import { Property } from '../properties';
import { Layer } from './layer';

/**
 * Solid layer type.
 */
export class SolidLayer extends Layer {
  // ---------------------------------------------------------------------
  // Public Properties
  // ---------------------------------------------------------------------

  public readonly type = LayerType.SOLID;

  public solidColor = '#000000';
  public solidHeight = 1;
  public solidWidth = 1;

  // ---------------------------------------------------------------------
  // Public Static Methods
  // ---------------------------------------------------------------------

  /**
   * Convert the Lottie JSON object to class instance.
   *
   * @param json    JSON object
   * @returns       SolidLayer instance
   */
  public static fromJSON(json: Record<string, any>): SolidLayer {
    const layer = new SolidLayer();

    // Base layer props
    layer.autoOrient = json.ao === 1;
    layer.blendMode = json.bm;
    layer.classNames = json.cl;
    layer.effects = json.ef;
    layer.height = json.h;
    layer.id = json.ld;
    layer.index = json.ind;
    layer.inPoint = json.ip;
    layer.is3D = json.ddd;
    layer.name = json.nm;
    layer.outPoint = json.op;
    layer.parent = json.parent;
    layer.startTime = json.st;
    layer.timeStretch = json.sr;
    layer.width = json.w;

    // Transforms
    layer.opacity = Property.fromJSON(PropertyType.OPACITY, json.ks.o);
    layer.rotation = Property.fromJSON(PropertyType.ROTATION, json.ks.r);
    layer.position = Property.fromJSON(PropertyType.POSITION, json.ks.p);
    layer.anchor = Property.fromJSON(PropertyType.ANCHOR, json.ks.a);
    layer.scale = Property.fromJSON(PropertyType.SCALE, json.ks.s);

    // This layer props
    layer.solidColor = json.sc;
    layer.solidHeight = json.sh;
    layer.solidWidth = json.sw;

    return layer;
  }

  // ---------------------------------------------------------------------
  // Public Methods
  // ---------------------------------------------------------------------

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
      cl: this.classNames,
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
