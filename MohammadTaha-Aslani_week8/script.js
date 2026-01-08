// countOccurrences function Exercise
function countOccurrences(arr) {
  const map = new Map();

  for (const item of arr) {
    if (map.has(item)) {
      map.set(item, map.get(item) + 1);
    } else {
      map.set(item, 1);
    }
  }

  return map;
}

const items = ['apple', 'banana', 'apple', 'orange', 'banana', 'banana'];
const result = countOccurrences(items);
console.log(result); // Expected Output: Map(3) { 'apple' => 2, 'banana' => 3, 'orange' => 1 }

// multiply function exercise
function multiply(...nums) {
  const uniqueNumbers = [...new Set(nums)];
  return uniqueNumbers.reduce((acc, num) => acc * num, 1);
}

console.log(multiply(2, 3, 4)); // 24
console.log(multiply(2, 3, 2, 4)); // 24
console.log(multiply(5, 5, 5, 5, 1)); // 5
console.log(multiply(7, 7, 2)); // 14

// getElement function exercise
function getElement(array, index) {
  try {
    if (!Array.isArray(array)) {
      throw new TypeError('First argument must be an array');
    }
    if (typeof index !== 'number') {
      throw new TypeError('Second argument must be a number');
    }
    if (index < 0 || index >= array.length) {
      throw new RangeError('Index out of bounds');
    }

    return array[index];
  } catch (error) {
    return error;
  }
}
let arr = [1, 2, 3, 4, 5];
console.log(getElement(arr, 2)); // 3
console.log(getElement(arr, 10)); // RangeError: Index out of bounds
console.log(getElement(arr, 'two')); // TypeError: Second argument must be a number
console.log(getElement('not an array', 2)); // TypeError: First argument must be an array
