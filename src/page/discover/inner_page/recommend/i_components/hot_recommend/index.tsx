import {FC, memo, ReactNode} from "react";
import {HotRecWrapper} from '@/page/discover/inner_page/recommend/i_components/hot_recommend/style'
import AreaHeader from '@/components/area_header'
import {appShallowEqual, useAppSelector} from '@/store'
import SongMenu from '@/components/song_menu'

interface IProps {
  children?: ReactNode
}

const HotRecommend: FC<IProps> = () => {
  const {hotRecommends} = useAppSelector((state) => ({
      hotRecommends: state.recommend.hotRecommend
    }),
    appShallowEqual
  )

  return (
    <HotRecWrapper>
      <AreaHeader
        title="热门推荐"
        keywords={["华语", "流行", "摇滚", "民谣"]}
        moreLink="/discover/songs"
      />
      <div className="recommend-list">
        {
          hotRecommends.map((item) => {
            return (
              <SongMenu key={item.id} itemData={item}/>
            )
          })
        }
      </div>
    </HotRecWrapper>
  )
}

export default memo(HotRecommend)