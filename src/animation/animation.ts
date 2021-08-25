import fetch from 'cross-fetch';

import { Asset, ImageAsset, PrecompositionAsset } from '../assets';
import { AssetType, LayerType, PropertyType } from '../constants';
import { Layer, PrecompositionLayer, ShapeLayer } from '../layers';
// import { Shape } from '../shapes';
import { GroupLayer } from '../layers/group-layer';
import { ImageLayer } from '../layers/image-layer';
import { SolidLayer } from '../layers/solid-layer';
import { TextLayer } from '../layers/text-layer';
import { Marker } from '../markers';
import { Property } from '../properties';
import { KeyFrame } from '../timeline';
import { useRegistry } from '../utils/use-registry';
import { Meta } from './meta';

/**
 * Animation contains all the information about the Lottie animation.
 */
export class Animation {
  public assets: Asset[] = [];
  public frameRate = 0;
  public height = 0;
  public inPoint = 0;
  public is3D = false;
  public layers: Layer[] = [];
  public markers: Marker[] = [];
  public meta: Meta = new Meta(this);
  public name = '';
  public outPoint = 0;
  public version = ``;
  public width = 0;

  /**
   * Create a class instance from the URL to the Lottie JSON.
   *
   * @param url     URL string
   * @returns       Animation instance
   */
  public static async fromURL(url: string): Promise<Animation> {
    if (typeof url !== 'string') {
      throw new Error(`The url value must be a string`);
    }

    let json;

    try {
      // Try construct an absolute URL from the src URL
      const srcUrl: URL = new URL(url);

      // Fetch the JSON file from the URL
      const result = await fetch(srcUrl.toString());
      json = await result.json();
    } catch (err) {
      throw new Error(`An error occurred while trying to load the Lottie file from URL`);
    }

    // Create a new animation instance and import JSON
    const anim = new Animation();

    return anim.fromJSON(json);
  }

  /**
   * Returns whether the given object looks like a valid Lottie JSON structure.
   *
   * This method checks for the presense of the mandatory fields 'v', 'ip', 'op', 'layers', 'fr', 'w' and 'h' in the object.
   *
   * @param json    Object
   * @returns       Boolean true if it is a valid Lottie
   */
  public static isLottie(json: Record<string, any>): boolean {
    const mandatory = ['v', 'ip', 'op', 'layers', 'fr', 'w', 'h'];

    return mandatory.every(field => Object.prototype.hasOwnProperty.call(json, field));
  }

  /*
   * Returns all the colors used in the animation.
   *
   * @returns Array of colors.
   */
  public get colors(): string[] {
    const colors: Set<string> = new Set();

    [...useRegistry().keys()]
      // Filter color properties
      .filter((p: Property) => p.type === PropertyType.COLOR)
      .forEach((cp: Property) => {
        cp.values.forEach((v: KeyFrame) => {
          const colorParts = v.value as [number, number, number, number];
          colors.add(
            JSON.stringify([
              Math.round(colorParts[0] * 255),
              Math.round(colorParts[1] * 255),
              Math.round(colorParts[2] * 255),
              colorParts[3],
            ]),
          );
        });
      });

    return Array.from(colors).map(c => JSON.parse(c));
  }

  /*
   * Returns all the colors used in the animation.
   *
   * @returns Array of colors.
   */

  public get colorsVerbose(): Record<string, any>[] {
    const colors: Record<string, any>[] = [];

    // map the lottie into lottie js
    // all the properties are stored inside a registry.  (type == color)
    // inside each property there are many key frames
    // each keyframe has a color.

    [...useRegistry().keys()]
      // Filter color properties
      .filter((p: Property) => p.type === PropertyType.COLOR)
      .forEach((cp: Property) => {
        const parent = cp.getParent();
        const pathString = this.parentPath(parent, parent.name);
        console.log(pathString);
        cp.values.forEach((v: KeyFrame) => {
          // console.log(v);
          const colorParts = v.value as [number, number, number, number];
          const color = JSON.stringify([
            Math.round(colorParts[0] * 255),
            Math.round(colorParts[1] * 255),
            Math.round(colorParts[2] * 255),
            colorParts[3],
          ]);
          console.log(color);
        });
        // console.log('------------------------');
      });

    return colors;
  }

  public parentPath(shape: any, identifier: string): any {
    let pathString = '';
    if (shape.parent === undefined) {
      // stop recursion
      //...
      return pathString;
    } else {
      const parent = shape.parent;
      pathString = identifier + '.' + parent.name;
      this.parentPath(parent, pathString);
    }
  }

  /**
   * Returns the running time of the animation in seconds.
   *
   * @returns Number of seconds.
   */
  public get duration(): number {
    return this.totalFrames / this.frameRate;
  }

  /**
   * Returns the size of the Lottie JSON in bytes.
   *
   * @returns Number of bytes.
   */
  public get fileSize(): number {
    return new TextEncoder().encode(JSON.stringify(this)).length;
  }

  /**
   * Returns the total number of frames in the animation.
   *
   * @returns Number of frames.
   */
  public get totalFrames(): number {
    return this.outPoint - this.inPoint;
  }

