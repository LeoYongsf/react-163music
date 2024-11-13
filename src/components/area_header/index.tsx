import {FC, memo, ReactNode} from "react";
import {RecommendHeaderWrapper} from '@/components/area_header/style'
import { Link } from "react-router-dom";

interface IProps {
  children?: ReactNode
  title?: string
  keywords?: any[]
  moreLink?: string
  moreText?: string
}

const AreaHeader: FC<IProps> = (props) => {
  const {
    title = '默认标题',
    keywords = [],
    moreText = '更多',
    moreLink = '/',
  } = props

  return (
    <RecommendHeaderWrapper className="sprite_02">
      <div className="left">
        <h3 className="title">{title}</h3>
        <div className="keywords">
          {
            keywords.map((item) => {
              return (
                <div className="item" key={item}>
                  <span className="link">{item}</span>
                  <span className="divider">|</span>
                </div>
              )
            })
          }
        </div>
      </div>
      <div className="right">
        <Link to={moreLink}>{moreText}</Link>
        <i className="sprite_02 icon"></i>
      </div>
    </RecommendHeaderWrapper>
  )
}

export default memo(AreaHeader)