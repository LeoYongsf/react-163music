import styled from "styled-components";

export const RecommendWrapper = styled.div`
  > .content {
    border: 1px solid #d3d3d3;
    display: flex;
    background-color: #fff;
    //background-image: url(${require('@/assets/img/wrap-bg.png')});

    > .left {
      padding: 20px;
      width: 730px;
      border-right: solid #ccc;
    }

    > .right {
      margin-left: 1px;
      width: 250px;
    }
  }
`