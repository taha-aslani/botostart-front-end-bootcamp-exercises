import randomPromise from './randomPromise.js';
import doubleAndAdd from './doubleAndAdd.js';

randomPromise().then(console.log).catch(console.log);

doubleAndAdd()
  .then((result) => {
    console.log(result);
  })
  .catch((error) => {
    console.error(error.toString());
  });
