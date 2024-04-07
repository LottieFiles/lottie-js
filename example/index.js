const fs = require('fs');
const zlib = require('zlib');
const { Parser, Animation } = require('@lottiefiles/lottie-js');

async function run() {

  var data = fs.readFileSync('/Users/dd/Desktop/Work/Lottie/svga2lottie-js/example/res/rose.svga');
  const arrayBuffer = data.buffer.slice(data.byteOffset, data.byteOffset + data.byteLength);
  var input = new Uint8Array(arrayBuffer);
  const inflatedData = zlib.inflateSync(input);
  const parser = new Parser();
  const svga = parser.load(inflatedData);
  console.log(svga);

  const anim = await Animation.fromURL('https://assets1.lottiefiles.com/packages/lf20_u4j3xm6r.json');

  // Print some data of the animation
  console.log('Frame Rate', anim.frameRate);
  console.log('Number of Layers', anim.layers.length);
  console.log('Unique Colors', anim.colors);
  console.log('Total Frames', anim.totalFrames);
  console.log('Durations', anim.duration);

  // Manipulate animation
  anim.name = svga.name;
  anim.width = svga.width;
  anim.height = svga.height;

  // Get the new JSON
  const svga2lottie = JSON.stringify(anim);
  // Write JSON data to a local file
  fs.writeFile('res/svga2lottie.json', svga2lottie, err => {
    if (err) {
      console.error('Error writing JSON to file:', err);
      return;
    }
    console.log('JSON data has been written to svga2lottie.json');
  });
}

Promise.resolve(run());
