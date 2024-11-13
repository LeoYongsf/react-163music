import {FC, memo, ReactNode,
  useRef, ElementRef, useState} from "react";
import {appShallowEqual, useAppSelector} from '@/store'
import {
  BannerControl,
  BannerLeft,
  BannerRight,
  BannerWrapper
} from '@/page/discover/inner_page/recommend/i_components/top_banner/style'
import {Carousel} from 'antd'

interface IProps {
  children?: ReactNode
}

const TopBanner: FC<IProps> = () => {

  const [currentIndex, setCurrentIndex] = useState(0)

  const bannerRef = useRef<ElementRef<typeof Carousel>>(null)

  //从store中获取轮播图数据
  const {banners} = useAppSelector((state) => ({
    banners: state.recommend.banners
  }), appShallowEqual)

  function handleBeforeChange(next: number) {
    setCurrentIndex(next);
  }

  //轮播图切换
  function handleClickPrev() {
    bannerRef.current?.prev()
  }

  function handleClickNext() {
    bannerRef.current?.next()
  }

  //获取背景
  let bgImageUrl = banners[currentIndex]?.imageUrl
  if (bgImageUrl) {
    bgImageUrl = bgImageUrl + '?imageView&blur=40x20'
  }

  return (
    <BannerWrapper
      style={{
        background: `url('${bgImageUrl}') center center / 6000px`
      }}
    >
      <div className="banner wrap-v2">
        <BannerLeft>
          <Carousel autoplay effect="fade" ref={bannerRef} beforeChange={(_, next) => handleBeforeChange(next)} autoplaySpeed={5000}>
            {banners.map(item => {
              return (
                <div className="banner-item" key={item.imageUrl}>
                  <img className="image" src={item.imageUrl} alt={item.typeTitle}/>
                </div>
              )
            })}
          </Carousel>
        </BannerLeft>
        <BannerRight></BannerRight>
        <BannerControl>
          <button className="btn left" onClick={handleClickPrev}></button>
          <button className="btn right" onClick={handleClickNext}></button>
        </BannerControl>
      </div>
    </BannerWrapper>
  )
}

export default memo(TopBanner)