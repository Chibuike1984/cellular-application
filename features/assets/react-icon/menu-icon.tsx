import { ASSET_CONFIG } from "../config";
import type { IconProps } from "../type";

function MenuIcon(opt: IconProps) {
  const { className, stroke, height, width } = {
    ...ASSET_CONFIG,
    ...opt,
  };
  return (
    <svg
      className={className}
      width={width}
      height={height}
      viewBox="0 0 16 19"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>Menu icon</title>
      <path
        d="M15 14.7499V7.74988C15 6.09963 15 5.2745 14.4872 4.76263C13.9745 4.24988 13.1503 4.24988 11.5 4.24988H1V14.7499C1 16.3993 1 17.2244 1.51275 17.7371C2.0255 18.2499 2.84975 18.2499 4.5 18.2499H11.5C13.1503 18.2499 13.9745 18.2499 14.4872 17.7371C15 17.2244 15 16.3993 15 14.7499Z"
        stroke={stroke}
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8 8.62497C8.69619 8.62497 9.36387 8.90153 9.85616 9.39382C10.3484 9.8861 10.625 10.5538 10.625 11.25M8 8.62497C7.30381 8.62497 6.63613 8.90153 6.14384 9.39382C5.65156 9.8861 5.375 10.5538 5.375 11.25M8 8.62497V7.74997M10.625 11.25H5.375M10.625 11.25H11.5M5.375 11.25H4.5M4.5 14.75H11.5M1 4.24997L7.46188 1.54272C8.90475 0.938097 9.62575 0.635347 10.2006 0.790222C10.5734 0.890384 10.9025 1.11095 11.1369 1.4176C11.5 1.89185 11.5 2.6776 11.5 4.24997"
        stroke={stroke}
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export { MenuIcon };
