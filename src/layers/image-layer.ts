import { LayerType, PropertyType } from '../constants';
import { Property } from '../properties';
import { Layer } from './layer';

/**
 * Image layer type.
 */
export class ImageLayer extends Layer {
  // ---------------------------------------------------------------------
  // Public Properties
  // ---------------------------------------------------------------------

  public readonly type = LayerType.IMAGE;

  public refId!: string;

  // ---------------------------------------------------------------------
  // Public Static Methods
  // ---------------------------------------------------------------------

  /**
   * Convert the Lottie JSON object to class instance.
   *
   * @param json    JSON object
   * @returns       ImageLayer instance
   */
  public static fromJSON(json: Record<string, any>): ImageLayer {
    const layer = new ImageLayer();

    // Base layer props
    layer.autoOrient = json.ao === 1;
    layer.blendMode = json.bm;
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

    // Split classnames into array
    if ('cl' in json) {
      layer.classNames = json.cl.split(' ');
    }

    // Transforms
    layer.opacity = Property.fromJSON(PropertyType.OPACITY, json.ks.o);
    layer.rotation = Property.fromJSON(PropertyType.ROTATION, json.ks.r);
    layer.position = Property.fromJSON(PropertyType.POSITION, json.ks.p);
    layer.anchor = Property.fromJSON(PropertyType.ANCHOR, json.ks.a);
    layer.scale = Property.fromJSON(PropertyType.SCALE, json.ks.s);

    // This layer props
    layer.refId = json.refId;

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
      ty: this.type,

      // Base layer props
      ao: this.autoOrient ? 1 : 0,
      bm: this.blendMode,
      cl: this.classNames.join(' '),
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
      sr: this.timeStretch,
      st: this.startTime,
      w: this.width,

      // This layer props
      refId: this.refId,
    };
  }
}
