import type { JSX } from "react";
import { ASSET_CONFIG } from "../config";
import type { IconProps } from "../type";

function ReturnsIcon(opt: IconProps): JSX.Element {
    const { className, fill, height, width } = {
        ...ASSET_CONFIG,
        ...opt,
    };
    return (
        <svg
            width={width}
            height={height}
            viewBox="0 0 14 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
            aria-label="Returns icon"
        >
            <title>Returns Icon</title>
            <path
                d="M2.30538 10.7359L4.12099 8.66809L3.20901 7.77495L0 11.3875L3.20901 15L4.12099 14.1069L2.30538 12.0391H4.65081C5.58949 12.0391 6.52816 12.0652 7.466 12.0391C8.65749 12.0382 10.2712 11.8219 11.607 10.9296C12.9921 10.0043 14 8.40484 14 5.83924C14 3.68545 12.8928 1.58553 10.9545 0.687174C9.43596 -0.0191705 8.41469 -0.0078758 6.94451 0.00254995L6.47142 0.00428745V1.30751L6.93283 1.30577C8.4514 1.29969 9.18899 1.29361 10.4456 1.87658C11.9925 2.59509 12.7484 4.18502 12.7484 5.83924C12.7484 7.98694 11.9366 9.16158 10.9312 9.8323C9.88152 10.5334 8.54151 10.7359 7.45766 10.7359H7.44097C6.51064 10.7619 5.58114 10.7359 4.65081 10.7359H2.30538Z"
                fill={fill}
            />
        </svg>
    );
}

export { ReturnsIcon };