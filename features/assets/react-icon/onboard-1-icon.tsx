import { ASSET_CONFIG } from '@repo/assets/config'
import type { IconProps } from '@repo/assets/type'
import type { JSX } from 'react'

function ShieldLockIcon (opt: IconProps): JSX.Element {
  const { className, fill, height, width } = {
    ...ASSET_CONFIG,
    ...opt
  }

  return (
    <svg
      width={width}
      height={height}
      viewBox='0 0 32 36'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      className={className}
      aria-label='Shield Lock Icon'
    >
      <title>Shield Lock Icon</title>

      <path
        d='M25.9362 3.96675C22.9931 2.4141 19.3889 1.5 15.5 1.5C11.6111 1.5 8.00844 2.4141 5.06378 3.96675C3.62022 4.72905 2.89844 5.1102 2.2 6.3081C1.50156 7.506 1.5 8.6643 1.5 10.9842V16.7427C1.5 26.1196 8.56533 31.332 12.658 33.5661C13.7998 34.1881 14.3691 34.5 15.5 34.5C16.6309 34.5 17.2002 34.1881 18.342 33.5661C22.4331 31.332 29.5 26.118 29.5 16.7411V10.9842C29.5 8.6643 29.5 7.506 28.8 6.3081C28.1 5.1102 27.3798 4.72905 25.9362 3.96675Z'
        stroke={fill}
        strokeWidth='3'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M12.389 14.6998V12.2248C12.389 11.3496 12.7168 10.5102 13.3002 9.89135C13.8837 9.27248 14.675 8.9248 15.5001 8.9248C16.3252 8.9248 17.1165 9.27248 17.7 9.89135C18.2834 10.5102 18.6112 11.3496 18.6112 12.2248V14.6998M12.389 14.6998H18.6112M12.389 14.6998C11.7702 14.6998 11.1767 14.9606 10.7391 15.4247C10.3015 15.8889 10.0557 16.5184 10.0557 17.1748V19.6498C10.0557 20.3062 10.3015 20.9357 10.7391 21.3999C11.1767 21.864 11.7702 22.1248 12.389 22.1248H18.6112C19.2301 22.1248 19.8236 21.864 20.2611 21.3999C20.6987 20.9357 20.9446 20.3062 20.9446 19.6498V17.1748C20.9446 16.5184 20.6987 15.8889 20.2611 15.4247C19.8236 14.9606 19.2301 14.6998 18.6112 14.6998'
        stroke={fill}
        strokeWidth='3'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  )
}

export { ShieldLockIcon }
