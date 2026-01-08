// Arrays Exercises
const numbers = [5, 12, 8, 130, 44];

const descendingSortedArray = [...numbers].sort((a, b) => b - a);
const lowerThanThirtyArray = numbers.filter((num) => num <= 30);
const sumOfArray = numbers.reduce((prev, cur) => prev + cur, 0);
const stringNumbersArray = numbers.map((num) => num.toString());
const numbersMinusIndexArray = numbers.map((num, index) => num - index);

console.log({
  descendingSortedArray,
  lowerThanThirtyArray,
  sumOfArray,
  stringNumbersArray,
  numbersMinusIndexArray,
});

// getWeekDay function exercise
function getWeekday(date) {
  const days = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];

  return days[date.getDay()];
}

console.log(getWeekday(new Date()));
console.log(getWeekday(new Date('2012-10-10')));

// getRandomInt function Exercise
const getRandomInt = (min, max) => {
  if (!max) {
    max = min;
    min = 0;
  }
  if (!max && !min) return 0;
  return min + Math.floor(Math.random() * (max - min + 1));
};

console.log(getRandomInt(1, 5));

// kebabToPascalCase function exercise
function kebabToPascalCase(sentence) {
  const words = sentence.split(' ');
  const transformedWords = words.map((word) => {
    if (word.includes('-')) {
      const parts = word.split('-');
      const pascalCaseWord = parts
        .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
        .join('');
      return pascalCaseWord;
    } else {
      return word.charAt(0).toUpperCase() + word.slice(1);
    }
  });
  return transformedWords.join(' ');
}

const sentence = 'convert kebab-case to pascal-case';
const result = kebabToPascalCase(sentence);
console.log(result);
