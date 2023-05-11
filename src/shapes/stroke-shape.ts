import { BlendMode, LineCapType, LineJoinType, PropertyType, ShapeType } from '../constants';
import { Dashes, Property } from '../properties';
import { KeyFrame } from '../timeline/key-frame';
import { Shape } from './shape';

/**
 * Stroke shape type.
 */
export class StrokeShape extends Shape {
  /**
   * Shape type
   */
  public readonly type = ShapeType.STROKE;

  public blendMode: BlendMode = BlendMode.NORMAL;

  public color: Property = new Property(this, PropertyType.COLOR);

  /**
   * Line cap.
   *
   * Mapped field: lc
   */
  public lineCapType: LineCapType = LineCapType.ROUND;

  /**
   * Line join.
   *
   * Mapped field: lj
   */
  public lineJoinType: LineJoinType = LineJoinType.ROUND;

  /**
   * Miter limit.
   *
   * Mapped field: ml
   */
  public miterLimit!: number;

  public opacity: Property = new Property(this, PropertyType.OPACITY, [new KeyFrame(0, 100)]);

  public width: Property = new Property(this, PropertyType.STROKE_WIDTH);

  public dashes: Dashes = new Dashes(this);

  /**
   * Convert the Lottie JSON object to class instance.
   *
   * @param json    JSON object
   * @returns       StrokeShape instance
   */
  public fromJSON(json: Record<string, any>): StrokeShape {
    // Base shape
    super.fromJSON(json);

    // This shape
    this.blendMode = json.bm in BlendMode ? json.bm : BlendMode.NORMAL;
    this.color.fromJSON(json.c);
    this.lineCapType = json.lc in LineCapType ? json.lc : LineCapType.ROUND;
    this.lineJoinType = json.lj in LineJoinType ? json.lj : LineJoinType.ROUND;
    this.miterLimit = json.ml;
    this.opacity.fromJSON(json.o);
    this.width.fromJSON(json.w);
    this.dashes.fromJSON(json.d);

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
    const json = super.toJSON();

    return Object.assign(json, {
      bm: this.blendMode,
      c: this.color,
      lc: this.lineCapType,
      lj: this.lineJoinType,
      ml: this.miterLimit,
      o: this.opacity,
      w: this.width,
      d: this.dashes,
    });
  }
}
