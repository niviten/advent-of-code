import md5 from 'md5'

function fn(input: string, startWithString: string): number {
  let n: number = 0
  let found: boolean = false

  while (!found) {
    n = n + 1
    const md5hash: string = md5(`${input}${n}`)
    if (md5hash.startsWith(startWithString)) {
      found = true
    }
  }

  return n
}

export default function() {
  console.log('2015 day 04')
  console.log('first', fn('yzbqklnj', '00000'))
  console.log('second', fn('yzbqklnj', '000000'))
}
