import { readFileSync } from 'fs';

const calibrationDocument = readFileSync('input.txt', { encoding: 'utf-8' })
  .replace(/\r/g, '')
  .trim()
  .split('\n\n')
  .map(x => x.split('\n'))
  .pop()


const partOne = () => {
  const getNumbers = (str) => str.split('').filter(car => !isNaN(Number(car)))

  const calibrationNumber = calibrationDocument.map(calibration => {
    const firstNum = getNumbers(calibration).shift()
    const lastNum = getNumbers(calibration).pop()
    console.log(`${firstNum}${lastNum}`)
    return `${firstNum}${lastNum}`
  })
    .map(num => Number(num))
    .reduce((partialSum, a) => partialSum + a, 0)

  console.log(calibrationNumber)
}

const partTwo = () => {
  let numbers = []
  const validNumbers = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine']

  calibrationDocument.forEach(calibration => {
    let firstNum
    let lastNum

    calibration.split('').forEach((car, index) => {
      if (!isNaN(Number(car))) {
        if (!firstNum || (index >= 0 && firstNum.index > index)) {
          firstNum = { index, num: car }
        }

        if (!lastNum || (index >= 0 && lastNum.index < index)) {
          lastNum = { index, num: car }
        }
      }
    })

    validNumbers.forEach((num, index) => {
      const firstIndex = calibration.indexOf(num)
      const lastIndex = calibration.lastIndexOf(num)

      if (!firstNum || (firstIndex >= 0 && firstNum.index > firstIndex)) {
        firstNum = { index: firstIndex, num: index + 1 }
      }

      if (!lastNum || (lastIndex >= 0 && lastNum.index < lastIndex)) {
        lastNum = { index: lastIndex, num: index + 1 }
      }
    })

    numbers.push(`${firstNum.num}${lastNum.num}`)
  })

  const code = numbers
    .map(num => Number(num))
    .reduce((partialSum, a) => partialSum + a, 0)

  console.log(code)
}

partOne()
partTwo()
