import classNames from 'classnames'
import React, { memo } from 'react'
import type { FC, ReactNode } from 'react'
import {appShallowEqual, useAppDispatch, useAppSelector} from '@/store'
import {fetchCurrentSong} from '@/store/module/player'
import {PlayListWrapper} from '@/page/player/app_play_panel/panel_components/play_list/style'
import {formatTime} from '@/utils/format'

interface IProps {
  children?: ReactNode
}

const PlayList: FC<IProps> = () => {
  const { playList, currentSongIndex } = useAppSelector(
    (state) => ({
      playList: state.player.playSongList,
      currentSongIndex: state.player.playSongIndex
    }),
    appShallowEqual
  )

  const dispatch = useAppDispatch()
  const handlePlayMusic = (id: number) => {
    dispatch(fetchCurrentSong(id))
  }
  return (
    <PlayListWrapper>
      {playList.map((item, index) => {
        return (
          <div
            key={item.id}
            className={classNames('play-item', { active: currentSongIndex === index })}
            onClick={() => handlePlayMusic(item.id)}
          >
            <div className="left">{item.name}</div>
            <div className="right">
              <span className="singer">{item.ar[0].name}</span>
              <span className="duration">{formatTime(item.dt)}</span>
              <span className="sprite_playlist link"></span>
            </div>
          </div>
        )
      })}
    </PlayListWrapper>
  )
}

export default memo(PlayList)
