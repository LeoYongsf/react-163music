import {FC, memo, ReactNode} from "react";
import {NavWrapper} from "./style";
import discoverMenu from '@/assets/data/discover-menu.json';
import {NavLink} from 'react-router-dom'

interface IProps {
  children?: ReactNode
}

const NavBar: FC<IProps> = () => {
  return (
      <NavWrapper>
        <div className="nav wrap-v1">
        {
          discoverMenu.map((item) => {
            return (
              <div className="item" key={item.link}>
                <NavLink to={item.link}>{item.title}</NavLink>
              </div>
            )
          })
        }
        </div>
      </NavWrapper>
  )
}

export default memo(NavBar)