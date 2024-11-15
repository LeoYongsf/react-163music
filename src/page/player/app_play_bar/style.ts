import styled from "styled-components";

export const BarWrapper = styled.div`
  position: fixed;
  z-index: 99;
  left: 0;
  right: 0;
  bottom: 0;
  height: 52px;
  width: 100%;
  background-position: 0 0;
  background-repeat: repeat;

  .content {
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    bottom: 0;
    height: 47px;
  }
`

interface IBarControl {
  isPlaying: boolean;
}
export const BarControl = styled.div<IBarControl>`
  display: flex;
  align-items: center;

  .btn {
    cursor: pointer;
  }

  .prev,
  .next {
    width: 28px;
    height: 28px;
    cursor: pointer;

  }

  .prev {
    background-position: 0 -130px;
    &:hover {
      background-position: -30px -130px;
    }
  }

  .play {
    width: 36px;
    height: 36px;
    margin: 0 8px;
    background-position: 0 ${(props) => (props.isPlaying ? '-165px' : '-204px')};
    &:hover {
      background-position: -40px ${(props) => (props.isPlaying ? '-165px' : '-204px')};
    }
  }

  .next {
    background-position: -80px -130px;
    &:hover {
      background-position: -110px -130px;
    }
  }
`

export const BarPlayInfo = styled.div`
  display: flex;
  width: 642px;
  align-items: center;

  img {
    width: 34px;
    height: 34px;
    border-radius: 5px;
  }
  
  .info {
    flex: 1;
    color: #e1e1e1;
    margin-left: 10px;

    .song {
      color: #fff;
      position: relative;
      top: 8px;
      left: 8px;

      .singer-name {
        color: #e1e1e1;
        margin-left: 10px;
      }
    }

    .process {
      display: flex;
      align-items: center;

      .ant-slider {
        position: relative;
        top: -3px;
        width: 493px;
        margin-right: 10px;

        .ant-slider-rail {
          height: 9px;
          background: url(${require('@/assets/img/progress_bar.png')}) right 0;
        }

        .ant-slider-track {
          height: 9px;
          background: url(${require('@/assets/img/progress_bar.png')}) left -66px;
        }

        .ant-slider-handle {
          width: 22px;
          height: 24px;
          border: none;
          margin-top: -4px;
          background: url(${require('@/assets/img/sprite_icon.png')}) 0 -250px;
          &::after {
            display: none;
          }
        }
      }

      .time {
        .current {
          color: #e1e1e1;
        }

        .divider {
          margin: 0 3px;
        }
      }
    }
  }


`

export const BarOperator = styled.div<{
  playMode: number
}>`
  display: flex;
  position: relative;
  top: 2px;

  .btn {
    width: 25px;
    height: 25px;
    cursor: pointer;
    border-radius: 8px;
    transition: background-color 0.3s;

    &:hover {
      background-color: darkgray;
      border-radius: 8px; /* 悬停时添加阴影 */
    }
  }

  .pip {
    background: url(${require('@/assets/img/huazhonghia.png')}) no-repeat 0 0;
  }

  .favor {
    background-position: -88px -163px;
  }

  .share {
    background-position: -114px -163px;
  }

  .left {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .right {
    display: flex;
    align-items: center;
    width: 126px;
    padding-left: 13px;
    background-position: -143px -238px;

    .volume {
      background-position: -2px -248px;
    }
    
    .loop {
      background-position: ${(props) => {
        switch (props.playMode) {
          case 1:
            return '-66px -248px'
          case 2:
            return '-66px -344px'
          default:
            return '-3px -344px'
        }
      }};
    }

    .playlist {
      padding-left: 18px;
      text-align: center;
      color: #ccc;
      width: 59px;
      background-position: -42px -68px;
    }
  }
`