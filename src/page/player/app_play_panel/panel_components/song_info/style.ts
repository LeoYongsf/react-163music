import styled from 'styled-components'

export const LyricWrapper = styled.div<{ref: any}>`
  position: relative;
  flex: 1;
  margin: 21px 0 20px 0;
  overflow: scroll;

  &::-webkit-scrollbar {
    display: none;
  }

  .lyric-content {
    .lyric-item {
      height: 32px;
      text-align: center;
      color: #989898;

      &.active {
        color: #fff;
        font-size: 14px;
      }
    }
  }
`