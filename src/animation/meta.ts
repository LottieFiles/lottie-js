/**
 * Animation metadata information.
 */
export class Meta {
  // ---------------------------------------------------------------------
  // Public Properties
  // ---------------------------------------------------------------------

  /**
   * Author name.
   */
  public author?: string;

  /**
   * Keywords.
   */
  public keywords?: string;

  /**
   * Generator.
   */
  public generator = process.env.GENERATOR;

  /**
   * Description.
   */
  public description?: string;

  /**
   * Theme color.
   */
  public themeColor?: string;

  // ---------------------------------------------------------------------
  // Public Static Methods
  // ---------------------------------------------------------------------

  /**
   * Convert the Lottie JSON object to class instance.
   *
   * @param json    JSON object
   * @returns       Meta instance
   */
  public static fromJSON(json: Record<string, any>): Meta {
    const meta = new Meta();

    meta.author = json.a;
    meta.keywords = json.k;
    meta.generator = json.g;
    meta.description = json.d;
    meta.themeColor = json.tc;

    return meta;
  }

  // ---------------------------------------------------------------------
  // Public Methods
  // ---------------------------------------------------------------------

  /**
   * Convert the class instance to Lottie JSON object.
   *
   * Called by Javascript when serializing object with JSON.stringify()
   *
   * @returns JSON object
   */
  public toJSON(): Record<string, any> {
    return {
      a: this.author,
      k: this.keywords,
      g: this.generator,
      d: this.description,
      tc: this.themeColor,
    };
  }
}
