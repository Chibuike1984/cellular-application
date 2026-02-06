import { ASSET_CONFIG } from "../config";
import type { IconProps } from "../type";

function ConfigurationIcon(opt: IconProps = {}) {
  const { className, fill, height, width } = {
    ...ASSET_CONFIG,
    ...opt,
  };

  return (
    <svg
      className={className}
      width={width}
      height={height}
      viewBox="0 0 12 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>Configuration icon</title>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M5.24997 0L5.24983 7.50015H4.49988V9.00012H5.24983L5.25001 12H6.74992L6.74978 9.00012H7.49974V7.50015H6.74978L6.74992 0H5.24997ZM0.749956 0V3.00076H0V4.49999H0.749956V12H2.2499V4.49999H2.99986V3.00076H2.2499V0H0.749956ZM9.7489 0.000140547V4.50013H8.99895L8.9994 6H9.74936V12H11.25V6H12L11.9995 4.50013H11.2496L11.25 0L9.7489 0.000140547Z"
        fill={fill}
      />
    </svg>
  );
}

export { ConfigurationIcon };
