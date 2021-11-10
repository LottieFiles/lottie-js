import { BlendMode, LayerType, MatteMode, PropertyType } from '../constants';
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
  public matteMode?: MatteMode;
  public matteTarget?: number;

  // Transforms
  public opacity: Property = new Property(this, PropertyType.OPACITY);
  public position: Property = new Property(this, PropertyType.POSITION);
  public anchor: Property = new Property(this, PropertyType.ANCHOR);
  public scale: Property = new Property(this, PropertyType.SCALE);

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
