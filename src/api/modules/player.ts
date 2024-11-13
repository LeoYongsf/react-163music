import Request from '@/api'

export function getSongDetails(ids: number){
  return Request.get({
    url:'/song/detail',
    params:{
      ids
    }
  })
}

export function getSongLyric(id: number) {
  return Request.get({
    url:'/lyric',
    params: {
      id
    }
  })
}