  /**
   * Creates and returns a new asset of the given type.
   *
   * @param type    Asset type string.
   */
  public createAsset(type: AssetType): Asset {
    if (type === AssetType.PRECOMPOSITION) {
      return new PrecompositionAsset(this);
    } else if (type === AssetType.IMAGE) {
      return new ImageAsset(this);
    }

    throw new Error(`Invalid or unknown asset type ${type}`);
  }

  /**
   * Creates and returns a new asset from JSON.
   *
   * @param json    JSON object.
   */
  public createAssetFromJSON(json: Record<string, any>): Asset {
    try {
      const asset = this.createAsset('layers' in json ? AssetType.PRECOMPOSITION : AssetType.IMAGE);

      return asset.fromJSON(json);
    } catch {
      throw new Error(`Unable to create asset from JSON`);
    }
  }

  /**
   * Creates and returns a new layer of the given type.
   *
   * @param type    Layer type string.
   */
  public createLayer(type: LayerType): Layer {
    if (type === LayerType.PRECOMPOSITION) {
      return new PrecompositionLayer(this);
    } else if (type === LayerType.SHAPE) {
      return new ShapeLayer(this);
    } else if (type === LayerType.GROUP) {
      return new GroupLayer(this);
    } else if (type === LayerType.SOLID) {
      return new SolidLayer(this);
    } else if (type === LayerType.IMAGE) {
      return new ImageLayer(this);
    } else if (type === LayerType.TEXT) {
      return new TextLayer(this);
    }

    throw new Error(`Invalid or unknown layer type: ${type}`);
  }

  /**
   * Creates and returns a new layer from JSON.
   *
   * @param json    JSON object.
   */
  public createLayerFromJSON(json: Record<string, any>): Layer {
    try {
      const layer = this.createLayer(json.ty);

      return layer.fromJSON(json);
    } catch (e) {
      console.log(e);
      throw new Error(`Unable to create layer type from JSON: ${json.ty}`);
    }
  }

  /**
   * Creates and returns a new marker.
   */
  public createMarker(): Marker {
    return new Marker();
  }

  /**
   * Creates and returns a new marker from JSON.
   *
   * @param json    JSON object.
   */
  public createMarkerFromJSON(json: Record<string, any>): Marker {
    try {
      const marker = this.createMarker();

      return marker.fromJSON(json);
    } catch (e) {
      console.log(e);
      throw new Error(`Unable to create marker from JSON`);
    }
  }

  /*
   * Convert the Lottie JSON object to class instance.
   *
   * @param json    JSON object
   * @returns       Animation instance
   */
  public fromJSON(json: Record<string, any>): Animation {
    if (Animation.isLottie(json) === false) {
      throw new Error(`The given object is not a valid Lottie JSON structure`);
    }

    this.frameRate = json.fr;
    this.height = json.h;
    this.inPoint = json.ip;
    this.is3D = json.ddd;
    this.name = json.nm;
    this.outPoint = json.op;
    this.version = json.v;
    this.width = json.w;

    this.assets = json.assets.map((jAsset: Record<string, any>) => this.createAssetFromJSON(jAsset)).filter(Boolean);

    this.layers = json.layers.map((jLayer: Record<string, any>) => this.createLayerFromJSON(jLayer)).filter(Boolean);

    this.markers = json.markers
      .map((jMarker: Record<string, any>) => this.createMarkerFromJSON(jMarker))
      .filter(Boolean);

    if ('meta' in json) {
      this.meta.fromJSON(json.meta);
    }

    return this;
  }

  /**
   * Returns the layer with the given ID.
   *
   * @param id    Layer ID string.
   * @returns     Layer instance.
   */
  public getLayerById(id: string): Layer | undefined {
    // Validate argument type
    if (typeof id !== 'string') {
      throw new Error(`ID value must be a string`);
    }

    return this.layers.find((layer: Layer) => layer.id === id);
  }

  /**
   * Returns the layers with the given class.
   *
   * @param className    Layer class name string.
   * @returns            Array of layer instances.
   */
  public getLayersByClassName(className: string): Layer[] {
    // Validate argument type
    if (typeof className !== 'string') {
      throw new Error(`Class name value must be a string`);
    }

    return this.layers.filter((layer: Layer) => layer.classNames.includes(className));
  }

  /**
   * Returns the layers of the given type.
   *
   * @param type    LayerType value.
   * @returns       Layer instance.
   */
  public getLayersByType(type: LayerType): Layer[] {
    // Validate argument type
    if (type in LayerType === false) {
      throw new Error(`Type value must be a valid LayerType value`);
    }

    return this.layers.filter((layer: Layer) => layer.type === type);
  }

  /**
   * Convert the class instance to Lottie JSON object.
   *
   * Called by Javascript when serializing object with JSON.stringify()
   *
   * @returns       JSON object
   */
  public toJSON(key?: string): Record<string, any> | undefined {
    if (key) {
      return undefined;
    }

    return {
      assets: this.assets,
      ddd: this.is3D ? 1 : 0,
      fr: this.frameRate,
      h: this.height,
      ip: this.inPoint,
      layers: this.layers.map(layer => layer.toJSON()),
      markers: this.markers.map(marker => marker.toJSON()),
      meta: this.meta,
      nm: this.name,
      op: this.outPoint,
      v: this.version || '5.6.0',
      w: this.width,
    };
  }
}
