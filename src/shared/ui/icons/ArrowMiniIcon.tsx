import {FC} from "react";

interface ArrowMiniIconProps {
  width?: number;
  height?: number;
  fill?: string;
  rotate?: number;
  className?: string;
}

export const ArrowMiniIcon: FC<ArrowMiniIconProps> = (props) => {
  const {
    width = 12,
    height = 8,
    fill = "#ADBFDF",
    rotate = 180,
    className = "",
  } = props;

  return (
    <svg
      width={width}
      height={height}
      style={{transform: `rotate(${rotate}deg)`, transition: "all 0.5s ease"}}
      viewBox="0 0 12 8"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className} // Добавляем класс для стилизации
    >
      <path
        d="M6 0L0 6L1.41 7.41L6 2.83L10.59 7.41L12 6L6 0Z"
        fill={fill}
        className="arrow-icon-path" // Добавляем класс для пути
      />
    </svg>
  );
};
