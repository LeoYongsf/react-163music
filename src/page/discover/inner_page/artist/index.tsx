import {FC, memo, ReactNode} from "react";

interface IProps {
    children?: ReactNode
}

const Artist: FC<IProps> = ()=> {
    return (
        <div>This is Artist</div>
    )
}

export default memo(Artist)