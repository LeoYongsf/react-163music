import React from "react";
import {FC, memo, ReactNode} from "react";
import headerTitles from "@/assets/data/header-titles.json";
import {HeaderLeft, HeaderRight, HeaderWrapper} from "@/components/app_header/style";
import {NavLink} from "react-router-dom";
import {Input} from "antd";
import {SearchOutlined} from "@ant-design/icons";

interface IProps {
  children?: ReactNode
}

const AppHeader: FC<IProps> = () => {
  function showItem(item: any) {
    if (item.type === 'path') {
      return <NavLink to={item.link}>
        {item.title}
        <i className="icon sprite_01"></i>
      </NavLink>
    } else {
      return <a href={item.link} target="_blank" rel="noreferrer">
        {item.title}
      </a>;
    }
  }

  return (
    <HeaderWrapper>
      <div className="content wrap-v1">
        <HeaderLeft>
          <a className="logo sprite_01" href="/">
            网易云音乐
          </a>
          <div className="title-list">
            {headerTitles.map((item) => {
              return (
                <div className="item active" key={item.title}>
                  {showItem(item)}
                </div>

              )
            })}
          </div>
        </HeaderLeft>
        <HeaderRight>
          <span>
          <Input
            className="search"
            placeholder="音乐/MV/电台/用户"
            prefix={<SearchOutlined/>}/>
          </span>
          <span className="center">创作者中心</span>
          <span className="login">登录</span>
        </HeaderRight>
      </div>
      <div className="divider"></div>
    </HeaderWrapper>
  )
}

export default memo(AppHeader)