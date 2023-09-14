import path from 'path'
import fs from 'fs'

function first(input: string): number {
  // helpers
  function isNaughtySubstring(previousCharacter: string, ch: string) {
    return (
      previousCharacter === 'a' && ch === 'b'
      || previousCharacter === 'c' && ch === 'd'
      || previousCharacter === 'p' && ch === 'q'
      || previousCharacter === 'x' && ch === 'y'
    )
  }

  let count: number = 0

  input.split('\n').forEach((word) => {
    let vowelsCount = 0
    let previousCharacter: string | undefined = undefined
    let twiceInARow: boolean = false
    let gotNaughtySubstring = false
    for (let i = 0; i < word.length; i++) {
      const ch = word[i]
      if (ch === undefined) {
        continue
      }
      if ('aeiou'.includes(ch)) {
        vowelsCount = vowelsCount + 1
      }
      if (previousCharacter !== undefined) {
        if (ch === previousCharacter) {
          twiceInARow = true
        }
        if (isNaughtySubstring(previousCharacter, ch)) {
          gotNaughtySubstring = true
          break
        }
      }
      previousCharacter = ch
    }
    if ((vowelsCount >= 3) && twiceInARow && !gotNaughtySubstring) {
      count = count + 1
    }
  })
  return count
}

function second(input: string): number {
  let count: number = 0

  input.split('\n').forEach((word) => {
    let foundPair = false
    let foundRepeatedLetter = false
    for (let i = 0; i < word.length; i++) {
      const substring: string = word.substring(i, i+2)
      if (!foundPair && word.includes(substring, i+2)) {
        foundPair = true
      }
      if (i-1 >= 0 && i+1 < word.length && !foundRepeatedLetter) {
        if (word[i-1] === word[i+1]) {
          foundRepeatedLetter = true
        }
      }
    }
    if (foundPair && foundRepeatedLetter) {
      count = count + 1
    }
  })

  return count
}

function firstWrapper() {
  const filePath: string = path.join(__dirname, 'input.txt')
  const input: string = fs.readFileSync(filePath, 'utf-8')
  const output: number = first(input)
  console.log('first output', output)
}

function secondWrapper() {
  const filePath: string = path.join(__dirname, 'input.txt')
  const input: string = fs.readFileSync(filePath, 'utf-8')
  const output: number = second(input)
  console.log('first output', output)
}

export default function() {
  firstWrapper()
  secondWrapper()
}
