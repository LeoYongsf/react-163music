import React, {memo} from 'react'
import type {FC, ReactNode} from 'react'
import PanelHeader from '@/page/player/app_play_panel/panel_components/panel_header'
import {PlayPanelWrapper} from '@/page/player/app_play_panel/style'
import PlayList from '@/page/player/app_play_panel/panel_components/play_list'
import SongInfo from '@/page/player/app_play_panel/panel_components/song_info'

interface IProps {
  children?: ReactNode
}

const PlayPanel: FC<IProps> = () => {
  return (
    <PlayPanelWrapper>
      <PanelHeader/>
      <div className="main">
        <PlayList/>
        <SongInfo/>
      </div>
    </PlayPanelWrapper>
  )
}

export default memo(PlayPanel)
