export class Meta {
  public author?: string;
  public keywords?: string;
  public generator?: string;
  public description?: string;
  public themeColor?: string;

  public static fromJSON(json: Record<string, any>): Meta {
    const meta = new Meta();

    meta.author = json.a;
    meta.keywords = json.k;
    meta.generator = json.g;
    meta.description = json.d;
    meta.themeColor = json.tc;

    return meta;
  }

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
