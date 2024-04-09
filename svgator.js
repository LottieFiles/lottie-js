// eslint-disable-next-line @typescript-eslint/no-var-requires
const fs = require('fs');

// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path');

const src = __dirname + path.sep + 'dist';
const dst = fs.realpathSync(__dirname + '/../app/website/assets/@lottiefiles/lottie-js/dist');

console.log('Copying:', src);
console.log('→', dst);
fs.cpSync(src + path.sep, dst + path.sep, { recursive: true });
