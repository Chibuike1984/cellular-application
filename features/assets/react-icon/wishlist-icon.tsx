import type { JSX } from "react";
import { ASSET_CONFIG } from "../config";
import type { IconProps } from "../type";

function WishlistIcon(opt: IconProps): JSX.Element {
  const { className, stroke, height, width } = {
    ...ASSET_CONFIG,
    ...opt,
  };
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 19 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Wishlist icon"
    >
      <title>Wishlist</title>
      <path
        d="M3.9 13C2.768 13 2.2024 13 1.852 13.2928C1.5 13.5856 1.5 14.0576 1.5 15C1.5 15.9424 1.5008 16.4144 1.852 16.7072C2.2032 17 2.768 17 3.9 17C5.032 17 5.5976 17 5.948 16.7072C6.3 16.4144 6.3 15.9424 6.3 15C6.3 14.0576 6.2992 13.5856 5.948 13.2928C5.5968 13 5.032 13 3.9 13ZM3.9 13C3.9 11.0144 4.4952 10.6 7.3464 10.6H11.6536C14.5048 10.6 15.1 11.0144 15.1 13M15.1 13C13.968 13 13.4024 13 13.052 13.2928C12.7 13.5856 12.7 14.0576 12.7 15C12.7 15.9424 12.7008 16.4144 13.052 16.7072C13.4032 17 13.968 17 15.1 17C16.232 17 16.7976 17 17.148 16.7072C17.5 16.4144 17.5 15.9424 17.5 15C17.5 14.0576 17.4992 13.5856 17.148 13.2928C16.7968 13 16.232 13 15.1 13ZM9.5 4.6L10.3 3.4M13.1 4.6C13.1 5.55478 12.7207 6.47045 12.0456 7.14558C11.3705 7.82072 10.4548 8.2 9.5 8.2C8.54522 8.2 7.62955 7.82072 6.95442 7.14558C6.27929 6.47045 5.9 5.55478 5.9 4.6C5.9 3.64522 6.27929 2.72955 6.95442 2.05442C7.62955 1.37928 8.54522 1 9.5 1C10.4548 1 11.3705 1.37928 12.0456 2.05442C12.7207 2.72955 13.1 3.64522 13.1 4.6Z"
        stroke={stroke}
        strokeWidth="1.3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export { WishlistIcon };
