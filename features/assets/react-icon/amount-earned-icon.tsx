import { ASSET_CONFIG } from "../config";
import type { IconProps } from "../type";

function AmountEarnedIcon(opt: IconProps = {}) {
  const { className, fill, height, width } = {
    ...ASSET_CONFIG,
    ...opt,
  };

  return (
    <svg
      className={className}
      width={width}
      height={height}
      viewBox="0 0 24 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>Amount earned icon</title>
      <path
        d="M20.4879 15.5C19.8674 17.2551 18.7178 18.7747 17.1977 19.8493C15.6775 20.9238 13.8615 21.5006 11.9999 21.5C9.87549 21.5018 7.8189 20.7521 6.19408 19.3834C4.56927 18.0148 3.48097 16.1155 3.12178 14.0217C2.76259 11.9279 3.15566 9.77444 4.23144 7.94254C5.30722 6.11063 6.99634 4.71832 8.99992 4.012M11.9999 3.5C14.3869 3.5 16.676 4.44821 18.3639 6.13604C20.0517 7.82387 20.9999 10.1131 20.9999 12.5H11.9999V3.5Z"
        stroke={fill}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export { AmountEarnedIcon };
