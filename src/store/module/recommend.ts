import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import {getBanners, getHotRecommend, getNewAlbum, getPlaylistDetail} from '@/api/modules/recommend'

export const fetchBannerDataAction = createAsyncThunk(
  'banners', async (arg, {dispatch}) => {
    const res = await getBanners()
    dispatch(changeBannersAction(res.banners))
  })

export const fetchHotRecommendDataAction = createAsyncThunk(
  'hotRecommend', async (arg, {dispatch}) => {
    const res = await getHotRecommend(8)
    dispatch(changeHotRecommendAction(res.result))
  }
)

export const fetchNewAlbumDataAction = createAsyncThunk(
  'newAlbum', async (arg, {dispatch}) => {
    const res = await getNewAlbum()
    dispatch(changeNewAlbumAction(res.albums))
  }
)

const rankingIds = [19723756, 3779629, 2884035]
export const fetchRankingDataAction = createAsyncThunk(
  'RankingData',
  async (arg, {dispatch}) => {
    const promises: Promise<any>[] = []
    for (const id of rankingIds) {
      promises.push(getPlaylistDetail(id))
    }

    Promise.all(promises).then(res => {
      const playlists = res.filter(item => item.playlist)
        .map((item) => item.playlist)
      dispatch(changeRankingsAction(playlists))
    })
  }
)

interface IRecommendState {
  banners: any[],
  hotRecommend: any[]
  newAlbum: any[]
  playlists: any[]
}

const initialState: IRecommendState = {
  banners: [],
  hotRecommend: [],
  newAlbum: [],
  playlists: []
}

const recommendSlice = createSlice({
  name: "recommend",
  initialState,
  reducers: {
    changeBannersAction(state, {payload}) {
      state.banners = payload
    },
    changeHotRecommendAction(state, {payload}) {
      state.hotRecommend = payload
    },
    changeNewAlbumAction(state, {payload}) {
      state.newAlbum = payload
    },
    changeRankingsAction(state, {payload}) {
      state.playlists = payload
    }
  }
})

export const {
  changeBannersAction,
  changeHotRecommendAction,
  changeNewAlbumAction,
  changeRankingsAction
} = recommendSlice.actions
export default recommendSlice.reducer;