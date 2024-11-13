import {FC, memo, ReactNode} from "react";

interface IProps {
  children?: ReactNode
}

const Mine: FC<IProps> = () => {
  return (
    <div>This is Mine</div>
  )
}

export default memo(Mine)