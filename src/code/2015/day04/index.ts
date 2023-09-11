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
  console.log('first', fn('ckczppom', '00000'))
  console.log('second', fn('ckczppom', '000000'))
}
