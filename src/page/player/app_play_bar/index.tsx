import React, {FC, memo, ReactNode, useEffect, useRef, useState} from "react";
import {BarControl, BarOperator, BarPlayInfo, BarWrapper} from "./style";
import {Link} from 'react-router-dom'
import {message, Slider} from 'antd'
import {appShallowEqual, useAppDispatch, useAppSelector} from '@/store'
import {formatTime, getImageSize, getSongPlayUrl} from "@/utils/format";
import {changeLyricIndexAction, changeMusicAction, changePlayModeAction} from '@/store/module/player'
import PlayPanel from '@/page/player/app_play_panel'
import VolumeControl from '@/page/player/volume_control'

interface IProps {
  children?: ReactNode
}

const AppPlayBar: FC<IProps> = () => {
  // 组件内部定义数据
  const [isPlaying, setIsPlaying] = useState(false)
  const [process, setProcess] = useState(0)
  const [duration, setDuration] = useState(0)
  const [currentTime, setCurrentTime] = useState(0)
  const [isSliding, setIsSliding] = useState(false)

  const [volume,setVolume] =useState(50)
  const [isShowVolume, setIsShowVolume] = useState(false)
  const [isShowPanel, setIsShowPanel] = useState(false)
  const [isShowLyrics, setIsShowLyrics] = useState(true)
  const audioRef = useRef<HTMLAudioElement>(null)

  // 获取歌曲数据
  const {currentSong, lyrics, lyricIndex, playMode, playList} = useAppSelector(
    (state) => ({
      currentSong: state.player.currentSong,
      lyrics: state.player.lyrics,
      lyricIndex: state.player.lyricIndex,
      playMode: state.player.playMode,
      playList: state.player.playSongList
    }), appShallowEqual);

  const dispatch = useAppDispatch();

  // 歌曲点击播放
  useEffect(() => {
    audioRef.current!.src = getSongPlayUrl(currentSong.id)
    audioRef.current?.play()
      .then(() => {
        setIsPlaying(true)
        console.log("播放成功")
      })
      .catch((err) => {
        setIsPlaying(false)
        console.log(err)
      })
    setDuration(currentSong.dt)
  }, [currentSong])

  //播放进度处理
  function handleTimeUpate() {
    // 获取当前播放时间
    const currentTime = audioRef.current!.currentTime * 1000
    //计算当前播放进度
    if (!isSliding) {
      const process = (currentTime / duration) * 100
      setProcess(process)
      setCurrentTime(currentTime)
    }

    //根据播放时间匹配歌词
    let index = lyrics.length - 1
    for (let i = 0; i < lyrics.length; i++) {
      const lyric = lyrics[i]
      if (lyric.time > currentTime) {
        index = i - 1
        break
      }
    }
    //匹配歌词的index
    if (lyricIndex === index || index === -1) {
      return
    }
    dispatch(changeLyricIndexAction(index))

    //展示对应歌词
    if (!isShowLyrics) {
      message.destroy('lyric')
    }

    isShowLyrics && message.open({
      content: lyrics[index].text,
      key: 'lyric',
      duration: 0
    })
  }

  //循环播放（根据模式）
  function handleTimeEnd() {
    if (playMode === 2) {
      audioRef.current!.currentTime = 0
      audioRef.current!.play()
    } else {
      handleChangeMusic(true)
    }
  }

  // 组件内部控制
  function handlePlayBtnClick() {
    // 控制播放与暂停
    isPlaying
      ? audioRef.current?.pause()
      : audioRef.current?.play().catch(() => setIsPlaying(false))
    // 改变isPlaying状态
    setIsPlaying(!isPlaying)
  }

  //进度条点击处理
  function handleSliderChange(value: number) {
    const currentTime = (value / 100) * duration
    audioRef.current!.currentTime = currentTime / 1000
    setCurrentTime(currentTime)
    setProcess(value)
    setIsSliding(false)
  }

  // 进度条滑动处理
  function handleSliderSliding(value: number) {
    setIsSliding(true)
    setProcess(value)
    const currentTime = (value / 100) * duration
    setCurrentTime(currentTime)
  }

  //播放模式切换
  function handleChangePlayMode() {
    let newPlayMode = playMode + 1
    if (newPlayMode > 2) {
      newPlayMode = 0
    }
    dispatch(changePlayModeAction(newPlayMode))
  }

  // 切歌
  function handleChangeMusic(isNext = true) {
    dispatch(changeMusicAction(isNext))
  }

  function handleShowVolume() {
    setIsShowVolume(!isShowVolume)
  }

  //播放列表
  function handleShowPanel() {
    setIsShowPanel(!isShowPanel)
    setIsShowLyrics(isShowPanel)
  }


  return (
    <BarWrapper className="sprite_playbar">
      <>
        <div className="content wrap-v2">
          <BarControl isPlaying={isPlaying}>
            <button className="btn sprite_playbar prev" onClick={() => handleChangeMusic(false)}></button>
            <button className="btn sprite_playbar play" onClick={handlePlayBtnClick}></button>
            <button className="btn sprite_playbar next" onClick={() => handleChangeMusic()}></button>
          </BarControl>
          <BarPlayInfo>
            <Link to="/player">
              <img src={getImageSize(currentSong?.al?.picUrl, 34)} alt=""/>
            </Link>
            <div className="info">
              <div className="song">
                <span className='song-name'>{currentSong.name}</span>
                <span className="singer-name">{currentSong.ar?.[0]?.name}</span>
              </div>

              <div className="process">
                <Slider
                  step={0.5}
                  value={process}
                  tooltip={{formatter: null}}
                  onChange={handleSliderSliding}
                  onAfterChange={handleSliderChange}
                />
                <div className="time">
                  <span className="current">{formatTime(currentTime)}</span>
                  <span className="divider">/</span>
                  <span className="duration">{formatTime(duration)}</span>
                </div>
              </div>
            </div>
          </BarPlayInfo>
          <BarOperator playMode={playMode}>
            <div className="left">
              <button className="btn pip"></button>
              <button className="btn sprite_playbar favor"></button>
              <button className="btn sprite_playbar share"></button>
            </div>
            <div className="right sprite_playbar">
              {/*音量控制滑块*/}
              {isShowVolume && <VolumeControl audioRef={audioRef} volume={volume} setVolume={setVolume}/>}
              <button className="btn sprite_playbar volume" onClick={handleShowVolume}></button>
              <button className="btn sprite_playbar loop"
                      onClick={handleChangePlayMode}></button>
              <button className="btn sprite_playbar playlist" onClick={handleShowPanel}>
                {playList.length}
              </button>
            </div>
          </BarOperator>
        </div>
        {/*播放组件*/}
        <audio
          ref={audioRef}
          onTimeUpdate={handleTimeUpate}
          onEnded={handleTimeEnd}>
        </audio>
      </>
      {isShowPanel && <PlayPanel/>}
    </BarWrapper>
  )
}

export default memo(AppPlayBar)