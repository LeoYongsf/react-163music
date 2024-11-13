import {FC, memo, ReactNode} from "react";

interface IProps {
    children?: ReactNode
}

const Songs: FC<IProps> = ()=> {
    return (
        <div>This is Songs</div>
    )
}

export default memo(Songs)