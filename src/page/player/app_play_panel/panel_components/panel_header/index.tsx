import React, { memo } from 'react'
import type { FC, ReactNode } from 'react'
import {appShallowEqual, useAppDispatch, useAppSelector, } from '@/store'
import {HeaderLeft, HeaderRight, PanelHeaderWrapper } from './style'
import {changeSongListAction} from '@/store/module/player'

interface IProps {
  children?: ReactNode
}

const PanelHeader: FC<IProps> = () => {
  const { playList, currentSong } = useAppSelector(
    (state) => ({
      playList: state.player.playSongList,
      currentSong: state.player.currentSong
    }),
    appShallowEqual
  )
  const dispatch = useAppDispatch()
  const handleClear = () => {
    dispatch(changeSongListAction([]))
  }
  return (
    <PanelHeaderWrapper>
      <HeaderLeft>
        <h3>播放列表({playList.length})</h3>
        <div className="operator">
          <button>
            <i className="sprite_playlist icon favor"></i>
            收藏全部
          </button>
          <button onClick={handleClear}>
            <i className="sprite_playlist icon remove"></i>
            清除
          </button>
        </div>
      </HeaderLeft>
      <HeaderRight>{currentSong.name}</HeaderRight>
    </PanelHeaderWrapper>
  )
}

export default memo(PanelHeader)
