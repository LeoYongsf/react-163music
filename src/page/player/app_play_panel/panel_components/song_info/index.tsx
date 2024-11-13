import {FC, memo, ReactNode, useEffect, useRef} from "react";
import {appShallowEqual, useAppSelector} from '@/store'
import {scrollTo} from '@/utils/lyric-scroll'
import {LyricWrapper} from '@/page/player/app_play_panel/panel_components/song_info/style'
import classNames from "classnames";

interface IProps {
  children?: ReactNode
}

const SongInfo: FC<IProps> = () => {
  const {lyrics, lyricIndex} = useAppSelector((state) => ({
      lyrics: state.player.lyrics,
      lyricIndex: state.player.lyricIndex
    }),
    appShallowEqual
  )

  const panelRef = useRef()

  //歌词滚动
  useEffect(() => {
    if (lyricIndex > 0 && lyricIndex < 3) return
    panelRef.current && scrollTo(panelRef.current,
      (lyricIndex - 3) * 32,
      300)
  }, [lyricIndex])

  return (
    <LyricWrapper ref={panelRef}>
      <div className="lyric-content">
        {lyrics.map((item, index) => {
          return (
            <div
              className={classNames('lyric-item', {active: index === lyricIndex})}
              key={item.time}>
              {item.text}
            </div>
          )
        })}
      </div>
    </LyricWrapper>
  )
}

export default memo(SongInfo)