import { ASSET_CONFIG } from "../config";
import type { IconProps } from "../type";

function FinancialIcon(opt: IconProps) {
  const { className, stroke, height, width } = {
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
      <title>Financial icon</title>

      <path
        d="M2.29102 13.7308C4.02435 15.5896 6.4406 15.3125 7.87102 15.2688M2.29102 11.4058C3.8681 13.2058 5.95977 13.3483 7.94268 13.1225M7.73977 7.27251C1.42643 5.94834 0.647266 11.6617 7.73977 11.0033M8.91352 15.1258C10.5606 16.8342 16.1206 17.2175 17.7077 14.9467M8.91352 12.5146C10.1473 14.7854 15.8789 14.7546 17.7077 12.6938M8.91352 10.2792C11.4885 12.9788 16.2052 12.055 17.7077 10.2792"
        stroke={stroke}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8.91406 8.04333C10.5374 10.2792 15.8807 10.3442 17.7082 8.07917"
        stroke={stroke}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M13.3184 7.59499C15.5901 7.59499 17.4317 6.67177 17.4317 5.53291C17.4317 4.39405 15.5901 3.47083 13.3184 3.47083C11.0467 3.47083 9.20508 4.39405 9.20508 5.53291C9.20508 6.67177 11.0467 7.59499 13.3184 7.59499Z"
        stroke={stroke}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M7.74023 7.27246V11.0033"
        stroke={stroke}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export { FinancialIcon };
