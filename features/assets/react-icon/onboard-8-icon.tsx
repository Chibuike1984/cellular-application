import { ASSET_CONFIG } from '@repo/assets/config'
import type { IconProps } from '@repo/assets/type'
import type { JSX } from 'react'

function FormIcon (opt: IconProps): JSX.Element {
  const { className, fill, height, width } = {
    ...ASSET_CONFIG,
    ...opt
  }

  return (
    <svg
      width={width}
      height={height}
      viewBox='0 0 30 30'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      className={className}
      aria-label='Form Icon'
    >
      <title>Form Icon</title>

      <path
        d='M21.25 11.25H10V8.75H21.25V11.25ZM8.75 8.75H6.25V11.25H8.75V8.75ZM8.75 5H6.25V7.5H8.75V5ZM12.5 5H10V7.5H12.5V5ZM16.25 21.25V23.75H17.5C18.1875 23.75 18.75 24.3125 18.75 25H27.5V27.5H18.75C18.75 28.1875 18.1875 28.75 17.5 28.75H12.5C11.8125 28.75 11.25 28.1875 11.25 27.5H2.5V25H11.25C11.25 24.3125 11.8125 23.75 12.5 23.75H13.75V21.25H5C3.6125 21.25 2.5 20.1375 2.5 18.75V3.75C2.5 3.08696 2.76339 2.45107 3.23223 1.98223C3.70107 1.51339 4.33696 1.25 5 1.25H25C26.3875 1.25 27.5 2.3625 27.5 3.75V18.75C27.5 20.1375 26.3875 21.25 25 21.25H16.25ZM25 18.75V3.75H5V18.75H25ZM13.75 7.5H23.75V5H13.75V7.5ZM6.25 15H13.75V12.5H6.25V15ZM16.25 17.5H23.75V15H16.25V17.5Z'
        fill={fill}
      />
    </svg>
  )
}

export { FormIcon }
