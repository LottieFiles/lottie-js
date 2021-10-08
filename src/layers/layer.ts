import { BlendMode, LayerType, PropertyType } from '../constants';
import { Property } from '../properties/property';
import { KeyFrame } from '../timeline/key-frame';
import { useRegistry } from '../utils/use-registry';

/**
 * Layer base class.
 */
export abstract class Layer {
  public abstract readonly type: LayerType;

  public abstract fromJSON(json: Record<string, any>): Layer;
  public abstract toJSON(key?: string): Record<string, any> | undefined;

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

  // Transforms
  public opacity: Property = new Property(this, PropertyType.OPACITY);
  public position: Property = new Property(this, PropertyType.POSITION);
  public anchor: Property = new Property(this, PropertyType.ANCHOR);
  public scale: Property = new Property(this, PropertyType.SCALE);

  public skew?: Property = new Property(this, PropertyType.SKEW);
  public skewAxis?: Property = new Property(this, PropertyType.SKEW_AXIS);
  public orientation?: Property;
  public rotation?: Property;
  public rotationX?: Property;
  public rotationY?: Property;
  public rotationZ?: Property;

  /**
   * Parent instance.
   *
   * @protected
   */
  protected parent: any;

  /**
   * Constructor.
   *
   * @param parent   Parent instance.
   */
  constructor(parent: any) {
    this.parent = parent;
  }

  protected setAttributesFromJSON(json: Record<string, any>): void {
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
    'o' in json.ks && this.opacity.fromJSON(json.ks.o);
    'p' in json.ks && this.position.fromJSON(json.ks.p);
    'a' in json.ks && this.anchor.fromJSON(json.ks.a);
    's' in json.ks && this.scale.fromJSON(json.ks.s);

    if ('or' in json.ks) {
      this.orientation = new Property(this, PropertyType.ORIENTATION).fromJSON(json.ks.or);
    }

    if ('rx' in json.ks) {
      this.rotationX = new Property(this, PropertyType.ROTATION_X).fromJSON(json.ks.rx);
    }

    if ('ry' in json.ks) {
      this.rotationY = new Property(this, PropertyType.ROTATION_Y).fromJSON(json.ks.ry);
    }

    if ('rz' in json.ks) {
      this.rotationZ = new Property(this, PropertyType.ROTATION_Z).fromJSON(json.ks.rz);
    }
    if ('r' in json.ks) {
      this.rotation = new Property(this, PropertyType.ROTATION).fromJSON(json.ks.r);
    }
    if ('sk' in json.ks) {
      this.skew = new Property(this, PropertyType.SKEW).fromJSON(json.ks.sk);
    }
    if ('sa' in json.ks) {
      this.skew = new Property(this, PropertyType.SKEW_AXIS).fromJSON(json.ks.sa);
    }
  }

  protected transformJSON(): Record<string, any> {
    return {
      a: this.anchor,
      o: this.opacity,
      p: this.position,
      r: this.rotation,
      s: this.scale,
      sk: this.skew,
      sa: this.skewAxis,

      rx: this.rotationX,
      ry: this.rotationY,
      rz: this.rotationZ,
      or: this.orientation,
    };
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
   * Returns the total number of frames in the animation.
   *
   * @returns Number of frames.
   */
  public get totalFrames(): number {
    return this.outPoint - this.inPoint;
  }
}
