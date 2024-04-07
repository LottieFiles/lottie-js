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
    return new VideoEntity(movie, images);
  }
}
