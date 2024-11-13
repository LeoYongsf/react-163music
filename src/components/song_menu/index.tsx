import {FC, memo, ReactNode} from "react";
import {MenuWrapper} from '@/components/song_menu/style'
import {formatCount, getImageSize} from '@/utils/format'

interface IProps {
  children?: ReactNode
  itemData: any
}

const SongMenu: FC<IProps> = (props) => {
  const {itemData} = props

  return (
    <MenuWrapper>
      <div className="top">
        <img src={getImageSize(itemData.picUrl, 140)} alt=""/>
        <div className="cover sprite_cover">
          <div className="info sprite_cover">
            <span className="count">
              <i className="sprite_icon headset"></i>
              <span className="count">
                {formatCount(itemData.playCount)}
              </span>
            </span>
            <i className="sprite_icon play"></i>
          </div>
        </div>
      </div>
      <div className="bottom">
        {itemData.name}
      </div>
    </MenuWrapper>
  )
}

export default memo(SongMenu)