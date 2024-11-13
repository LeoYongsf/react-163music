import {FC, memo, ReactNode, useRef, useState} from "react";
import {VlmControlWrapper} from '@/page/player/volume_control/style'

interface IProps {
  children?: ReactNode
  audioRef: React.RefObject<HTMLAudioElement>
  volume: number;
  setVolume: React.Dispatch<React.SetStateAction<number>>;
}

const VolumeControl: FC<IProps> = ({audioRef,volume,setVolume}) => {
  const sliderRef = useRef<HTMLDivElement>(null);

  // 鼠标拖动更新音量
  function handleMouseDown(eventevent: React.MouseEvent<HTMLDivElement>) {
    // 添加移动和松开事件监听
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    // 初始化滑动
    updateVolume(eventevent || new MouseEvent('mousemove'));
  }

  function handleMouseMove(event: MouseEvent) {
    updateVolume(event);
  };

  function handleMouseUp() {
    // 移除事件监听
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);
  };

  function updateVolume(event: MouseEvent | React.MouseEvent) {
    if (sliderRef.current) {
      const rect = sliderRef.current.getBoundingClientRect();
      const newVolume = Math.min(Math.max(0, (rect.bottom - event.clientY) / rect.height), 1);
      setVolume(newVolume * 100);
      audioRef.current!.volume = newVolume;
    }
  };

  return (
    <VlmControlWrapper>
      <div className="container playbar_bng">
        <div
          className="vlm-slider"
          ref={sliderRef}
          onMouseDown={handleMouseDown}
        >
          <div className="track" style={{height: `${volume}%`}}/>
          <div className="thumb sprite_icon" style={{bottom: `${volume}%`}}/>
        </div>
      </div>
    </VlmControlWrapper>
  )
}

export default memo(VolumeControl)