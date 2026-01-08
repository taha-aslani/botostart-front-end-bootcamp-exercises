export default function randomPromise() {
  return new Promise((resolve, reject) => {
    const random = Math.random();

    if (random < 0.5) {
      resolve('Hello World');
    } else {
      reject('Error occurred');
    }
  });
}
