import { ASSET_CONFIG } from '@repo/assets/config'
import type { IconProps } from '@repo/assets/type'
import type { JSX } from 'react'

function MonitorIcon (opt: IconProps): JSX.Element {
  const { className, fill, height, width } = {
    ...ASSET_CONFIG,
    ...opt
  }

  return (
    <svg
      width={width}
      height={height}
      viewBox='0 0 40 40'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      className={className}
      aria-label='Monitor Icon'
    >
      <title>Monitor Icon</title>

      <path opacity='0.3' d='M8.33301 10H31.6663V30H8.33301V10Z' fill={fill} />
      <path
        d='M35.0003 6.66699H5.00033C3.16699 6.66699 1.66699 8.16699 1.66699 10.0003V30.0003C1.66699 31.8337 3.16699 33.3337 5.00033 33.3337H35.0003C36.8337 33.3337 38.317 31.8337 38.317 30.0003L38.3337 10.0003C38.3337 8.16699 36.8337 6.66699 35.0003 6.66699ZM31.667 30.0003H8.33366V10.0003H31.667V30.0003Z'
        fill={fill}
      />
    </svg>
  )
}

export { MonitorIcon }
