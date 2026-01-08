import fetchData from './fetchData.js';

export default async function doubleAndAdd() {
  return fetchData()
    .then(async (first) => {
      if (first < 2) {
        throw new RangeError('Not in valid range');
      }
      const second = await fetchData();
      if (second < 2) {
        throw new RangeError('Not in valid range');
      }
      return first * 2 + second;
    })
    .catch((error) => {
      throw error;
    });
}
