import {FC, memo, ReactNode} from "react";
import {FooterWrapper} from "@/components/app_footer/style";

interface IProps {
  children?: ReactNode
}

const AppFooter: FC<IProps> = () => {
  return (
    <FooterWrapper>This is Footer</FooterWrapper>
  )
}

export default memo(AppFooter)