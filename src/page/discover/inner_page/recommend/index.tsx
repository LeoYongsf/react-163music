import React, {FC, memo, ReactNode, useEffect} from "react";
import {
  fetchArtistListAction,
  fetchBannerDataAction,
  fetchHotRecommendDataAction,
  fetchNewAlbumDataAction,
  fetchRankingDataAction
} from '@/store/module/recommend'
import {useAppDispatch} from '@/store'
import TopBanner from '@/page/discover/inner_page/recommend/i_components/top_banner'
import {RecommendWrapper} from '@/page/discover/inner_page/recommend/style'
import HotRecommend from '@/page/discover/inner_page/recommend/i_components/hot_recommend'
import NewAlbum from '@/page/discover/inner_page/recommend/i_components/new_album'
import TopRanking from '@/page/discover/inner_page/recommend/i_components/top_ranking'
import UserLogin from '@/page/discover/inner_page/recommend/i_components/user_login'
import ContractArtist from '@/page/discover/inner_page/recommend/i_components/contract_artist'
import HotStreamer from '@/page/discover/inner_page/recommend/i_components/hot_streamer'

interface IProps {
  children?: ReactNode
}

const Recommend: FC<IProps> = () => {
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(fetchBannerDataAction())
    dispatch(fetchHotRecommendDataAction())
    dispatch(fetchNewAlbumDataAction())
    dispatch(fetchRankingDataAction())
    dispatch(fetchArtistListAction())
  }, [])

  return (
    <RecommendWrapper>
      <TopBanner/>
      <div className="content wrap-v2">
        <div className="left">
          <HotRecommend/>
          <NewAlbum/>
          <TopRanking/>
        </div>
        <div className="right">
          <UserLogin/>
          <ContractArtist/>
          <HotStreamer/>
        </div>
      </div>
    </RecommendWrapper>
  )
}

export default memo(Recommend)