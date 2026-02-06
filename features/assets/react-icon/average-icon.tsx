import { ASSET_CONFIG } from "../config";
import type { IconProps } from "../type";

function AverageIcon(opt: IconProps = {}) {
  const { className, fill, height, width } = {
    ...ASSET_CONFIG,
    ...opt,
  };

  return (
    <svg
      className={className}
      width={width}
      height={height}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>Average icon</title>
      <path
        d="M0 5H4V16H0V5ZM12 9H16V16H12V9ZM6 0H10V16H6V0Z"
        fill={fill}
      />
    </svg>
  );
}

export { AverageIcon };
