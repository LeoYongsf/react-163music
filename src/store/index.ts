import {configureStore} from "@reduxjs/toolkit";
import recommendReducer from "./module/recommend";
import playerReducer from "./module/player";
import {
  shallowEqual,
  TypedUseSelectorHook,
  useDispatch,
  useSelector
} from 'react-redux'

const store = configureStore(
  {
    reducer: {
      recommend: recommendReducer,
      player: playerReducer
    }
  }
);

export type IRootState = ReturnType<typeof store.getState>;
type DispatchType = typeof store.dispatch;

export const useAppSelector: TypedUseSelectorHook<IRootState> = useSelector;
export const useAppDispatch: () => DispatchType = useDispatch;
export const appShallowEqual = shallowEqual;

export default store;