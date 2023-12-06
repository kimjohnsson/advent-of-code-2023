import { readFileSync } from 'fs';
// Anser: 535235

const schematics = readFileSync('input.txt', { encoding: 'utf-8' })
  .trim()
  .split('\n')
  .map((schematic, index) => {
    const locations = [...schematic.matchAll(/[^0-9.]/g)]
      .map(symbol => symbol.index)
    const parts = [...schematic.matchAll(/[0-9]\d+/g)]
      .map(number => ({ number: number[0], index: number.index }))

    console.log(parts)

    return { row: index, locations, parts }
  })

const partOne = () => {
  let code = 0

  schematics.forEach((row, rowIndex) => {
    row.parts.forEach(part => {
      const startIndex = part.index - 1
      const endIndex = part.index + part.number.length

      for (let i = startIndex; i <= endIndex; i++) {
        if (
          (row.locations.includes(i)) ||
          (schematics[rowIndex - 1] && schematics[rowIndex - 1].locations.includes(i)) ||
          (schematics[rowIndex + 1] && schematics[rowIndex + 1].locations.includes(i))
        ) {
          code += parseInt(part.number)
          return
        }
      }
    })
  })

  console.log(code)
}

partOne()
