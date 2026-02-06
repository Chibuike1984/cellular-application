import { ASSET_CONFIG } from '@repo/assets/config'
import type { IconProps } from '@repo/assets/type'

function LockIcon (opt: IconProps = {}) {
  const { fill = 'black', className } = {
    ...ASSET_CONFIG,
    ...opt
  }

  return (
    <svg
      width='27'
      height='37'
      viewBox='0 0 27 37'
      className={className}
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <title>Lock icon</title>

      <path
        d='M1.5 13.4C1.5 7.79 1.5 4.985 3.2425 3.2425C4.985 1.5 7.79 1.5 13.4 1.5C19.01 1.5 21.815 1.5 23.5575 3.2425C25.3 4.985 25.3 7.79 25.3 13.4V23.6C25.3 29.21 25.3 32.015 23.5575 33.7575C21.815 35.5 19.01 35.5 13.4 35.5C7.79 35.5 4.985 35.5 3.2425 33.7575C1.5 32.015 1.5 29.21 1.5 23.6V13.4Z'
        stroke={fill}
        strokeWidth='3'
        strokeLinecap='round'
      />

      <path
        d='M20.1996 20.1999V15.9499C20.1996 14.1464 19.4832 12.4168 18.2079 11.1416C16.9327 9.86633 15.2031 9.1499 13.3996 9.1499C11.5961 9.1499 9.86653 9.86633 8.59128 11.1416C7.31604 12.4168 6.59961 14.1464 6.59961 15.9499V20.1999'
        stroke={fill}
        strokeWidth='3'
        strokeLinecap='round'
        strokeLinejoin='round'
      />

      <path
        d='M15.9496 16.7999V15.9499C15.9496 15.2736 15.6809 14.625 15.2027 14.1468C14.7245 13.6686 14.0759 13.3999 13.3996 13.3999C12.7233 13.3999 12.0747 13.6686 11.5965 14.1468C11.1183 14.625 10.8496 15.2736 10.8496 15.9499V21.8999M15.9496 21.0499V23.5999'
        stroke={fill}
        strokeWidth='3'
        strokeLinecap='round'
        strokeLinejoin='round'
      />

      <path
        d='M13.4004 30.3999V30.4169'
        stroke={fill}
        strokeWidth='3'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  )
}

export { LockIcon }
