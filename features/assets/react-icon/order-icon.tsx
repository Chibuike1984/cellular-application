import { ASSET_CONFIG } from "../config";
import type { IconProps } from "../type";

function OrderIcon(opt: IconProps) {
  const { className, fill, height, width } = {
    ...ASSET_CONFIG,
    ...opt,
  };
  return (
    <svg
      className={className}
      width={width}
      height={height}
      viewBox="0 0 17 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>Order icon</title>

      <path
        d="M2.875 13.375H7.875M2.875 10.25H10.375M2.875 7.125H10.375M3.5 2.125H1V17.125H12.25V2.125H9.75M3.5 0.875H9.75L8.96875 3.375H4.28125L3.5 0.875Z"
        stroke={fill}
        strokeLinejoin="round"
      />
    </svg>
  );
}

export { OrderIcon };
