import { defineStore } from 'pinia';
import { getToplist,getTopDetail,getPlaylist} from '../../service/official';

export const useTopListStore = defineStore('topList', {
  state: () => ({
    topList: [],
    topDetail:[],
    playlist:[]
  }),
  getters: {
    getTopList: (state) => state.topList,
    getTopDetail:(state) => state.topDetail,
    getPlaylist:(state) => state.playlist
  },
  actions: {
    //排行榜
    async fetchToplist() {
      try {
        // 使用从 service 引入的 getToplist 方法
        const response = await getToplist();
        this.topList = response.data.list;
      } catch (error) {
        console.error('获取排行榜失败:', error);
      }
    },
    //榜单内容摘要
    async fetchTopDetail() {
      try {
        const response = await getTopDetail();
        this.topDetail = response.data.list;
      } catch (error) {
        console.error('获取排行榜失败:', error);
      }
    },
    //歌曲详情
    async fetchPlaylist(id) {
      try {
        const response = await getPlaylist(id);
        this.playlist = response.data.playlist; // 假设返回的数据结构包含一个 playlist 对象
      } catch (error) {
        console.error('获取播放列表失败:', error);
      }
    },
  },
});
