import {FC, memo, ReactNode} from "react";
import {RankingItemWrapper} from '@/page/discover/inner_page/recommend/i_components/top_ranking_item/style'
import {getImageSize} from '@/utils/format'
import {Link} from "react-router-dom";
import {useAppDispatch} from '@/store'
import {fetchCurrentSong} from '@/store/module/player'

interface IProps {
  children?: ReactNode
  itemData: any
}

const TopRankingItem: FC<IProps> = (props) => {
  const {itemData} = props
  const {tracks = []} = itemData

  const dispatch = useAppDispatch()

  function handlePlayClick(id: number) {
    dispatch(fetchCurrentSong(id))
  }

  return (
    <RankingItemWrapper>
      <div className="header">
        <div className="image">
          <img src={getImageSize(itemData.coverImgUrl, 80)} alt=""/>
          <a href="" className="sprite_cover"></a>
        </div>
        <div className="info">
          <div className="name">{itemData.name}</div>
          <button className="sprite_02 btn1 play"></button>
          <button className="sprite_02 btn1 favor"></button>
        </div>
      </div>
      <div className="list">
        {
          tracks.slice(0, 10).map((item: any, index: number) => {
            return (
              <div className="item" key={item.id}>
                <div className="index">{index + 1}</div>
                <div className="info">
                  <div className="name">{item.name}</div>
                  <div className="operator">
                    <button className="btn2 sprite_02 play"
                            onClick={() => handlePlayClick(item.id)}></button>
                    <button className="btn2 sprite_icon2 add"></button>
                    <button className="btn2 sprite_02 favor"></button>
                  </div>
                </div>
              </div>
            )
          })
        }
      </div>
      <div className="footer">
        <Link to="/discover/ranking">查看全部 &gt;</Link>
      </div>
    </RankingItemWrapper>
  )
}

export default memo(TopRankingItem)