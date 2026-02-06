import { ASSET_CONFIG } from "../config";
import type { IconProps } from "../type";

function StaffIcon(opt: IconProps) {
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
      <title>Staff icon</title>
      <path
        d="M13.2346 8.61761V5.17643L9.79362 1.35291H1.76466C1.56186 1.35291 1.36737 1.43347 1.22396 1.57688C1.08056 1.72029 1 1.9148 1 2.11761V15.8823C1 16.0851 1.08056 16.2796 1.22396 16.423C1.36737 16.5665 1.56186 16.647 1.76466 16.647H5.58797"
        stroke={stroke}
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10.9414 13.5881C11.7861 13.5881 12.4708 12.9034 12.4708 12.0587C12.4708 11.214 11.7861 10.5293 10.9414 10.5293C10.0968 10.5293 9.41211 11.214 9.41211 12.0587C9.41211 12.9034 10.0968 13.5881 10.9414 13.5881Z"
        stroke={stroke}
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M14.0001 16.647C14.0001 15.8358 13.6779 15.0577 13.1043 14.4841C12.5306 13.9105 11.7527 13.5882 10.9415 13.5882C10.1303 13.5882 9.35228 13.9105 8.77867 14.4841C8.20506 15.0577 7.88281 15.8358 7.88281 16.647M9.41214 1.35291V5.17643H13.2354"
        stroke={stroke}
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export { StaffIcon };
