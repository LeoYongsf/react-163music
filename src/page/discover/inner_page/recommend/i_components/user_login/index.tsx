import {FC, memo, ReactNode} from "react";
import {LoginWrapper} from '@/page/discover/inner_page/recommend/i_components/user_login/style'

interface IProps {
  children?: ReactNode
}

const UserLogin: FC<IProps> = ()=> {
  return (
    <LoginWrapper className="sprite_02">
    <p>登录网易云音乐，享受无限乐趣，并且无限同步到手机</p>
      <a className="sprite_02" href="#/login">用户登录</a>
    </LoginWrapper>
  )
}

export default memo(UserLogin)