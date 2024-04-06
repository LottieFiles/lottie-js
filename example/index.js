const { Animation } = require('@lottiefiles/lottie-js');

const fs = require('fs');

async function run() {
  const anim = await Animation.fromURL('https://assets1.lottiefiles.com/packages/lf20_u4j3xm6r.json');

  // Print some data of the animation
  console.log('Frame Rate', anim.frameRate);
  console.log('Number of Layers', anim.layers.length);
  console.log('Unique Colors', anim.colors);
  console.log('Total Frames', anim.totalFrames);
  console.log('Durations', anim.duration);

  // Manipulate animation
  anim.name = 'Woohoo';
  anim.width = 512;
  anim.height = 512;

  // Get the new JSON
  const woohooLottie = JSON.stringify(anim);
  // Write JSON data to a local file
  fs.writeFile('res/woohooLottie.json', woohooLottie, err => {
    if (err) {
      console.error('Error writing JSON to file:', err);
      return;
    }
    console.log('JSON data has been written to woohooLottie.json');
  });
}

Promise.resolve(run());
