import styled from 'styled-components'

export const ArtistWrapper = styled.div`
  padding: 20px 10px;

  .artists {
    .item {
      display: flex;
      height: 62px;
      margin-top: 14px;
      background-color: #fafafa;
      text-decoration: none;

      :hover {
        background-color: #f4f4f4;
      }

      img {
        width: 62px;
        height: 62px;
        object-fit: cover;
      }

      .art-info {
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        padding: 3px 12px;
        border-left: none;
        overflow: hidden;

        .name {
          color: #333;
          font-size: 14px;
          font-weight: 700;
        }

        .alias {
          font-size: 12px;
          color: #666;
          white-space: nowrap;
          text-overflow: ellipsis;
          overflow: hidden;
        }
      }
    }
  }

  .apply {
    width: 100%;
    margin-top: 12px;
    color: #333;
    font-weight: 700;
    align-items: center;
    display: block;
    height: 31px;
    line-height: 31px;
    text-decoration: none;
    background-color: #fafafa;
    border: 1px solid #c3c3c3;
    border-radius: 4px;
    align-content: center;
    justify-content: space-between;
    cursor: pointer;
  }
`