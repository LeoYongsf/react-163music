import {FC, memo, ReactNode, useRef, ElementRef} from "react";
import AreaHeader from '@/components/area_header'
import {AlbumWrapper} from '@/page/discover/inner_page/recommend/i_components/new_album/style'
import {useAppSelector} from '@/store'
import {Carousel} from 'antd'
import NewAlbumItem from '@/components/new_album_item'

interface IProps {
  children?: ReactNode
}

const NewAlbum: FC<IProps> = () => {
  const bannerRef = useRef<ElementRef<typeof Carousel>>(null)

  const {newAlbums} = useAppSelector((state) => ({
    newAlbums: state.recommend.newAlbum
  }))

  function handlePrevClick() {
    bannerRef.current?.prev()
  }

  function handleNextClick() {
    bannerRef.current?.next()
  }

  return (
    <AlbumWrapper>
      <AreaHeader title="新碟上架" moreLink="/discover/album"/>
      <div className="content">
        <button className="arrow arrow-left sprite_02"
                onClick={handlePrevClick}
        ></button>
        <div className="banner">
          <Carousel ref={bannerRef} dots={false} speed={1500}>
            {
              [0, 1].map((item) => {
                return (
                  <div>
                    <div className="album-list" key={item}>
                      {
                        newAlbums.slice(item * 5, (item + 1) * 5).map((album) => {
                          return (
                            <NewAlbumItem key={album.id} itemData={album}/>
                          )
                        })
                      }
                    </div>
                  </div>
                )
              })
            }
          </Carousel>
        </div>
        <button className="arrow arrow-right sprite_02"
                onClick={handleNextClick}
        ></button>
      </div>
    </AlbumWrapper>
  )
}

export default memo(NewAlbum)