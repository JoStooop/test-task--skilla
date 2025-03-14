import {FC} from "react";

interface PauseIconProps {
  width?: number;
  height?: number;
  fill?: string;
}

export const PauseIcon: FC<PauseIconProps> = (props) => {
  const {
    width = 9,
    height = 10,
    fill = "#002CFB",
  } = props;

  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 8 10"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M2 0C1.44772 0 1 0.447715 1 1V9C1 9.55228 1.44772 10 2 10H4C4.55228 10 5 9.55228 5 9V1C5 0.447715 4.55228 0 4 0H2ZM7 0C6.44772 0 6 0.447715 6 1V9C6 9.55228 6.44772 10 7 10H9C9.55228 10 10 9.55228 10 9V1C10 0.447715 9.55228 0 9 0H7Z"
        fill={fill}
      />
    </svg>
  );
};
