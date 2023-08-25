import * as fs from 'fs'
import path from 'path'

function first(input: string): number {
  let floor: number = 0
  for (let i: number = 0; i < input.length; i++) {
    const ch: string | undefined = input[i]
    if (ch === undefined) {
      continue
    }
    if (ch === '(') {
      floor = floor + 1
    } else if (ch === ')') {
      floor = floor - 1
    }
  }
  return floor
}

function second(input: string): number {
  let floor: number = 0
  for (let i: number = 0; i < input.length; i++) {
    const ch: string | undefined = input[i]
    if (ch === undefined) {
      continue
    }
    if (ch === '(') {
      floor = floor + 1
    } else if (ch === ')') {
      floor = floor - 1
    }
    if (floor === -1) {
      return i + 1
    }
  }
  return -1
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
  console.log('second output', output)
}

export default function() {
  firstWrapper()
  secondWrapper()
}
