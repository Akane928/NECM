import http from "./http";

//获取榜单
export const getToplist = () => {
    return http.get('/toplist')
}
//榜单内容摘要
export const getTopDetail = () => {
    return http.get('/toplist/detail')
}
//歌单详情 /playlist/detail?id=24381616
export const getPlaylist = (id) => {
    return http.get(`/playlist/detail?id=${id}`);
  };