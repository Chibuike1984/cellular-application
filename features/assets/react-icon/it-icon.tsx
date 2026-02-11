import { ASSET_CONFIG } from "../config";
import type { IconProps } from "../type";
import type { JSX } from 'react'

function MobileTableIcon(opt: IconProps): JSX.Element {
    const { className, fill, height, width } = {
        ...ASSET_CONFIG,
        ...opt
    }

    return (
        <svg
            width={width}
            height={height}
            viewBox='0 0 13 13'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
            className={className}
            aria-label='Mobile table icon'
        >
            <title>Mobile Table Icon</title>
            <path
                d='M9.83333 0.5H3.16667C2.79848 0.5 2.5 0.798477 2.5 1.16667V11.8333C2.5 12.2015 2.79848 12.5 3.16667 12.5H9.83333C10.2015 12.5 10.5 12.2015 10.5 11.8333V1.16667C10.5 0.798477 10.2015 0.5 9.83333 0.5Z'
                stroke={fill}
            />
            <path
                d='M2.5 2.5H0.5M2.5 5.16667H0.5M2.5 7.83333H0.5M2.5 10.5H0.5M12.5 2.5H10.5M12.5 5.16667H10.5M12.5 7.83333H10.5M12.5 10.5H10.5'
                stroke={fill}
                strokeLinecap='round'
                strokeLinejoin='round'
            />
        </svg>
    )
}

export { MobileTableIcon }
