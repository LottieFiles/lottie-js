import { TextCaps, TextJustify } from '../constants';
import { Color, ColorRgb } from './color';
import { Value } from './value';

export class TextDocument implements Value {
  public fontFamily = '';
  public fontColor: Color = new ColorRgb(0, 0, 0);
  public fontSize = 0;
  public text = '';

  public lineHeight?: number;
  public boxSize?: [number, number];
  public justify?: TextJustify;
  public textCaps?: TextCaps;
  public textTracking?: number;
  public strokeColor?: Color;
  public strokeWidth?: number;

  /**
   * Convert the Lottie JSON object to class instance.
   *
   * @param json    JSON object
   * @returns       TextDocument instance
   */
  public static fromJSON(json: Record<string, any>): TextDocument {
    const document = new TextDocument();

    document.fontFamily = json.f;
    document.fontColor = Color.fromJSON(json.fc);
    document.fontSize = json.s;
    document.lineHeight = json.lh;
    document.boxSize = json.sz;
    document.text = json.t;
    document.justify = json.j;
    document.textCaps = json.ca;
    document.textTracking = json.tr;
    document.strokeWidth = json.sw;

    if ('sc' in json) {
      document.strokeColor = Color.fromJSON(json.sc);
    }

    return document;
  }

  public toJSON(): any {
    return {
      f: this.fontFamily,
      fc: this.fontColor,
      s: this.fontSize,
      lh: this.lineHeight,
      sz: this.boxSize,
      t: this.text,
      j: this.justify,
      ca: this.textCaps,
      tr: this.textTracking,
      sc: this.strokeColor,
      sw: this.strokeWidth,
    };
  }
}
