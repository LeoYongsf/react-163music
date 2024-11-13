import {FC, memo, ReactNode} from "react";
import {Container} from '@/page/discover/inner_page/recommend/i_components/hot_streamer/style'
import AreaHeader from '@/components/area_header'

interface IProps {
  children?: ReactNode
}

const HotStreamer: FC<IProps> = () => {
  return (
    <Container>
      <AreaHeader title="热门主播" moreText="查看全部"/>
    </Container>
  )
}

export default memo(HotStreamer)