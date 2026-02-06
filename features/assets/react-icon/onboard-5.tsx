import { ASSET_CONFIG } from "../config";
import type { IconProps } from "../type";

function MonitorIcon (opt: IconProps = {}) {
  const { fill = 'black', className } = {
    ...ASSET_CONFIG,
    ...opt
  }

  return (
    <svg
      width='30'
      height='29'
      viewBox='0 0 30 29'
      className={className}
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <title>Monitor icon</title>

      <path
        d='M27 0H3C1.3455 0 0 1.3455 0 3V19.5C0 21.1545 1.3455 22.5 3 22.5H13.5V25.5H9V28.5H21V25.5H16.5V22.5H27C28.6545 22.5 30 21.1545 30 19.5V3C30 1.3455 28.6545 0 27 0ZM3 16.5V3H27L27.003 16.5H3Z'
        fill={fill}
      />
    </svg>
  )
}

export { MonitorIcon }
