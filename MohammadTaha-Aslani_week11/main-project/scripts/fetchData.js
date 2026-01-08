export default function fetchData() {
  return new Promise((resolve) => {
    setTimeout(() => {
      const randomNumber = Math.floor(Math.random() * 10) + 1;
      resolve(randomNumber);
    }, 500);
  });
}
