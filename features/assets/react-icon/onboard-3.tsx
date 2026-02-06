import { ASSET_CONFIG } from '@repo/assets/config'
import type { IconProps } from '@repo/assets/type'
import type { JSX } from 'react'

function PhoneIcon (opt: IconProps): JSX.Element {
  const { className, fill, height, width } = {
    ...ASSET_CONFIG,
    ...opt
  }

  return (
    <svg
      width={width}
      height={height}
      viewBox='0 0 22 37'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      className={className}
      aria-label='Phone Icon'
    >
      <title>Phone Icon</title>

      <path
        d='M18.3333 0H3.66667C2.69421 0 1.76157 0.38982 1.07394 1.0837C0.386308 1.77759 0 2.7187 0 3.7V33.3C0 34.2813 0.386308 35.2224 1.07394 35.9163C1.76157 36.6102 2.69421 37 3.66667 37H18.3333C19.3058 37 20.2384 36.6102 20.9261 35.9163C21.6137 35.2224 22 34.2813 22 33.3V3.7C22 2.7187 21.6137 1.77759 20.9261 1.0837C20.2384 0.38982 19.3058 0 18.3333 0ZM12.8333 35.15H9.16667V33.3H12.8333V35.15ZM18.3333 31.45H3.66667V5.55H18.3333V31.45Z'
        fill={fill}
      />
    </svg>
  )
}

export { PhoneIcon }
