import { ASSET_CONFIG } from "../config";
import type { IconProps } from "../type";
import type { JSX } from 'react'

function OnlineKitchenIcon (opt: IconProps): JSX.Element {
  const { className, fill, height, width } = {
    ...ASSET_CONFIG,
    ...opt
  }

  return (
    <svg
      width={width}
      height={height}
      viewBox='0 0 90 90'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      className={className}
      aria-label='Online kitchen icon'
    >
      <title>Online Kitchen</title>
      <path
        d='M15 56.25H75M15 56.25V78.75C15 79.7446 15.3951 80.6984 16.0984 81.4017C16.8016 82.1049 17.7554 82.5 18.75 82.5H71.25C72.2446 82.5 73.1984 82.1049 73.9017 81.4017C74.6049 80.6984 75 79.7446 75 78.75V56.25M15 56.25V11.25C15 10.2554 15.3951 9.30161 16.0984 8.59835C16.8016 7.89509 17.7554 7.5 18.75 7.5H71.25C72.2446 7.5 73.1984 7.89509 73.9017 8.59835C74.6049 9.30161 75 10.2554 75 11.25V56.25'
        stroke={fill}
        strokeWidth='6'
        strokeLinejoin='round'
      />
      <path
        d='M41.25 69.375H48.75'
        stroke={fill}
        strokeWidth='6'
        strokeLinecap='round'
      />
    </svg>
  )
}

export { OnlineKitchenIcon }
