import { Asset } from './asset';

/**
 * Image asset type.
 */
export class ImageAsset extends Asset {
  public data?: string;

  public embedded?: number;

  public id?: string;

  public height!: number;

  public path?: string;

  public width!: number;

  /**
   * Convert the Lottie JSON object to class instance.
   *
   * @param json    JSON object
   * @returns       ImageAsset instance
   */
  public fromJSON(json: Record<string, any>): ImageAsset {
    this.data = json.p;
    this.embedded = json.e;
    this.id = json.id;
    this.height = json.h;
    this.path = json.u;
    this.width = json.w;

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
      e: this.embedded,
      h: this.height,
      id: this.id,
      p: this.data,
      u: this.path,
      w: this.width,
    };
  }
}
