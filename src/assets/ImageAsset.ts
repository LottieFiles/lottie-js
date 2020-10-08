import { Asset } from './Asset';

export class ImageAsset extends Asset {
  public data?: string;

  public id?: string;

  public height!: number;

  public path?: string;

  public width!: number;

  public static fromJSON(json: Record<string, any>): ImageAsset {
    const asset = new ImageAsset();

    asset.data = json.p;
    asset.id = json.id;
    asset.height = json.h;
    asset.path = json.u;
    asset.width = json.w;

    return asset;
  }

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
