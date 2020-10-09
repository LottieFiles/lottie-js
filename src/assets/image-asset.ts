import { Asset } from './asset';

/**
 * Image asset type.
 */
export class ImageAsset extends Asset {
  // ---------------------------------------------------------------------
  // Public Properties
  // ---------------------------------------------------------------------

  public data?: string;

  public id?: string;

  public height!: number;

  public path?: string;

  public width!: number;

  // ---------------------------------------------------------------------
  // Public Static Methods
  // ---------------------------------------------------------------------

  /**
   * Convert the Lottie JSON object to class instance.
   *
   * @param json    JSON object
   * @returns       ImageAsset instance
   */
  public static fromJSON(json: Record<string, any>): ImageAsset {
    const asset = new ImageAsset();

    asset.data = json.p;
    asset.id = json.id;
    asset.height = json.h;
    asset.path = json.u;
    asset.width = json.w;

    return asset;
  }

  // ---------------------------------------------------------------------
  // Public Properties
  // ---------------------------------------------------------------------

  /**
   * Convert the class instance to Lottie JSON object.
   *
   * Called by Javascript when serializing object with JSON.stringify()
   *
   * @returns       JSON object
   */
  public toJSON(): Record<string, any> {
    return {
      h: this.height,
      i: this.id,
      p: this.data,
      u: this.path,
      w: this.width,
    };
  }
}
