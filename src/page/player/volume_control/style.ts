import styled from "styled-components";

export const VlmControlWrapper = styled.div`
  position: absolute;
  top: -113px;
  left: 9px;
  clear: both;
  width: 32px;
  height: 113px;

  .container {
    position: absolute;
    top: -12px;
    left: 74px;
    width: 32px;
    height: 113px;
    background-position: 0 -503px;

    .vlm-slider {
      position: absolute;
      top: 5px;
      width: 4px;
      left: 14px;
      height: 100px;
      background-color: black;

      .track {
        position: absolute;
        width: 100%;
        background-color: #C20C0C;
        border-radius: 4px 4px 0 0;
        bottom: 0;
      }

      .thumb {
        position: absolute;
        left: -7px;
        width: 16px;
        height: 16px;
        background-position: -40px -250px;
        border-radius: 50%;
        cursor: pointer;
        transform: translateY(50%);
      }
    }
  }
`