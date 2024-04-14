import { Root } from 'protobufjs';

import SVGA_PROTO from '../entity/svga-proto';
import { VideoEntity } from '../entity/video-entity';
import { Movie, RawImages, Video } from '../types';

const proto = Root.fromJSON(SVGA_PROTO);
const message = proto.lookupType('com.opensource.svga.MovieEntity');

export class Parser {
  load(inflateData: any): Video {
    const movie = (message.decode(inflateData) as unknown) as Movie;
    const images: RawImages = {};
    for (const key in movie.images) {
      const image = movie.images[key];
      const value = this.uint8ArrayToString(image);
      images[key] = 'data:image/png;base64,' + new Buffer(value, 'binary').toString('base64');
    }
    return new VideoEntity(movie, images);
  }

  uint8ArrayToString(u8a: Uint8Array): string {
    let dataString = '';
    for (let i = 0; i < u8a.length; i++) {
      dataString += String.fromCharCode(u8a[i]);
    }
    return dataString;
  }
}
