import fs from 'fs'
import path from 'path'

function first(input: string): number {
  let totalArea: number = 0
  const lines: string[] = input.split('\n')
  lines.forEach((line) => {
    const parts: string[] = line.split('x')
    if (parts.length === 3) {
      const l = parseInt(parts[0] === undefined ? '0' : parts[0])
      const w = parseInt(parts[1] === undefined ? '0' : parts[1])
      const h = parseInt(parts[2] === undefined ? '0' : parts[2])
      totalArea = totalArea
        + calcArea(l, w, h)
        + areaOfSmallesSide(l, w, h)
    }
  })
  return totalArea
}

function second(input: string): number {
  let ribbonLength: number = 0
  const lines: string[] = input.split('\n')
  lines.forEach((line) => {
    const parts: string[] = line.split('x')
    if (parts.length === 3) {
      const l = parseInt(parts[0] === undefined ? '0' : parts[0])
      const w = parseInt(parts[1] === undefined ? '0' : parts[1])
      const h = parseInt(parts[2] === undefined ? '0' : parts[2])
      ribbonLength = ribbonLength
        + calcSmallesPerimeter(l, w, h)
        + calcVolume(l, w, h)
    }
  })
  return ribbonLength
}

function calcArea(l: number, w: number, h: number): number {
  return (2 * l * w) + (2 * l * h) + (2 * w * h)
}

function areaOfSmallesSide(l: number, w: number, h: number): number {
  const a: number = l * w
  const b: number = l * h
  const c: number = w * h
  if (a <= b && a <= c) {
    return a
  }
  if (b <= a && b <= c) {
    return b
  }
  if (c <= a && c <= b) {
    return c
  }
  return 0
}

function calcSmallesPerimeter(l: number, w: number, h: number): number {
  let a: number = 0
  let b: number = 0

  if (l <= w && l <= h) {
    a = l
    b = (w <= h) ? w : h
  } else if (w <= h) {
    a = w
    b = (l <= h) ? l : h
  } else {
    a = h
    b = (l <= w) ? l : w
  }
  return (2 * a) + (2 * b)
}

function calcVolume(l: number, w: number, h: number): number {
  return l * w * h
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
