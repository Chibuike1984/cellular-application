import { ASSET_CONFIG } from "../config";
import type { IconProps } from "../type";
import type { JSX } from 'react'

function CopyIcon(opt: IconProps): JSX.Element {
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
            aria-label='Copy icon'
        >
            <title>Copy Icon</title>
            <path
                d='M6.26087 11.1001H1.56522V0.600098H10.9565V2.1001M9.3913 10.1001H10.4348M0 11.6001H6.26087M7.82609 3.6001H12V11.6001H7.82609V3.6001Z'
                stroke={fill}
                strokeWidth='1.2'
                strokeLinejoin='round'
            />
        </svg>
    )
}

export { CopyIcon }
