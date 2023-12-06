import { readFileSync } from 'fs';

const convertToGameObject = (game) => {
  const gameId = game[0].split(' ')[1]
  const draws = game[1].split((/; /g)).map(draw => draw.split(/, /g))

  const subsets = draws.map(subset => {
    const subsetObject = {};
    subset.forEach(item => {
      const [count, color] = item.split(' ');
      subsetObject[color] = parseInt(count);
    });
    return subsetObject;
  })

  return ({ game: gameId, subsets })
}

const games = readFileSync('input.txt', { encoding: 'utf-8' })
  .trim()
  .split('\n')
  .map(game => game.split(/: /g))
  .map(convertToGameObject)

const partOne = () => {
  const maxAmount = { red: 12, green: 13, blue: 14 }
  let code = 0

  games.forEach(game => {
    const gameResults = game.subsets.map(set => {
      if (
        (!set.red || set.red <= maxAmount.red) &&
        (!set.green || set.green <= maxAmount.green) &&
        (!set.blue || set.blue <= maxAmount.blue)
      ) {
        return true
      }
      return false
    })

    if (!gameResults.includes(false)) {
      code += parseInt(game.game)
    }
  })

  console.log(code)
}

const partTwo = () => {
  let powerOfGames = 0

  games.forEach(game => {
    const minAmount = {}

    game.subsets.forEach(set => {
      if (!minAmount.red || set.red > minAmount.red) minAmount.red = set.red
      if (!minAmount.green || set.green > minAmount.green) minAmount.green = set.green
      if (!minAmount.blue || set.blue > minAmount.blue) minAmount.blue = set.blue
    })

    const power = minAmount.red * minAmount.green * minAmount.blue
    powerOfGames += power
  })

  console.log(powerOfGames)
}

partOne()
partTwo()
