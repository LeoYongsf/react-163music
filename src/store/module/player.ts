import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import {getSongLyric} from '@/api/modules/player'
import {ILyric, parseLyric} from '@/utils/parse-lyric'
import {IRootState} from '@/store'
import {fetchSongInfo} from '@/utils/fetch-song'


interface IState {
  state: IRootState
}

export const fetchCurrentSong = createAsyncThunk<void, number, IState>(
  'currentSong',
  async (id, {dispatch, getState}) => {
    //查看歌曲是否存在于播放列表
    const playSongList = getState().player.playSongList
    const findIndex = playSongList.findIndex((item) => item.id === id)

    return fetchSongInfo(id).then((song) => {
      if (findIndex === -1) {
        // 传递歌曲参数
        const newPlayList = [...playSongList]
        newPlayList.push(song)
        dispatch(changeCurrentSongAction(song))
        dispatch(changeSongListAction(newPlayList))
        dispatch(changeSongIndexAction(newPlayList.length - 1))
      } else {
        //歌曲已在播放列表中
        song = playSongList[findIndex]
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
  }
)

//添加播放列表
export const fetchAndAddSongToPlaylist = createAsyncThunk<void, number, IState>(
  'fetchAndAddSongToPlaylist',
  (id, { dispatch, getState }) => {
    const playSongList = getState().player.playSongList;
    const isSongInPlaylist = playSongList.some((song) => song.id === id);
    if (isSongInPlaylist) return;

    return fetchSongInfo(id).then((song) => {
      const newPlaylist = [...playSongList, song];
      dispatch(changeSongListAction(newPlaylist));  // 更新播放列表
    }).catch((error) => {
      console.error(error);
    });
  }
);
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
      "name": "七月七日晴",
      "id": 2639816894,
      "pst": 0,
      "t": 0,
      "ar": [
        {
          "id": 12213291,
          "name": "张叶蕾",
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
        "id": 251785770,
        "name": "七月七日晴",
        "picUrl": "https://p2.music.126.net/bDJX_fBqjHbc7iofWaqGyQ==/109951170072052546.jpg",
        "tns": [],
        "pic_str": "109951170072052546",
        "pic": 109951170072052540
      },
      "dt": 181791,
      "h": {
        "br": 320000,
        "fid": 0,
        "size": 7273965,
        "vd": -19513,
        "sr": 48000
      },
      "m": {
        "br": 192000,
        "fid": 0,
        "size": 4364397,
        "vd": -16901,
        "sr": 48000
      },
      "l": {
        "br": 128000,
        "fid": 0,
        "size": 2909613,
        "vd": -15218,
        "sr": 48000
      },
      "sq": {
        "br": 875388,
        "fid": 0,
        "size": 19892231,
        "vd": -19501,
        "sr": 48000
      },
      "hr": {
        "br": 1638392,
        "fid": 0,
        "size": 37230626,
        "vd": -19527,
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
      "originCoverType": 2,
      "originSongSimpleData": {
        "songId": 307780,
        "name": "七月七日晴",
        "artists": [
          {
            "id": 9950,
            "name": "许慧欣"
          }
        ],
        "albumMeta": {
          "id": 30564,
          "name": "万中选一"
        }
      },
      "tagPicList": null,
      "resourceState": true,
      "version": 5,
      "songJumpInfo": null,
      "entertainmentTags": null,
      "awardTags": null,
      "single": 0,
      "noCopyrightRcmd": null,
      "mv": 0,
      "rtype": 0,
      "rurl": null,
      "mst": 9,
      "cp": 0,
      "publishTime": 0
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