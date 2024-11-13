import Request from '@/api'

export function getBanners() {
  return Request.get({
    url: '/banner'
  })
}

export function getHotRecommend(limit: number = 30) {
  return Request.get({
    url: '/personalized',
    params: {
      limit
    }
  })
}

export function getNewAlbum() {
  return Request.get({
    url: '/album/newest'
  })
}

export function getPlaylistDetail(id: number) {
  return Request.get({
    url: '/playlist/detail',
    params: {
      id
    }
  })
}

export function getArtistList(limit: number = 30) {
  return Request.get({
    url: '/artist/list',
    params: {
      limit
    }
  })
}