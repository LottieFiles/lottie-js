/**
 * Represents a keyframe in the timeline with the frame number and associated property value.
 */
export class KeyFrame {
  // ---------------------------------------------------------------------
  // Public Properties
  // ---------------------------------------------------------------------

  public frame: number;
  public value: number | number[];
  public frameInTangent?: [number, number];
  public frameOutTangent?: [number, number];
  public valueInTangent?: [number, number];
  public valueOutTangent?: [number, number];

  // ---------------------------------------------------------------------
  // Public Static Methods
  // ---------------------------------------------------------------------

  /**
   * Convert the Lottie JSON object to class instance.
   *
   * @param json    JSON object
   * @returns       KeyFrame instance
   */
  public static fromJSON(json: Record<string, any>): KeyFrame {
    const value: KeyFrame = new KeyFrame(json.t, json.s);

    if ('i' in json && 'o' in json) {
      value.frameInTangent = [json.i.x, json.i.y];
      value.frameOutTangent = [json.o.x, json.o.y];
    }

    if ('ti' in json && 'to' in json) {
      value.valueInTangent = [json.ti.x, json.ti.y];
      value.valueOutTangent = [json.to.x, json.to.y];
    }

    return value;
  }

  // ---------------------------------------------------------------------
  // Public Methods
  // ---------------------------------------------------------------------

  /**
   * Constructor.
   *
   * @param frame     Frame number
   * @param value     Property value
   */
  public constructor(frame: number, value: number | number[]) {
    this.frame = frame;
    this.value = value;
  }

  /**
   * Convert the class instance to Lottie JSON object.
   *
   * Called by Javascript when serializing object with JSON.stringify()
   *
   * @returns       JSON object
   */
  public toJSON(): Record<string, any> {
    const json: Record<string, any> = {
      // This shape
      t: this.frame,
      s: this.value,
    };

    if (this.frameInTangent && this.frameOutTangent) {
      json.i = { x: this.frameInTangent[0], y: this.frameInTangent[1] };
      json.o = { x: this.frameOutTangent[0], y: this.frameOutTangent[1] };
    }

    if (this.valueInTangent && this.valueOutTangent) {
      json.ti = [this.valueInTangent[0], this.valueInTangent[1]];
      json.to = [this.valueOutTangent[0], this.valueOutTangent[1]];
    }

    return json;
  }
}
