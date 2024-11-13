import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import {getSongDetails, getSongLyric} from '@/api/modules/player'
import {ILyric, parseLyric} from '@/utils/parse-lyric'
import {IRootState} from '@/store'


interface IState {
  state: IRootState
}

export const fetchCurrentSong = createAsyncThunk<void, number, IState>(
  'currentSong',
  (id, {dispatch, getState}) => {
    //查看歌曲是否存在于播放列表
    const playSongList = getState().player.playSongList
    const findIndex = playSongList.findIndex((item) => item.id === id)
    if (findIndex === -1) {
      getSongDetails(id).then((res) => {
        // 获取歌曲信息
        if (!res.songs.length) return
        const song = res.songs[0]
        console.log(res)
        // 传递歌曲参数
        const newPlayList = [...playSongList]
        newPlayList.push(song)
        dispatch(changeCurrentSongAction(song))
        dispatch(changeSongListAction(newPlayList))
        dispatch(changeSongIndexAction(newPlayList.length - 1))
      })
    } else {//歌曲已在播放列表中
      const song = playSongList[findIndex]
      dispatch(changeCurrentSongAction(song))
      dispatch(changeSongIndexAction(findIndex))
    }


    getSongLyric(id).then((res) => {
      //获取歌词数据
      const lyricString = res.lrc.lyric
      //歌词转换为对象数组
      const lyrics = parseLyric(lyricString)

      dispatch(changeLyricAction(lyrics))
    })
  })

export const changeMusicAction = createAsyncThunk<void, boolean, IState>(
  'changemusic',
  (isNext, {dispatch, getState}) => {
    //获取播放模式
    const player = getState().player
    const playMode = player.playMode
    const songIndex = player.playSongIndex
    const songList = player.playSongList
    //根据不同模式计算下一首歌曲索引
    let newIndex = songIndex
    if (playMode === 1) {
      newIndex = Math.floor(Math.random() * songList.length)
    } else {
      newIndex = isNext ? songIndex + 1 : songIndex - 1
      if (newIndex > songList.length - 1) {
        newIndex = 0
      }
      if (newIndex < 0) {
        newIndex = songList.length - 1
      }
    }
    const song = songList[newIndex]
    dispatch(changeCurrentSongAction(song))
    dispatch(changeSongIndexAction(newIndex))

    getSongLyric(song.id).then((res) => {
      //获取歌词数据
      const lyricString = res.lrc.lyric
      //歌词转换为对象数组
      const lyrics = parseLyric(lyricString)

      dispatch(changeLyricAction(lyrics))
    })
  })

interface IPlayerState {
  currentSong: any
  lyrics: ILyric[]
  lyricIndex: number
  playSongList: any[]
  playSongIndex: number

  playMode: number
}

