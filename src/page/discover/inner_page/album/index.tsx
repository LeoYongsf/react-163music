import {FC, memo, ReactNode} from "react";

interface IProps {
    children?: ReactNode
}

const Album: FC<IProps> = ()=> {
    return (
        <div>This is Album</div>
    )
}

export default memo(Album)