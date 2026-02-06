import { ASSET_CONFIG } from "../config";
import type { IconProps } from "../type";

function MastercardIcon(opt: IconProps = {}) {
  const { className, height, width } = {
    ...ASSET_CONFIG,
    ...opt,
  };

  return (
    <svg
      className={className}
      width={width}
      height={height}
      viewBox="0 0 23 13"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>Mastercard icon</title>
      <rect width="23" height="13" rx="2" fill="#F5F5F5" stroke="#E5E5E5" />
      <circle cx="8.5" cy="6.5" r="3.5" fill="#FF5F00" />
      <circle cx="14.5" cy="6.5" r="3.5" fill="#EB001B" />
      <path
        d="M11.5 3.5C12.328 4.162 12.9 5.18 12.9 6.5C12.9 7.82 12.328 8.838 11.5 9.5C10.672 8.838 10.1 7.82 10.1 6.5C10.1 5.18 10.672 4.162 11.5 3.5Z"
        fill="#FF5F00"
      />
    </svg>
  );
}

export { MastercardIcon };
