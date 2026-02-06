import { ASSET_CONFIG } from "../config";
import type { IconProps } from "../type";

function VoidIcon(opt: IconProps = {}) {
  const {
    fill = "#8C0D26",
    stroke = "#8C0D26",
    className,
  } = {
    ...ASSET_CONFIG,
    ...opt,
  };
  return (
    <svg
      width="70"
      height="70"
      viewBox="0 0 40 40"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>Void icon</title>

      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M38.75 20C38.75 30.3556 30.3556 38.75 20 38.75C9.64437 38.75 1.25 30.3556 1.25 20C1.25 9.64437 9.64437 1.25 20 1.25C30.3556 1.25 38.75 9.64437 38.75 20ZM31.9325 31.9325C30.3673 33.502 28.5074 34.7466 26.4596 35.5948C24.4118 36.443 22.2165 36.8781 20 36.875C10.6803 36.875 3.125 29.3197 3.125 20C3.125 15.3406 5.01406 11.1219 8.0675 8.0675L31.9325 31.9325ZM33.185 30.5337L9.46625 6.815C12.4544 4.42048 16.1708 3.11859 20 3.125C29.3197 3.125 36.875 10.6803 36.875 20C36.875 23.9844 35.4941 27.6462 33.185 30.5337Z"
        fill={fill}
        stroke={stroke}
        strokeWidth="2"
      />
    </svg>
  );
}

export { VoidIcon };
