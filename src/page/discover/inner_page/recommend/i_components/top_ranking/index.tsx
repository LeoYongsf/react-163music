import {FC, memo, ReactNode} from "react";
import {RankingWrapper} from '@/page/discover/inner_page/recommend/i_components/top_ranking/style'
import AreaHeader from '@/components/area_header'
import {appShallowEqual, useAppSelector} from '@/store'
import TopRankingItem from '@/page/discover/inner_page/recommend/i_components/top_ranking_item'

interface IProps {
  children?: ReactNode
}

const TopRanking: FC<IProps> = () => {
  const {playlists} = useAppSelector((state) => ({
    playlists: state.recommend.playlists
  }),appShallowEqual)

  return (
    <RankingWrapper>
      <AreaHeader title="榜单" moreLink="/discover/ranking"/>
      <div className="content">
        {
          playlists.map((item) => {
              return (
                <TopRankingItem key={item.id} itemData={item}/>
              )
            }
          )
        }
      </div>
    </RankingWrapper>
  )
}

export default memo(TopRanking)