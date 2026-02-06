import { ASSET_CONFIG } from "../config";
import type { IconProps } from "../type";

function PersonalIcon(opt: IconProps = {}) {
  const { className, fill, height, width } = {
    ...ASSET_CONFIG,
    ...opt,
  };

  return (
    <svg
      className={className}
      width={width}
      height={height}
      viewBox="0 0 13 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>Personal icon</title>
      <path
        d="M6.33981 0.660156C7.18053 0.660156 7.9868 0.994127 8.58128 1.5886C9.17575 2.18307 9.50972 2.98935 9.50972 3.83006C9.50972 4.67077 9.17575 5.47705 8.58128 6.07153C7.9868 6.666 7.18053 6.99997 6.33981 6.99997C5.4991 6.99997 4.69282 6.666 4.09835 6.07153C3.50388 5.47705 3.16991 4.67077 3.16991 3.83006C3.16991 2.98935 3.50388 2.18307 4.09835 1.5886C4.69282 0.994127 5.4991 0.660156 6.33981 0.660156ZM6.33981 8.58492C9.84256 8.58492 12.6796 10.0035 12.6796 11.7548V13.3398H0V11.7548C0 10.0035 2.83707 8.58492 6.33981 8.58492Z"
        fill={fill}
      />
    </svg>
  );
}

export { PersonalIcon };
