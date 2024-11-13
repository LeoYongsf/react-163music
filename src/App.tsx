import React, {Suspense, useEffect} from 'react';
import {useRoutes} from "react-router-dom";
import {router} from "@/router";
import AppHeader from "src/components/app_header";
import AppFooter from "src/components/app_footer";
import AppPlayBar from '@/page/player/app_play_bar'
import {useAppDispatch} from '@/store'
import { fetchCurrentSong } from './store/module/player';
function App() {
  const dispatch = useAppDispatch()
  useEffect(()=>{
    dispatch(fetchCurrentSong(2637558926))
  },[])

  return (
    <div className="App">
      <AppHeader/>
      <Suspense fallback="loading..">
        {useRoutes(router)}
      </Suspense>
      <AppFooter/>
      {/*播放栏*/}
      <AppPlayBar/>
    </div>
  );
}

export default App;
