import { ASSET_CONFIG } from "../config";
import type { IconProps } from "../type";

function DirectoryIcon(opt: IconProps = {}) {
  const { className, fill, height, width } = {
    ...ASSET_CONFIG,
    ...opt,
  };

  return (
    <svg
      className={className}
      width={width}
      height={height}
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>Directory icon</title>
      <path
        d="M10.5 6.375C10.5 5.38044 10.1049 4.42661 9.40165 3.72335C8.69839 3.02009 7.74456 2.625 6.75 2.625C5.75544 2.625 4.80161 3.02009 4.09835 3.72335C3.39509 4.42661 3 5.38044 3 6.375C3 7.36956 3.39509 8.32339 4.09835 9.02665C4.80161 9.72991 5.75544 10.125 6.75 10.125C7.74456 10.125 8.69839 9.72991 9.40165 9.02665C10.1049 8.32339 10.5 7.36956 10.5 6.375Z"
        stroke={fill}
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12 15.375C12 13.9826 11.4469 12.6473 10.4623 11.6627C9.47774 10.6781 8.14239 10.125 6.75 10.125C5.35761 10.125 4.02226 10.6781 3.03769 11.6627C2.05312 12.6473 1.5 13.9826 1.5 15.375M12.75 7.5H16.5M12.75 9.75H16.5M15 12H16.5"
        stroke={fill}
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export { DirectoryIcon };
