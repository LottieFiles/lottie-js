/**
 * Text layer type.
 */
export class Font {
  public fname = '';
  public fFamily = '';
  public fStyle = '';
  public ascent = 0;

  public fPath = '';
  public fWeight = '';
  public origin = -1;
  public fClass = '';

  /**
   * Convert the Lottie JSON object to class instance.
   *
   * @param json    JSON object
   * @returns       TextLayer instance
   */
  public fromJSON(json: Record<string, any>): Font {
    this.fname = json.fname;
    this.fFamily = json.fFamily;
    this.fStyle = json.fStyle;
    this.ascent = json.ascent;
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
      fname: this.fname,
      fFamily: this.fFamily,
      fStyle: this.fStyle,
      ascent: this.ascent,
      ...(!(this.fPath === '') && { fPath: this.fPath }),
      ...(!(this.fWeight === '') && { fWeight: this.fWeight }),
      ...(!(this.origin >= 0) && { origin: this.origin }),
      ...(!(this.fClass === '') && { fClass: this.fClass }),
    };
  }
}
