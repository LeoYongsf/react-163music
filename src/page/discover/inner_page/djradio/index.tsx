import {FC, memo, ReactNode} from "react";

interface IProps {
    children?: ReactNode
}

const Djradio: FC<IProps> = ()=> {
    return (
        <div>This is Djradio</div>
    )
}

export default memo(Djradio)