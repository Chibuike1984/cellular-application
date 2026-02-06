import { ASSET_CONFIG } from "../config";
import type { IconProps } from "../type";

function OrderHistoryIcon(opt: IconProps = {}) {
  const { className, stroke, height, width } = {
    ...ASSET_CONFIG,
    ...opt,
  };

  return (
    <svg
      className={className}
      width={width}
      height={height}
      viewBox="0 0 19 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>Order History Icon</title>

      <path
        d="M5.20841 13.0912C6.38637 14.2692 7.93636 15.0022 9.59424 15.1654C11.2521 15.3286 12.9153 14.9119 14.3003 13.9862C15.6854 13.0606 16.7066 11.6832 17.1899 10.089C17.6732 8.49477 17.5888 6.78226 16.9509 5.24331C16.3131 3.70436 15.1614 2.43421 13.692 1.64931C12.2226 0.86441 10.5264 0.613332 8.89266 0.938864C7.25888 1.2644 5.78854 2.14639 4.7322 3.43455C3.67585 4.7227 3.09888 6.3373 3.09961 8.0032V9.6"
        stroke={stroke}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M1.5 8.00005L3.1 9.60005L4.7 8.00005M9.5 4.80005V8.80005H13.5"
        stroke={stroke}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export { OrderHistoryIcon };
