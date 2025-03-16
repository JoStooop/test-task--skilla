import styles from './AudioPlayer.module.scss';
import {FC, useRef, useState} from 'react';
import {DownloadIcon} from "@shared/ui/icons/DownloadIcon.tsx";
import {PauseIcon} from "@shared/ui/icons/PauseIcon.tsx";
import {PlayIcon} from "@shared/ui/icons/PlayIcon.tsx";
import {CloseIcon} from "@shared/ui/icons/CloseIcon.tsx";
import {useAudio} from "@shared/lib/hooks/useAudio.ts";
import {Call} from "@app/store/slices/callsSlice.ts";
import {convertSecondsToMinutes} from "@entities/call/utils/formatDuration.ts";

interface AudioPlayerProps {
  call: Call;
}

export const AudioPlayer: FC<AudioPlayerProps> = ({call}) => {
  const {time} = call;
  // const {audioSrc, isLoading, error} = useAudio({record, partnership_id});
  const {audioSrc, isLoading, error} = useAudio({}); // Ничего не передаем чтобы не сработал error
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [currentTime] = useState(convertSecondsToMinutes(time));

  const handlePlayPause = async () => {
    console.log('Play / Pause')
  };

  const handleEnded = () => {
    setIsPlaying(false);
    setProgress(0);
  };

  const handleDownload = async () => {
    console.log('download')
  };

  if (isLoading) return <div>Загрузка...</div>
  if (error) return <div>{error}</div>

  return (
    <div className={styles.player}>
      <audio ref={audioRef} onEnded={handleEnded}>
        {audioSrc && <source src={audioSrc} type="audio/mpeg"/>}
      </audio>

      <div className={styles.controls}>
        <div className={styles.time}>{currentTime}</div>
        <button className={styles.playButton} onClick={handlePlayPause}>
          {isPlaying ? <PauseIcon/> : <PlayIcon/>}
        </button>
      </div>

      <div className={styles.progressBar}>
        <div className={styles.progress} style={{width: `${progress}%`}}/>
      </div>

      <div className={styles.actions}>
        <button className={styles.downloadButton} onClick={handleDownload}>
          <DownloadIcon/>
        </button>
        <button className={styles.closeButton}>
          <CloseIcon width={14} height={14} fill="#002CFB"/>
        </button>
      </div>
    </div>
  );
};
