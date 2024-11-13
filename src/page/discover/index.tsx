import {FC, memo, ReactNode, Suspense} from "react";
import {Outlet} from "react-router-dom";
import NavBar from '@/page/discover/navbar'

interface IProps {
  children?: ReactNode
}

const Discover: FC<IProps> = () => {
  return (
    <div>
      <NavBar/>
      <Suspense fallback="">
        <Outlet/>
      </Suspense>
    </div>
  )
}

export default memo(Discover)