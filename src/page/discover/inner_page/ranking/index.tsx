import {FC, memo, ReactNode} from "react";

interface IProps {
    children?: ReactNode
}

const Ranking: FC<IProps> = ()=> {
    return (
        <div>This is Ranking</div>
    )
}

export default memo(Ranking)