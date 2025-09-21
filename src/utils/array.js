export const shuffleArray = (inputArray) => {
  if (!Array.isArray(inputArray)) return [];
  const arrayCopy = [...inputArray];
  for (let index = arrayCopy.length - 1; index > 0; index--) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    const temp = arrayCopy[index];
    arrayCopy[index] = arrayCopy[swapIndex];
    arrayCopy[swapIndex] = temp;
  }
  return arrayCopy;
};
