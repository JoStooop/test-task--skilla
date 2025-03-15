import styles from './AudioPlayer.module.scss';
import {FC, useRef, useState} from 'react';
import {DownloadIcon} from "@shared/ui/icons/DownloadIcon.tsx";
import {PauseIcon} from "@shared/ui/icons/PauseIcon.tsx";
import {PlayIcon} from "@shared/ui/icons/PlayIcon.tsx";
import {CloseIcon} from "@shared/ui/icons/CloseIcon.tsx";
import {useAudio} from "@shared/lib/hooks/useAudio.ts";

interface AudioPlayerProps {
  time?: number;
  record: string;
  partnershipId: string;
}

export const AudioPlayer: FC<AudioPlayerProps> = ({time, record, partnershipId}) => {
  const {audioSrc, isLoading, error, loadAudio} = useAudio(record, partnershipId);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState("00:00");
  const [progress, setProgress] = useState(0);

  const handlePlayPause = async () => {
    if (!audioSrc) {
      await loadAudio();
      return;
    }

    if (isPlaying) {
      audioRef.current?.pause();
    } else {
      audioRef.current?.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleEnded = () => {
    setIsPlaying(false);
    setProgress(0);
  };

  // const handleTimeUpdate = () => {
  //   if (audioRef.current) {
  //     const {currentTime, duration} = audioRef.current;
  //     setProgress((currentTime / duration) * 100);
  //   }
  // };

  const handleDownload = async () => {
    if (!audioSrc) {
      await loadAudio();
    }

    if (audioSrc) {
      const response = await fetch(audioSrc);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `record_${partnershipId}.mp3`;
      a.click();
      window.URL.revokeObjectURL(url);
    }
  };

  return (
    <div className={styles.player}>
      <audio
        ref={audioRef}
        onTimeUpdate={(e) => {
          const audio = e.currentTarget;
          setProgress((audio.currentTime / audio.duration) * 100);
          setCurrentTime(new Date(audio.currentTime * 1000).toISOString().slice(14, 19));
        }}
        onEnded={handleEnded}
      >
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
