import {FC, memo, ReactNode} from 'react'

interface IProps {
  children?: ReactNode
}

const Player: FC<IProps> = () => {
  return (
    <div>This is Player</div>
  )
}

export default memo(Player)