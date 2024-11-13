import {FC, memo, ReactNode} from "react";

interface IProps {
  children?: ReactNode
}

const Local: FC<IProps> = () => {
  return (
    <div>This is Download</div>
  )
}

export default memo(Local)