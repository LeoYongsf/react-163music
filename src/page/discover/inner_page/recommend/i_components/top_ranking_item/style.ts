import styled from "styled-components";

export const RankingItemWrapper = styled.div`
  width: 230px;

  &:last-child {
    width: 228px;
  }

  .header {
    height: 100px;
    display: flex;
    margin: 20px 0 0 20px;

    > .name {
      font-weight: bold;
      color: black;
    }

    .image {
      width: 80px;
      height: 80px;
      position: relative;

      img {
        width: 80px;
        height: 80px;
      }
    }

    .info {
      margin: 5px 0 0 10px;

      a {
        font-size: 14px;
        color: #333;
        font-weight: 700;
      }

      .btn1 {
        display: inline-block;
        text-indent: -9999px;
        width: 22px;
        height: 22px;
        margin: 8px 10px 0 0;
        cursor: pointer;
      }

      .play {
        background-position: -267px -205px;

        &:hover {
          background-position: -267px -235px;
        }
      }

      .favor {
        background-position: -300px -205px;

        &:hover {
          background-position: -300px -235px;
        }
      }
    }
  }

  .list {
    .item {
      position: relative;
      display: flex;
      align-items: center;
      height: 32px;

      &:nth-child(-n + 3) .index {
        color: indianred;
      }

      .index {
        width: 35px;
        text-align: center;
        margin-left: 10px;
        font-size: 16px;
      }

      .info {
        color: #000;
        width: 170px;
        height: 17px;
        display: flex;
        line-height: 17px;
        justify-content: space-between;

        .name {
          flex: 1;
          white-space: nowrap;
          text-overflow: ellipsis;
          overflow: hidden;
          cursor: pointer;

          &:hover {
            text-decoration: underline;
          }
        }

        .operator {
          align-items: center;
          display: none;
          width: 82px;

          .btn2 {
            width: 17px;
            height: 17px;
            margin-right: 8px;
            cursor: pointer;
          }

          .play {
            background-position: -267px -268px;
          }

          .add {
            position: relative;
            top: 2px;
            background-position: 0 -700px;
          }

          .favor {
            background-position: -297px -268px;
          }
        }
      }

      &:hover {
        .operator {
          display: block;
        }
      }
    }
  }

  .footer {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    height: 32px;
    padding-right: 20px;
  }
`