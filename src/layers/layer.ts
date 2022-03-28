import { BlendMode, LayerType, MatteMode, PropertyType } from '../constants';
import { Mask } from '../masks';
import { Property } from '../properties/property';
import { Transform } from '../properties/transform';
import { KeyFrame } from '../timeline/key-frame';
import { useRegistry } from '../utils/use-registry';

/**
 * Layer base class.
 */
export abstract class Layer {
  public abstract readonly type: LayerType;

  public autoOrient = false;
  public blendMode: BlendMode = BlendMode.NORMAL;
  public classNames: string[] = [];
  public effects: any; // Effect[] = [];
  public height = 0;
  public id = '';
  public index?: number;
  public inPoint = 0;
  public is3D = false;
  public name = '';
  public outPoint = 0;
  public startTime = 0;
  public timeStretch = 1;
  public width = 0;
  public matteMode?: MatteMode;
  public matteTarget?: number;
  public isHidden?: boolean;
  public matchName?: string;
  public masks: Mask[] = [];

  // Transforms
  public transform: Transform = new Transform();

  /**
   * Parent instance.
   */
  public parent?: any;

  /**
   * Constructor.
   *
   * @param parent   Parent instance.
   */
  constructor(parent: any) {
    this.parent = parent;
  }

  /**
   * Returns all the colors used in the layer.
   *
   * @returns Array of colors.
   */
  public get colors(): string[] {
    const colors: Set<string> = new Set();
    const registry = useRegistry();

    [...registry.keys()]
      // Filter this layer's color properties
      .filter((p: Property) => registry.get(p) === this && p.type === PropertyType.COLOR)
      .forEach((cp: Property) => {
        cp.values.forEach((v: KeyFrame) => {
          colors.add(JSON.stringify(v.value));
        });
      });

    return Array.from(colors).map(c => JSON.parse(c));
  }

  /**
   * Returns true if there are masks present in the layer.
   * @returns true if masks present
   */
  public get hasMask(): boolean {
    return this.masks.length > 0;
  }

  /**
   * Returns the total number of frames in the animation.
   *
   * @returns Number of frames.
   */
  public get totalFrames(): number {
    return this.outPoint - this.inPoint;
  }

  /**
   * Convert the Lottie JSON object to class instance.
   *
   * @param json    JSON object
   * @returns       ShapeLayer instance
   */
  public fromJSON(json: Record<string, any>): Layer {
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
    this.classNames = 'cl' in json ? json.cl.split(' ') : [];

    // Transforms
    this.transform.fromJSON(json.ks);

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

    if ('masksProperties' in json) {
      this.masks = json.masksProperties.map((maskJson: Record<string, any>) => new Mask().fromJSON(maskJson));
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
    const masks = this.hasMask ? this.masks.map(mask => mask.toJSON()) : undefined;
    return {
      ddd: this.is3D ? 1 : 0,
      ind: this.index,
      ty: this.type,
      nm: this.name,
      mn: this.matchName,
      tt: this.matteMode,
      td: this.matteTarget,
      cl: this.classNames.length ? this.classNames.join(' ') : undefined,
      ln: this.id,
      parent: this.parent?.index,
      hd: this.isHidden !== undefined ? Number(this.isHidden) : undefined,
      sr: this.timeStretch,
      ks: this.transform.toJSON(),
      ao: this.autoOrient ? 1 : 0,
      hasMask: this.hasMask || undefined,
      masksProperties: masks,
      ef: this.effects,
      w: this.width,
      h: this.height,
      ip: this.inPoint,
      op: this.outPoint,
      st: this.startTime,
      bm: this.blendMode,
    };
  }
}
