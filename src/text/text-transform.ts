import { PropertyType } from '../constants';
import { Property } from '../properties';

export class TextTransform {
  public anchor?: Property;
  public opacity?: Property;
  public position?: Property;
  public rotation?: Property;
  public scale?: Property;
  public skew?: Property;
  public skewAxis?: Property;
  public rotationX?: Property;
  public rotationY?: Property;
  public strokeWidth?: Property;
  public strokeColor?: Property;
  public fillColor?: Property;
  public fillSaturation?: Property;
  public fillHue?: Property;
  public fillBrightness?: Property;
  public tracking?: Property;

  /**
   * Convert the Lottie JSON object to class instance.
   *
   * @param json    JSON object
   * @returns       Transform instance
   */
  public fromJSON(json: Record<string, any>): this {
    if ('a' in json) {
      this.anchor = new Property(this, PropertyType.ANCHOR).fromJSON(json.a);
    }
    if ('p' in json) {
      this.position = new Property(this, PropertyType.POSITION).fromJSON(json.p);
    }
    if ('s' in json) {
      this.scale = new Property(this, PropertyType.SCALE).fromJSON(json.s);
    }
    if ('r' in json) {
      this.rotation = new Property(this, PropertyType.ROTATION).fromJSON(json.r);
    }
    if ('sk' in json) {
      this.skew = new Property(this, PropertyType.SKEW).fromJSON(json.sk);
    }
    if ('sa' in json) {
      this.skewAxis = new Property(this, PropertyType.SKEW_AXIS).fromJSON(json.sa);
    }
    if ('o' in json) {
      this.opacity = new Property(this, PropertyType.OPACITY).fromJSON(json.o);
    }
    if ('rx' in json) {
      this.rotationX = new Property(this, PropertyType.ROTATION_X).fromJSON(json.rx);
    }
    if ('ry' in json) {
      this.rotationY = new Property(this, PropertyType.ROTATION_Y).fromJSON(json.ry);
    }
    if ('sw' in json) {
      this.strokeWidth = new Property(this, PropertyType.STROKE_WIDTH).fromJSON(json.sw);
    }
    if ('sc' in json) {
      this.strokeColor = new Property(this, PropertyType.COLOR).fromJSON(json.sc);
    }
    if ('fc' in json) {
      this.fillColor = new Property(this, PropertyType.COLOR).fromJSON(json.fc);
    }
    if ('fs' in json) {
      this.fillSaturation = new Property(this, PropertyType.SATURATION).fromJSON(json.fs);
    }
    if ('fh' in json) {
      this.fillHue = new Property(this, PropertyType.HUE).fromJSON(json.fh);
    }
    if ('fb' in json) {
      this.fillBrightness = new Property(this, PropertyType.BRIGHTNESS).fromJSON(json.fb);
    }
    if ('t' in json) {
      this.tracking = new Property(this, PropertyType.TEXT_TRACKING).fromJSON(json.t);
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
      sw: this.strokeWidth,
      sc: this.strokeColor,
      fc: this.fillColor,
      fs: this.fillSaturation,
      fh: this.fillHue,
      fb: this.fillBrightness,
      t: this.tracking,
    };
  }
}
