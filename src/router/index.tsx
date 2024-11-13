import {Navigate, RouteObject} from "react-router-dom";
import {lazy} from "react";

const Artist = lazy(() => import("@/page/discover/inner_page/artist"));
const Recommend = lazy(() => import("@/page/discover/inner_page/recommend"));
const Djradio = lazy(() => import("@/page/discover/inner_page/djradio"));
const Album = lazy(() => import("src/page/discover/inner_page/album"));
const Ranking = lazy(() => import("@/page/discover/inner_page/ranking"));
const Songs = lazy(() => import("@/page/discover/inner_page/songs"));
const Discover = lazy(() => import("@/page/discover"));
const Mine = lazy(() => import("@/page/mine"));
const Local = lazy(() => import("src/page/local"));

const router: RouteObject[] = [
  {
    path: '/',
    element: <Navigate to="/discover"/>
  },
  {
    path: '/discover',
    element: <Discover/>,
    children: [
      {
        path: '/discover',
        element: <Navigate to="/discover/recommend"/>,
      },
      {
        path: '/discover/artist',
        element: <Artist/>,
      },
      {
        path: '/discover/recommend',
        element: <Recommend/>,
      },
      {
        path: '/discover/djradio',
        element: <Djradio/>,
      },
      {
        path: '/discover/album',
        element: <Album/>,
      },
      {
        path: '/discover/ranking',
        element: <Ranking/>,
      },
      {
        path: '/discover/songs',
        element: <Songs/>,
      }
    ]
  },
  {
    path: '/mine',
    element: <Mine/>
  },
  {
    path: '/local',
    element: <Local/>
  }
];

export {router};