const fs = require('fs');
const zlib = require('zlib');
const { Parser } = require('@lottiefiles/lottie-js');

async function run() {

  var data = fs.readFileSync('/Users/dd/Desktop/Work/Lottie/svga2lottie-js/example/res/rose.svga');
  const arrayBuffer = data.buffer.slice(data.byteOffset, data.byteOffset + data.byteLength);
  var input = new Uint8Array(arrayBuffer);
  const inflatedData = zlib.inflateSync(input);
  const parser = new Parser();
  const svga = parser.load(inflatedData);
  console.log(svga);

  // const anim = await Animation.fromURL('https://assets1.lottiefiles.com/packages/lf20_u4j3xm6r.json');

  // // Print some data of the animation
  // console.log('Frame Rate', anim.frameRate);
  // console.log('Number of Layers', anim.layers.length);
  // console.log('Unique Colors', anim.colors);
  // console.log('Total Frames', anim.totalFrames);
  // console.log('Durations', anim.duration);

  // // Manipulate animation
  // anim.name = 'Woohoo';
  // anim.width = 512;
  // anim.height = 512;

  // // Get the new JSON
  // const woohooLottie = JSON.stringify(anim);
  // // Write JSON data to a local file
  // fs.writeFile('res/woohooLottie.json', woohooLottie, err => {
  //   if (err) {
  //     console.error('Error writing JSON to file:', err);
  //     return;
  //   }
  //   console.log('JSON data has been written to woohooLottie.json');
  // });
}

Promise.resolve(run());
