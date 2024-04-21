const fs = require('fs');
const path = require('path');
const zlib = require('zlib');
const { Parser, Animation, ImageLayer } = require('@lottiefiles/lottie-js');

async function run() {
  const anim = await Animation.fromURL('https://assets1.lottiefiles.com/packages/lf20_u4j3xm6r.json');
  console.log(anim);

  const directoryPath = path.join(__dirname, '/res/svga');
  fs.readdir(directoryPath, function (err, files) {
    if (err) {
      return console.log('Unable to scan directory: ' + err);
    }
    files.forEach(function (file) {
      Promise.resolve(convertSvgaToLottie(directoryPath, file));
    });
  });
}

async function convertSvgaToLottie(svgaDirectoryPath, fileName) {
  var data = fs.readFileSync(path.join(svgaDirectoryPath, fileName));
  const arrayBuffer = data.buffer.slice(data.byteOffset, data.byteOffset + data.byteLength);
  var input = new Uint8Array(arrayBuffer);
  const inflatedData = zlib.inflateSync(input);
  const parser = new Parser();
  const svga = parser.load(inflatedData);
  // console.log(svga);

  const anim = new Animation();
  anim.fromJSON({
    ddd: 0,
    v: '5.12.2',
    nm: svga.name,
    w: svga.size.width,
    h: svga.size.height,
    fr: svga.fps,
    op: svga.frames,
    ip: 0,
    assets: [],
    layers: [],
    markers: [],
    props: {},
  });

  // 拷贝资源
  for (const key in svga.images) {
    const image = svga.images[key];
    const size = get_size(image);
    anim.assets.push({
      w: size.width,
      h: size.height,
      id: key,
      p: image,
      u: '',
    });
  }

  // 拷贝图层
  for (var i = 0; i < svga.sprites.length; i++) {
    const sprite = svga.sprites[i];
    const tanA = 0.833;
    const tanB = 0.167;

    var anchorX = 0;
    var anchorY = 0;
    var positionKeyFrames = [];
    var scaleKeyFrames = [];
    var rotationKeyFrames = [];

    // 拷贝关键帧
    for (var j = 0; j < sprite.frames.length; j++) {
      const frame = sprite.frames[j];
      if (!frame.isEmpty) {
        if (anchorX == 0 && anchorY == 0) {
          anchorX = frame.layout.width / 2.0;
          anchorY = frame.layout.height / 2.0;
        }

        const pointX = frame.layout.x + frame.layout.width / 2.0;
        const pointY = frame.layout.y + frame.layout.height / 2.0;
        const { a, b, c, d, tx, ty } = frame.transform;
        const newX = a * pointX + c * pointY + tx;
        const newY = b * pointX + d * pointY + ty;
        const scaleX = Math.sqrt(a * a + b * b);
        const scaleY = Math.sqrt(c * c + d * d);
        const rotation = Math.atan2(b, a) * (180 / Math.PI);

        positionKeyFrames.push({
          t: j,
          s: [newX, newY, 0],
          i: {
            x: tanA,
            y: tanA,
          },
          o: {
            x: tanB,
            y: tanB,
          },
          ti: [0, 0, 0],
          to: [0, 0, 0],
        });
        scaleKeyFrames.push({
          t: j,
          s: [scaleX * 100, scaleY * 100, 100],
          i: {
            x: [tanA, tanA, tanA],
            y: [tanA, tanA, tanA],
          },
          o: {
            x: [tanB, tanB, tanB],
            y: [tanB, tanB, tanB],
          },
        });
        rotationKeyFrames.push({
          t: j,
          s: [rotation],
          i: {
            x: [tanA],
            y: [tanA],
          },
          o: {
            x: [tanB],
            y: [tanB],
          },
        });
      }
    }

    const keyFrames = {
      a: {
        a: 0,
        ix: 1,
        k: [anchorX, anchorY, 0],
        l: 2,
      },
      p: {
        a: 1,
        ix: 2,
        l: 2,
        k: positionKeyFrames,
      },
      s: {
        a: 1,
        ix: 6,
        l: 2,
        k: scaleKeyFrames,
      },
      r: {
        a: 1,
        ix: 10,
        k: rotationKeyFrames,
      },
      o: {
        a: 0,
        ix: 11,
        k: 100,
      },
    };

    if (str.endsWith(".vector")) {

    } else {
      const imageLayer = new ImageLayer();
      imageLayer.fromJSON({
        ao: 0,
        bm: 0,
        cl: 'png',
        ddd: 0,
        ind: 1,
        ip: 0,
        ks: keyFrames,
        nm: sprite.imageKey + '.png',
        op: sprite.frames.length,
        refId: sprite.imageKey,
        sr: 1,
        st: 0,
        ty: 2,
      });
      anim.layers.push(imageLayer);
    }
  }
  const svga2lottie = JSON.stringify(anim);
  // console.log(svga2lottie);

  const svgaFolder = '/svga';
  const lottieDirectoryPath = svgaDirectoryPath.slice(0, -svgaFolder.length) + '/lottie';
  const lottieFileName = fileName.replace('.svga', '.json');
  fs.writeFile(path.join(lottieDirectoryPath, lottieFileName), svga2lottie, err => {
    if (err) {
      console.error('Error writing JSON to file:', err);
      return;
    }
    console.log('JSON data has been written to ' + lottieFileName);
  });
}

function get_size(base64) {
  if (base64.substring(0, 22) === 'data:image/png;base64,') {
    const data = base64.substring(22 + 20, 22 + 32);
    const base64Characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
    const nums = [];
    for (const c of data) {
      nums.push(base64Characters.indexOf(c));
    }
    const bytes = [];
    for (let i = 0; i < nums.length; i += 4) {
      bytes.push((nums[i] << 2) + (nums[i + 1] >> 4));
      bytes.push(((nums[i + 1] & 15) << 4) + (nums[i + 2] >> 2));
      bytes.push(((nums[i + 2] & 3) << 6) + nums[i + 3]);
    }
    const width = (bytes[1] << 24) + (bytes[2] << 16) + (bytes[3] << 8) + bytes[4];
    const height = (bytes[5] << 24) + (bytes[6] << 16) + (bytes[7] << 8) + bytes[8];
    return {
      width,
      height,
    };
  }
  throw Error('unsupported image type');
}

Promise.resolve(run());