const initialState: IPlayerState = {
  currentSong: {},
  lyrics: [],
  lyricIndex: -1,
  playSongList: [
    {
      "name": "APT.",
      "id": 2637558926,
      "pst": 0,
      "t": 0,
      "ar": [
        {
          "id": 12062255,
          "name": "ROSÉ",
          "tns": [],
          "alias": []
        },
        {
          "id": 178059,
          "name": "Bruno Mars",
          "tns": [],
          "alias": []
        }
      ],
      "alia": [],
      "pop": 100,
      "st": 0,
      "rt": "",
      "fee": 8,
      "v": 5,
      "crbt": null,
      "cf": "",
      "al": {
        "id": 251077657,
        "name": "APT.",
        "picUrl": "https://p2.music.126.net/t47xJ6AwOv9qOQ51PZoiPw==/109951170052324935.jpg",
        "tns": [],
        "pic_str": "109951170052324935",
        "pic": 109951170052324930
      },
      "dt": 169917,
      "h": {
        "br": 320000,
        "fid": 0,
        "size": 6799195,
        "vd": -65636,
        "sr": 44100
      },
      "m": {
        "br": 192000,
        "fid": 0,
        "size": 4079534,
        "vd": -63148,
        "sr": 44100
      },
      "l": {
        "br": 128000,
        "fid": 0,
        "size": 2719704,
        "vd": -61704,
        "sr": 44100
      },
      "sq": {
        "br": 1729587,
        "fid": 0,
        "size": 36735859,
        "vd": -65650,
        "sr": 44100
      },
      "hr": null,
      "a": null,
      "cd": "01",
      "no": 1,
      "rtUrl": null,
      "ftype": 0,
      "rtUrls": [],
      "djId": 0,
      "copyright": 1,
      "s_id": 0,
      "mark": 17180139520,
      "originCoverType": 1,
      "originSongSimpleData": null,
      "tagPicList": null,
      "resourceState": true,
      "version": 5,
      "songJumpInfo": null,
      "entertainmentTags": null,
      "awardTags": null,
      "single": 0,
      "noCopyrightRcmd": null,
      "mst": 9,
      "cp": 7002,
      "rtype": 0,
      "rurl": null,
      "mv": 22633026,
      "publishTime": 1729180800000
    },
    {
      "name": "壁上观",
      "id": 2638631898,
      "pst": 0,
      "t": 0,
      "ar": [
        {
          "id": 1032298,
          "name": "鞠婧祎",
          "tns": [],
          "alias": []
        }
      ],
      "alia": [],
      "pop": 100,
      "st": 0,
      "rt": "",
      "fee": 8,
      "v": 4,
      "crbt": null,
      "cf": "",
      "al": {
        "id": 251403463,
        "name": "壁上观",
        "picUrl": "https://p1.music.126.net/_XBgmnrIqqCea_XWWvbiVw==/109951170062515928.jpg",
        "tns": [],
        "pic_str": "109951170062515928",
        "pic": 109951170062515940
      },
      "dt": 221705,
      "h": {
        "br": 320000,
        "fid": 0,
        "size": 8870445,
        "vd": -42282,
        "sr": 48000
      },
      "m": {
        "br": 192000,
        "fid": 0,
        "size": 5322285,
        "vd": -39699,
        "sr": 48000
      },
      "l": {
        "br": 128000,
        "fid": 0,
        "size": 3548205,
        "vd": -38054,
        "sr": 48000
      },
      "sq": {
        "br": 876136,
        "fid": 0,
        "size": 24280534,
        "vd": -42374,
        "sr": 48000
      },
      "hr": {
        "br": 1642765,
        "fid": 0,
        "size": 45526265,
        "vd": -42273,
        "sr": 48000
      },
      "a": null,
      "cd": "01",
      "no": 1,
      "rtUrl": null,
      "ftype": 0,
      "rtUrls": [],
      "djId": 0,
      "copyright": 0,
      "s_id": 0,
      "mark": 17716748288,
      "originCoverType": 0,
      "originSongSimpleData": null,
      "tagPicList": null,
      "resourceState": true,
      "version": 4,
      "songJumpInfo": null,
      "entertainmentTags": null,
      "awardTags": null,
      "single": 0,
      "noCopyrightRcmd": null,
      "mv": 0,
      "rtype": 0,
      "rurl": null,
      "mst": 9,
      "cp": 7001,
      "publishTime": 0
    }
  ],
  playSongIndex: -1,
  //顺序播放0，随机顺序1，单曲循环2
  playMode: 0
}

const playSlice = createSlice({
  name: "play",
  initialState,
  reducers: {
    changeCurrentSongAction(state, {payload}) {
      state.currentSong = payload
    },
    changeLyricAction(state, {payload}) {
      state.lyrics = payload
    },
    changeLyricIndexAction(state, {payload}) {
      state.lyricIndex = payload
    },
    changeSongIndexAction(state, {payload}) {
      state.playSongIndex = payload
    },
    changeSongListAction(state, {payload}) {
      state.playSongList = payload
    },
    changePlayModeAction(state, {payload}) {
      state.playMode = payload
    }
  }
})

export const {
  changeCurrentSongAction,
  changeLyricAction,
  changeLyricIndexAction,
  changeSongIndexAction,
  changeSongListAction,
  changePlayModeAction
} = playSlice.actions
export default playSlice.reducer;