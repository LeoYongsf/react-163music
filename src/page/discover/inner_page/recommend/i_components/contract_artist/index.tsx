import {FC, memo, ReactNode} from "react";
import {ArtistWrapper} from '@/page/discover/inner_page/recommend/i_components/contract_artist/style'
import AreaHeader from '@/components/area_header'
import {useAppSelector} from '@/store'
import { getImageSize } from "@/utils/format";

interface IProps {
  children?: ReactNode
}

const ContractArtist: FC<IProps> = () => {
  const {contractArtist} = useAppSelector((state) => ({
    contractArtist: state.recommend.contractArtist
  }))

  return (
    <ArtistWrapper>
      <AreaHeader title="入驻歌手" moreText="查看全部"/>
      <div className="artists">
        {
          contractArtist.map((item) => {
            return (
              <a href="#/discover/artist" key={item.id} className="item">
                <img src={getImageSize(item.picUrl, 80)} alt=""/>
                <div className="art-info">
                  <div className="name">{item.name}</div>
                  <div className="alias">{item.alias.join(' ')}</div>
                </div>
              </a>
            )
          })
        }
      </div>
      <button className="apply">申请成为网易音乐人</button>
    </ArtistWrapper>
  )
}

export default memo(ContractArtist)