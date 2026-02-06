import { ASSET_CONFIG } from "../config";
import type { IconProps } from "../type";

function EmailIcon(opt: IconProps = {}) {
  const { className, fill, height, width } = {
    ...ASSET_CONFIG,
    ...opt,
  };

  return (
    <svg
      className={className}
      width={width}
      height={height}
      viewBox="0 0 62 62"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>Email icon</title>
      <path
        d="M46.5003 19.3747H56.8337V52.958H5.16699V19.3747H15.5003M31.0003 24.5413V6.45801M31.0003 6.45801L38.7503 14.208M31.0003 6.45801L23.2503 14.208"
        stroke={fill}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M5.16699 19.375L31.0003 38.75L56.8337 19.375"
        stroke={fill}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export { EmailIcon };
