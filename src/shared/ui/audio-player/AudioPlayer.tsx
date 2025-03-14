import styles from './AudioPlayer.module.scss';
import {FC, useEffect, useRef, useState} from 'react';
import {DownloadIcon} from "@shared/ui/icons/DownloadIcon.tsx";
import {PauseIcon} from "@shared/ui/icons/PauseIcon.tsx";
import {PlayIcon} from "@shared/ui/icons/PlayIcon.tsx";
import {useAudio} from "@shared/lib/hooks/useAudio.ts";

interface AudioPlayerProps {
  time?: number;
  record: string;
  partnershipId: string;
}

export const AudioPlayer: FC<AudioPlayerProps> = ({record, partnershipId}) => {
  const {audioSrc, isLoading, error, loadAudio} = useAudio(record, partnershipId);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (audioSrc) {
      audioRef.current!.src = audioSrc;
      audioRef.current?.play();
      setIsPlaying(true);
    }
  }, [audioSrc]);

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

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      const {currentTime, duration} = audioRef.current;
      setProgress((currentTime / duration) * 100);
    }
  };

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
    <div className={styles.audio}>
      <audio
        ref={audioRef}
        onTimeUpdate={handleTimeUpdate}
        onEnded={handleEnded}
      />
      <button
        className={styles.play}
        onClick={handlePlayPause}
        disabled={isLoading}
      >
        {isLoading ? 'Загрузка...' : isPlaying ? <PauseIcon/> : <PlayIcon/>}
      </button>
      <div className={styles.progress_bar}>
        <div
          className={styles.progress}
          style={{width: `${progress}%`}}
        />
      </div>
      <button
        className={styles.download}
        onClick={handleDownload}
        disabled={isLoading}
      >
        <DownloadIcon/>
      </button>
      {error && <div className={styles.error}>{error}</div>}
    </div>
  );
};


// <div className="CustomAudioPlayer">
//   <audio
//     ref={audioRef}
//     onTimeUpdate={handleTimeUpdate}
//     onEnded={() => setIsPlaying(false)}
//   >
//     {audioSrc && <source src={audioSrc} type="audio/mpeg"/>}
//   </audio>
//   <div className="CustomAudioPlayer__controls">
//     <div className="CustomAudioPlayer__time">{currentTime}</div>
//     <button
//       className="CustomAudioPlayer__play"
//       onClick={handlePlayPause}
//     >
//       {isPlaying ? <PauseIcon/> : <PlayIcon/>}
//     </button>
//   </div>
//   <div className="CustomAudioPlayer__progress-bar">
//     <div
//       className="CustomAudioPlayer__progress"
//       style={{width: `${progress}%`}}
//     ></div>
//   </div>
//   <a
//     href={audioSrc}
//     download
//     className="CustomAudioPlayer__download"
//   >
//     <DownloadIcon/>
//   </a>
//   <button>
//     <CloseIcon width={14} height={14} fill='#002CFB'/>
//   </button>
// </div>
