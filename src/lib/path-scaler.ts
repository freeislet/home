// SVG path string scaler
// 참고: https://stackoverflow.com/a/75060752

export interface PathPoint {
  type: string
  values: number[]
}

export default class PathScaler {
  path: string
  width: number
  height: number
  pathData: PathPoint[]

  constructor(path: string, width: number, height: number) {
    this.path = path
    this.width = width
    this.height = height
    this.pathData = parsePath(path)
  }

  getScaledPath(newWidth: number, newHeight: number): string {
    const scaleX = newWidth / this.width
    const scaleY = newHeight / this.height
    const scaledPath = scalePathData(this.pathData, scaleX, scaleY)
    return stringifyPath(scaledPath, 6)
  }
}

export function scalePathData(pathData: PathPoint[], scaleX: number, scaleY: number): PathPoint[] {
  let pathDataScaled: PathPoint[] = []

  pathData.forEach((com) => {
    let [type, values] = [com.type, com.values]
    let typeLc = type.toLowerCase()

    switch (typeLc) {
      case 'a':
        pathDataScaled.push({
          type: type,
          values: [
            values[0] * scaleX,
            values[1] * scaleY,
            values[2],
            values[3],
            values[4],
            values[5] * scaleX,
            values[6] * scaleY,
          ],
        })
        break

      case 'h':
        pathDataScaled.push({
          type: type,
          values: [values[0] * scaleX],
        })
        break

      case 'v':
        pathDataScaled.push({
          type: type,
          values: [values[0] * scaleY],
        })
        break

      case 'z':
        pathDataScaled.push(com)
        break

      default:
        if (values.length) {
          let valsScaled = []
          for (let i = 0; i < values.length; i += 2) {
            let x = values[i] * scaleX
            let y = values[i + 1] * scaleY
            valsScaled.push(x, y)
          }
          pathDataScaled.push({
            type: type,
            values: valsScaled,
          })
        }
    }
  })

  return pathDataScaled
}

/**
 * create pathData from d attribute
 **/
export function parsePath(d: string): PathPoint[] {
  // sanitize d string
  let commands = d
    .replace(/[\n\r\t]/g, '')
    .replace(/,/g, ' ')
    .replace(/-/g, ' -')
    .replace(/(\.)(\d+)(\.)(\d+)/g, '$1$2 $3$4')
    .replace(/( )(0)(\d+)/g, '$1 $2 $3')
    .replace(/([a-z])/gi, '|$1 ')
    .replace(/\s{2,}/g, ' ')
    .trim()
    .split('|')
    .filter(Boolean)
    .map((val) => val.trim())

  // compile pathData
  let pathData: PathPoint[] = []

  for (let i = 0; i < commands.length; i++) {
    let com = commands[i].split(' ')
    let type = com.shift() || ''
    let typeLc = type.toLowerCase()
    let values = com.map((val) => parseFloat(val))

    // analyze repeated (shorthanded) commands
    let chunks = []
    let maxValues = 2 // maximum values for a specific command type
    switch (typeLc) {
      case 'v':
      case 'h':
        maxValues = 1
        break

      case 'm':
      case 'l':
      case 't':
        maxValues = 2
        break

      case 's':
      case 'q':
        maxValues = 4
        break

      case 'c':
        maxValues = 6
        break

      case 'a':
        maxValues = 7
        break

      default: // z (closepath)
        maxValues = 0
    }

    /**
     * first starting point should be absolute/uppercase -
     * unless it adds relative linetos
     * (facilitates d concatenating)
     */
    const pathType = type === 'm' && i === 0 ? 'M' : type

    // if string contains repeated shorthand commands - split them
    const arrayChunks = (array: any, chunkSize = 2) => {
      let chunks = []
      for (let i = 0; i < array.length; i += chunkSize) {
        let chunk = array.slice(i, i + chunkSize)
        chunks.push(chunk)
      }
      return chunks
    }

    chunks = arrayChunks(values, maxValues)
    // add 1st/regular command
    let chunk0 = chunks.length ? chunks[0] : []
    pathData.push({
      type: pathType,
      values: chunk0,
    })
    // add repeated commands
    if (chunks.length > 1) {
      for (let c = 1; c < chunks.length; c++) {
        pathData.push({
          type: type,
          values: chunks[c],
        })
      }
    }
  }

  return pathData
}

export function stringifyPath(pathData: PathPoint[], decimals = -1): string {
  let d = ''

  pathData.forEach((com, c) => {
    if (decimals >= 0) {
      com.values.forEach(function (val, v) {
        pathData[c]['values'][v] = +val.toFixed(decimals)
      })
    }
    d += `${com.type}${com.values.join(' ')}`
  })

  d = d.replaceAll(',', ' ').replaceAll(' -', '-')
  return d
}
