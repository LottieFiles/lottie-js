const { Animation } = require('@lottiefiles/lottie-js');

async function run() {
  const anim = await Animation.fromURL('https://assets1.lottiefiles.com/packages/lf20_u4j3xm6r.json');

  // Print some data of the animation
  console.log('Frame Rate', anim.frameRate);
  console.log('Number of Layers', anim.layers.length);
  console.log(anim.getColors());

  // Manipulate animation
  anim.name = 'Woohoo';
  anim.width = 512;
  anim.height = 512;

  // Get the new JSON
  const woohooLottie = JSON.stringify(anim);
  console.log(woohooLottie);
}

Promise.resolve(run()).catch(() => {
  throw new Error('Error!');
});
