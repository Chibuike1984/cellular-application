import { ASSET_CONFIG } from "../config";
import type { IconProps } from "../type";

function VerveIcon(opt: IconProps = {}) {
  const { className, fill, height, width } = {
    ...ASSET_CONFIG,
    ...opt,
  };

  return (
    <svg
      className={className}
      width={width}
      height={height}
      viewBox="0 0 46 46"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>Verve icon</title>
      <rect width="46" height="46" rx="4" fill="#00425F" />
      <rect x="4" y="4" width="38" height="38" rx="2" fill="#FFFFFF" />
      <rect x="8" y="8" width="30" height="30" rx="2" fill="#00425F" />
      <path
        d="M14 18L18 26L22 18M24 26V18M26 18V26M30 18V26"
        stroke="#FFFFFF"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="32" cy="22" r="2" fill="#FF6B35" />
    </svg>
  );
}

export { VerveIcon };
