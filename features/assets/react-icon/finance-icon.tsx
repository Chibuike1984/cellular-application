import { ASSET_CONFIG } from "../config";
import type { IconProps } from "../type";
import type { JSX } from 'react'

function CameraIcon(opt: IconProps): JSX.Element {
    const { className, fill, height, width } = {
        ...ASSET_CONFIG,
        ...opt
    }

    return (
        <svg
            width={width}
            height={height}
            viewBox='0 0 16 11'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
            className={className}
            aria-label='Camera icon'
        >
            <title>Camera</title>

            <path
                d='M0.599609 2.0001C0.599609 1.62879 0.747109 1.2727 1.00966 1.01015C1.27221 0.747597 1.62831 0.600098 1.99961 0.600098H13.1996C13.5709 0.600098 13.927 0.747597 14.1896 1.01015C14.4521 1.2727 14.5996 1.62879 14.5996 2.0001V9.0001C14.5996 9.3714 14.4521 9.7275 14.1896 9.99005C13.927 10.2526 13.5709 10.4001 13.1996 10.4001H1.99961C1.62831 10.4001 1.27221 10.2526 1.00966 9.99005C0.747109 9.7275 0.599609 9.3714 0.599609 9.0001V2.0001Z'
                stroke={fill ?? '#3E3E3E'}
                strokeWidth={1.2}
                strokeLinecap='round'
                strokeLinejoin='round'
            />

            <path
                d='M7.59902 7.60015C8.75882 7.60015 9.69902 6.65994 9.69902 5.50015C9.69902 4.34035 8.75882 3.40015 7.59902 3.40015C6.43923 3.40015 5.49902 4.34035 5.49902 5.50015C5.49902 6.65994 6.43923 7.60015 7.59902 7.60015Z'
                stroke={fill ?? '#3E3E3E'}
                strokeWidth={1.2}
                strokeLinecap='round'
                strokeLinejoin='round'
            />

            <path
                d='M0.599609 3.4001C1.34222 3.4001 2.05441 3.1051 2.57951 2.58C3.10461 2.05489 3.39961 1.3427 3.39961 0.600098M11.7996 10.4001C11.7996 9.65749 12.0946 8.9453 12.6197 8.4202C13.1448 7.8951 13.857 7.6001 14.5996 7.6001'
                stroke={fill ?? '#3E3E3E'}
                strokeWidth={1.2}
                strokeLinecap='round'
                strokeLinejoin='round'
            />
        </svg>
    )
}

export { CameraIcon }
