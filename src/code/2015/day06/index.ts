import fs from 'fs'
import path from 'path'

function first(input: string): number {
  function setOrToggle(
    lights: boolean[][],
    from: { x: number, y: number },
    to: { x: number, y: number },
    onOrOff: boolean | undefined,
    toggle: boolean,
  ) {
    if (from.x > to.x || from.y > to.y) {
      return
    }
    for (let i = from.x; i <= to.x; i++) {
      for (let j = from.y; j <= to.y; j++) {
        const lightRow = lights[i]
        if (lightRow !== undefined) {
          if (toggle) {
            lightRow[j] = !lightRow[j]
          } else if (onOrOff !== undefined) {
            lightRow[j] = onOrOff
          }
        }
      }
    }
  }

  const lights: boolean[][] = []
  const rows: number = 1000
  const cols: number = 1000
  for (let i = 0; i < rows; i++) {
    const row: boolean[] = Array<boolean>(cols).fill(false)
    lights.push(row)
  }

  input.split('\n').forEach((line) => {
    const parts = line.split(' ')
    let p = 0
    const operation = parts[p++]
    if (operation === undefined) {
      return
    }

    let isToggle: boolean = false
    let onOrOff: boolean | undefined = undefined

    if (operation === 'turn') {
      const lightState = parts[p++]
      if (lightState === undefined) {
        return
      }
      if (lightState === 'on') {
        onOrOff = true
      } else if (lightState === 'off') {
        onOrOff = false
      }
    } else if (operation === 'toggle') {
      isToggle = true
    }

    const fromStr = parts[p++]
    p = p + 1
    const toStr = parts[p++]
    if (fromStr === undefined || toStr === undefined) {
      return
    }

    const from = parseCoordinates(fromStr)
    const to = parseCoordinates(toStr)

    if (from === undefined || to === undefined) {
      return
    }

    setOrToggle(lights, from, to, onOrOff, isToggle)
  })

  let count: number = 0
  lights.forEach((lightRow) => {
    lightRow.forEach((light) => {
      if (light) {
        count = count + 1
      }
    })
  })
  return count
}

function second(input: string): number {
  function changeBrightness(
    lights: number[][],
    from: { x: number, y: number },
    to: { x: number, y: number },
    change: number,
  ) {
    if (from.x > to.x || from.y > to.y) {
      return
    }
    for (let i = from.x; i <= to.x; i++) {
      for (let j = from.y; j <= to.y; j++) {
        const lightRow = lights[i]
        if (lightRow !== undefined) {
          let n = lightRow[j]
          if (n !== undefined) {
            n = n + change
            if (n < 0) {
              n = 0
            }
            lightRow[j] = n
          }
        }
      }
    }
  }

  const lights: number[][] = []
  const rows = 1000
  const cols = 1000
  for (let i = 0; i < rows; i++) {
    const row = Array<number>(cols).fill(0)
    lights.push(row)
  }

  input.split('\n').forEach((line) => {
    const parts = line.split(' ')
    let p = 0

    let changeValue = 0

    const operation = parts[p++]

    if (operation === 'turn') {
      const lightState = parts[p++]
      if (lightState === 'on') {
        changeValue = 1
      } else if (lightState === 'off') {
        changeValue = -1
      }
    } else if (operation === 'toggle') {
      changeValue = 2
    }

    const fromStr = parts[p++]
    p = p + 1
    const toStr = parts[p++]

    if (fromStr === undefined || toStr === undefined) {
      return
    }

    const from = parseCoordinates(fromStr)
    p = p + 1
    const to = parseCoordinates(toStr)

    if (from === undefined || to === undefined) {
      return
    }

    changeBrightness(lights, from, to, changeValue)
  })

  let count: number = 0
  lights.forEach((lightRow) => {
    lightRow.forEach((light) => {
      if (light) {
        count = count + light
      }
    })
  })
  return count
}

function parseCoordinates(str: string): { x: number, y: number } | undefined {
  const parts = str.split(',')
  if (
    parts.length !== 2 || parts[0] === undefined || parts[1] === undefined
  ) {
    return undefined
  }
  return {
    x: parseInt(parts[0]),
    y: parseInt(parts[1]),
  }
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
  console.log('2015 day 06')
  firstWrapper()
  secondWrapper()
}
