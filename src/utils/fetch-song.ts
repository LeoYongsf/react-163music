import {getSongDetails} from '@/api/modules/player'

export function fetchSongInfo(songId: number) {
    return getSongDetails(songId).then((res) => {
      if (!res.songs.length) {
        throw new Error('Song not found')
      }
      return res.songs[0]
    }) // 返回歌曲数据
}