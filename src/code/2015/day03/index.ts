import fs from 'fs'
import path from 'path'

interface Position {
  x: number
  y: number
}

function first(input: string): number {
  let count: number = 1
  let position: Position = {x: 0, y: 0}
  const visitedPositions: Position[] = []
  visitedPositions.push(position)

  input.split('').forEach((direction) => {
    if (direction === '^') {
      position = {x: position.x, y: position.y + 1}
    } else if (direction === 'v') {
      position = {x: position.x, y: position.y - 1}
    } else if (direction === '>') {
      position = {x: position.x + 1, y: position.y}
    } else if (direction === '<') {
      position = {x: position.x - 1, y: position.y}
    }
    const p = visitedPositions.find((value) => {
      return value.x === position.x && value.y === position.y
    })
    if (p === undefined) {
      count = count + 1
      visitedPositions.push(position)
    }
  })
  
  return count
}

function second(input: string): number {
  let count: number = 1
  let santaPosition: Position = {x: 0, y: 0}
  let robosantaPosition: Position = {x: 0, y: 0}
  const visitedPositions: Position[] = []
  visitedPositions.push(santaPosition)

  input.split('').forEach((direction, index) => {
    let position = (index%2 === 0) ? santaPosition : robosantaPosition
    if (direction === '^') {
      position = {x: position.x, y: position.y + 1}
    } else if (direction === 'v') {
      position = {x: position.x, y: position.y - 1}
    } else if (direction === '>') {
      position = {x: position.x + 1, y: position.y}
    } else if (direction === '<') {
      position = {x: position.x - 1, y: position.y}
    }
    const p = visitedPositions.find((value) => {
      return value.x === position.x && value.y === position.y
    })
    if (p === undefined) {
      count = count + 1
      visitedPositions.push(position)
    }
    if (index%2 === 0) {
      santaPosition = position
    } else {
      robosantaPosition = position
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
  console.log('second output', output)
}

export default function() {
  console.log('2015 day 03')
  firstWrapper()
  secondWrapper()
}
