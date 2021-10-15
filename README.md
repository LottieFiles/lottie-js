# lottie-js

An object model for representing the Lottie JSON structure.

This library was created to make interacting with the Lottie JSON object simpler. The library consists of methods to map
the Lottie JSON to the object model and interact with properties as well as manipulate them. The goal is to fully map
the Lottie object model and add in enough helper methods to the library such that Lottie manipulation can be made easier
without having to learn the entire complex structure of a Lottie file.

### Full Documentation is available here [Click me](https://docs.lottiefiles.com/lottie-js/)

### Usage

1. Install

```
yarn add @lottiefiles/lottie-js@0.0.1
```

2. Use

```
import { Animation } from '@lottiefiles/lottie-js';

async function loadAnimation() {
  // Create Lottie instance
  // (you can also use Animation.fromJSON method if you already have the Lottie JSON loaded)
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

Promise.resolve(loadAnimation());
```

### Documentation &amp; API

---

The documenting system used is [TypeDoc](https://typedoc.org/).

Clone the repo and run the yarn command: `yarn docs` to generate the docs to browse locally.

The generated documentation is placed in the docs/ folder.

### Testing

---

The testing system used is [Jest](https://jestjs.io/) and each file should have an accompanying test suite for
functional and integration tests.

### Development

---

Development work on the toolkit requires Nodejs and Yarn.

#### Guidelines

- Use [defensive programming](https://en.wikipedia.org/wiki/Defensive_programming) techniques: Ensure type and range of
  input values, cast values to native representation whenever possible, etc.
- Refrain from using external dependencies: Discuss before adding a dependency. Check with
  [Bundlephobia](https://bundlephobia.com/) for package size and dependencies when choosing one.
- Use code formatting in the IDE using the given eslint+prettier configs.
- Write tests to cover all functions and code branches with valid and invalid values.

#### Setting up

```
git clone https://github.com/LottieFiles/lottie-js

cd lottie-js

yarn install
```

#### Running test suite

```
yarn test
```

#### Building

```
yarn build
```
