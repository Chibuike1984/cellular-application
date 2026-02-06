import type { JSX } from 'react'
import { ASSET_CONFIG } from "../config";
import type { IconProps } from "../type";

function ExportIcon (opt: IconProps): JSX.Element {
  const { className, fill, height, width } = {
    ...ASSET_CONFIG,
    ...opt
  }
  return (
    <svg
      width={width}
      height={height}
      viewBox='0 0 21 21'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      className={className}
      aria-label='Export icon'
    >
      <title>Export</title>
      <path
        d='M19.666 10.5L16.3327 7.16671V9.66671H8.83268V11.3334H16.3327V13.8334M1.33268 15.5V5.50004C1.33268 5.05801 1.50827 4.63409 1.82083 4.32153C2.1334 4.00897 2.55732 3.83337 2.99935 3.83337L12.9993 3.83337C13.4414 3.83337 13.8653 4.00897 14.1779 4.32153C14.4904 4.63409 14.666 5.05801 14.666 5.50004V8.00004H12.9993V5.50004L2.99935 5.50004V15.5L12.9993 15.5V13H14.666V15.5C14.666 15.9421 14.4904 16.366 14.1779 16.6786C13.8653 16.9911 13.4414 17.1667 12.9993 17.1667H2.99935C2.55732 17.1667 2.1334 16.9911 1.82083 16.6786C1.50827 16.366 1.33268 15.9421 1.33268 15.5Z'
        fill={fill}
      />
    </svg>
  )
}

export { ExportIcon }
