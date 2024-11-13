import {FC, memo, ReactNode} from "react";
import {AlbumItemWrapper} from '@/components/new_album_item/style'
import {getImageSize} from '@/utils/format'

interface IProps {
  children?: ReactNode
  itemData: any
}

const NewAlbumItem: FC<IProps> = (props) => {
  const {itemData} = props

  return (
    <AlbumItemWrapper>
      <div className="top">
        <img src={getImageSize(itemData.picUrl, 100)} alt=""/>
        <a href="" className="cover sprite_cover"></a>
      </div>
      <div className="info">
        <div className="name">{itemData.name}</div>
        <div className="artist">{itemData.artist.name}</div>
      </div>
    </AlbumItemWrapper>
  )
}

export default memo(NewAlbumItem)