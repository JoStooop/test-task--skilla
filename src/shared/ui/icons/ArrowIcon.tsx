import {FC} from "react";

interface ArrowIconProps {
  status: string;
  inOut: number
}

const CallsStatus = {
  MISSED: 'Пропущенный',
  FAILED: 'Не дозвонился',
  SUCCESS: 'Успешный',
};

const Colors = {
  MISSED: '#EA1A4F',
  SUCCESS: '#002CFB',
  INCOMING: '#002CFB',
  OUTGOING: '#28A879',
};

const getArrowColor = (status: string, inOut: number): string => {
  if (status === CallsStatus.MISSED || status === CallsStatus.FAILED) {
    return Colors.MISSED;
  }
  if (status === CallsStatus.SUCCESS) {
    return Colors.SUCCESS;
  }
  return inOut ? Colors.INCOMING : Colors.OUTGOING;
};

export const ArrowIcon: FC<ArrowIconProps> = ({status, inOut}) => {
  const colorArrow = getArrowColor(status, inOut);

  return (
    <svg
      width="24px"
      height="24px"
      style={{transform: `rotate(${inOut ? 0 : 180}deg)`}}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label={`Arrow icon for ${status} call`}
    >
      <path
        d="M18.5217 7.17704L17.3447 6L7.66957 15.6751V10.1739H6V18.5217H14.3478V16.8522H8.84661L18.5217 7.17704Z"
        fill={colorArrow}
      />
    </svg>
  );
};
