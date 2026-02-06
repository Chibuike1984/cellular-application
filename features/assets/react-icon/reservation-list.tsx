import type { JSX } from "react";
import { ASSET_CONFIG } from "../config";
import type { IconProps } from "../type";

function ReservationListIcon(opt: IconProps): JSX.Element {
  const { className, stroke, height, width } = {
    ...ASSET_CONFIG,
    ...opt,
  };

  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 15 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Reservation list icon"
    >
      <title>Reservation List</title>
      <path
        d="M4 1H2.25C1.78587 1 1.34075 1.21071 1.01256 1.58579C0.684374 1.96086 0.5 2.46957 0.5 3V17C0.5 17.5304 0.684374 18.0391 1.01256 18.4142C1.34075 18.7893 1.78587 19 2.25 19H12.75C13.2141 19 13.6592 18.7893 13.9874 18.4142C14.3156 18.0391 14.5 17.5304 14.5 17V3C14.5 2.46957 14.3156 1.96086 13.9874 1.58579C13.6592 1.21071 13.2141 1 12.75 1H9.25M4 1V10L6.625 7L9.25 10V1M4 1H9.25"
        stroke={stroke}
        strokeWidth="1"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export { ReservationListIcon };
