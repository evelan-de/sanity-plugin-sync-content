import {generateSanityId} from 'src/utils'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const deepSearchReplace = (target: any) => {
  try {
    if (typeof target === 'object') {
      for (const key in target) {
        if (typeof target[key] === 'object') {
          deepSearchReplace(target[key])
        } else if (key === '_key') {
          target[key] = generateSanityId()
        }
      }
    } else {
      console.error('undefined type: ', typeof target)
    }
  } catch (error) {
    console.error(error)
  }
  return target
}
export default deepSearchReplace
