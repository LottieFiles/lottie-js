/**
 * Animation metadata information.
 */
export class Meta {
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
   * Convert the Lottie JSON object to class instance.
   *
   * @param json    JSON object
   * @returns       Meta instance
   */
  public fromJSON(json: Record<string, any>): Meta {
    this.author = json.a;
    this.keywords = json.k;
    this.generator = json.g;
    this.description = json.d;
    this.themeColor = json.tc;

    return this;
  }

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
