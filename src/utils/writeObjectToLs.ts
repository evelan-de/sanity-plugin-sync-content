import {ls} from 'src/utils'

export const writeObjectToLs = (parent: {_type: string}): void => {
  ls(`copyObject_${parent._type}`, JSON.stringify(parent))
}
