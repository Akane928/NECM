<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { useTopListStore } from '@/store/modules/official';

// 仓库使用
const officialStore = useTopListStore();

// 榜单数据
const listRecom = ref<string[]>([]);
const MainRecom = ref<object[]>([]);
const playRecom = ref<object[]>([]);
const arr1 = ref<object[]>([]);
const arr2 = ref<object[]>([]);
const arr3 = ref<object[]>([]);
const arr4 = ref<object[]>([]);
const arr5 = ref<object[]>([]);
//导航菜单
const navTabs = ref([
  { name: '排行榜', id: 1 },
  { name: '直播', id: 2 },
  { name: '助眠', id: 3 },
  { name: '说唱', id: 4 },
  { name: '欧美', id: 5 },
  { name: '电音', id: 6 },
  { name: '国风', id: 7 },
  { name: '古典', id: 8 },
]);

// 请求数据
const topList = computed(() => officialStore.getTopList);
const topDetail = computed(() => officialStore.getTopDetail);
const playlist = computed(() => officialStore.getPlaylist);

//获取数据
const fetchData = async () => {
  //排行榜
  await officialStore.fetchToplist();
    for(let i of topList.value){
      if(i.id =='7785066739' || i.id =='9651277674' || i.id =='5059661515'){
        listRecom.value.push(i.coverImgUrl)
      }
  }
  //排行榜详情
  await officialStore.fetchTopDetail();
  const arr = [19723756, 3779629, 3778678, 2884035, 5338990334, 6886768100, 71385702, 3001890046];
  MainRecom.value = topDetail.value.filter((i: any) => arr.includes(i.id));

  for (const id of arr) {
    await officialStore.fetchPlaylist(id);
    playRecom.value.push(officialStore.getPlaylist);
  }
  MainRecom.value.forEach((item: any) => {
    playRecom.value.forEach((playlist: any) => {
      if (item.id === playlist.id) {
        playlist.updateFrequency = item.updateFrequency;
      }
    });
  });
  //精选榜1 曲风榜2 全球榜3 语种榜4 特色榜5
  const list1 = [7325478166, 2884035, 7785123708, 7775163417, 6723173524, 8532443277];
  const list2 = [1978921795, 991319590, 71385702, 5059633707, 5059661515, 71384707, 6886768100];
  const list3 = [60198, 180106, 60131, 27135204, 6939992364, 3812895];
  const list4 = [2809513713, 2809577409, 5059644681, 745956260, 6732051320, 7095271308, 6732014811];
  const list5 = [7603212484, 7356827205, 6688069460, 5338990334, 21845217];

  const findMatches = (list: number[], targetArray: any) => {
    targetArray.value = topDetail.value.filter((item: any) => list.includes(item.id));
  };

  findMatches(list1, arr1);
  findMatches(list2, arr2);
  findMatches(list3, arr3);
  findMatches(list4, arr4);
  findMatches(list5, arr5);
};

onMounted(fetchData,console.log(listRecom.value));
</script>

<template>
  <div class="official__">
    <!-- 顶部 -->
    <div class="topper">
      <!-- 顶部 -->
      <header>
        <van-icon name="arrow-left" />
        <span>排行榜</span>
      </header>
      <!-- 顶部滑动导航 -->
      <nav>
        <van-tabs background="none" color="red" line-height="2.5vw">
          <van-tab v-for="item in navTabs" :key="item.id" :title="item.name" />
        </van-tabs>
      </nav>
    </div>
    <!-- 主体 -->
    <section>
      <!-- 榜单推荐  -->
      <div class="list_recommen">
        <span>榜单推荐</span>
        <div class="lr_inner">
          <div class="lr_box" v-for="item in listRecom" :key="item">
            <img :src="item" alt="" />
            <van-icon name="play" />
          </div>
        </div>
      </div>
      <!-- 官方榜 -->
      <div class="official_">
        <div class="official_title">
          <img src="../assets/logo.webp" alt="" />
          官方榜
        </div>
        <div class="official_box">
          <div class="ob_cell" v-for="item in playRecom" :key="item.id">
            <div class="obc_title">
              <span>{{ item.name }}</span>
              <span>{{ item.updateFrequency }}</span>
            </div>
            <div class="obc_conent">
              <div class="obcc_img">
                <img v-for="(track, index) in item.tracks.slice(0, 3)" :key="index" :src="track.al.picUrl" alt="" />
              </div>
              <div class="obc_play_icon">
                <van-icon name="play" />
              </div>
              <div class="obcc_number_box">
                <div class="obcc_number" v-for="(i, index) in item.tracks.slice(0, 3)" :key="i.id">
                  <span>{{ index + 1 }}</span>
                  <div class="obcc_song">
                    <span class="song_name">{{ i.al.name }}</span>
                    <span class="song_break">-</span>
                    <span class="song_autho" v-for="a in i.ar" :key="a.id">{{ a.name }}</span>
                  </div>
                  <span class="song_icon">新</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <!-- 格子榜单 -->
    <div class="special_cont">
      <!-- 精选榜单 -->
      <div class="list_1">
        <div class="list_title">精选榜</div>
        <div class="list_box">
          <img v-for="item in arr1" :key="item.id" :src="item.coverImgUrl" alt="" />
        </div>
      </div>
      <!-- 曲风榜 -->
      <div class="list_1">
        <div class="list_title">曲风榜</div>
        <div class="list_box">
          <img v-for="item in arr2" :key="item.id" :src="item.coverImgUrl" alt="" />
        </div>
      </div>
      <!-- 全球榜 -->
      <div class="list_1">
        <div class="list_title">全球榜</div>
        <div class="list_box">
          <img v-for="item in arr3" :key="item.id" :src="item.coverImgUrl" alt="" />
        </div>
      </div>
      <!-- 语种榜 -->
      <div class="list_1">
        <div class="list_title">语种榜</div>
        <div class="list_box">
          <img v-for="item in arr4" :key="item.id" :src="item.coverImgUrl" alt="" />
        </div>
      </div>
      <!-- 特色榜 -->
      <div class="list_1">
        <div class="list_title">特色榜</div>
        <div class="list_box">
          <img v-for="item in arr5" :key="item.id" :src="item.coverImgUrl" alt="" />
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
.official__{
  background-color: rgb(240, 247, 252);
}
.topper{
  position: fixed;
  z-index: 999;
  height: 27vw;
  background-color:  rgb(240, 247, 252);
  /* 顶部 */
  header{
    width: 100%;
    height: 15vw;
    font-size: 5vw;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    i{
      font-size: 7vw;
      position: absolute;
      left:5vw;
    }
  }
}
/* 主体 */
  /* 榜单推荐 */
.list_recommen{
  width: 100%;
  height: 40vw;
  padding: 30vw 0vw 4vw 0vw;
  span{
    padding: 3vw 4vw;
    font-size: 5vw;
  }
  .lr_inner{
    margin-top: 2vw;
    display: flex;
    justify-content: space-around;
    .lr_box{
      width: 26vw;
      height: 26vw;
      border-radius: 3vw;
      background-color: #fff;
      position: relative;
      overflow: hidden;
      img{
        width: 100%;
      }
      i{
        font-size: 7vw;
        color: #fff;
        position: absolute;
        bottom: 1vw;
        right: 1vw;
      }
    }
  }
  
}
/* 官方榜 */  
  /* 飙升榜 */
.official_{
  padding: 3vw 4vw;
  /* 飙升榜标题 */
  .official_title{
    display: flex;
    justify-items: center;
    align-items: center;
    font-size: 5vw;
    img{
      width: 8vw;
    }
  }
  /* 飙升榜内部cell */
  .ob_cell{
    width: 100%;
    height: 33vw;
    border-radius: 4vw;
    padding: 2vw 4vw;
    box-sizing: border-box;
    background-color:#fff;
    margin-bottom: 2vw;
    /* 标题 */
    .obc_title{
      display: flex;
      justify-content: space-between;
      align-items: center;

      span:first-child{
        font-size:5vw;
      }
      span:last-child{
        color: #a8a8a8;
        font-size: 3vw;
      }
    }
    /* 内容 */
    .obc_conent{
      margin-top: 2vw;
      display: flex;
      justify-content: space-between;
      position: relative;
      .obc_play_icon{
        position: absolute;
        z-index: 88;
        left: 4vw;
        top: 3vw;
        i{
          font-size: 10vw;
          color: #fff;
          cursor: pointer;
        }
      }
      .obcc_img{
        width:20vw;
        height: 16vw;
        position: relative;
        radio_icon{
          font-size: 12px;
          position: absolute;
        }
        img{
          position: absolute;
          border-radius: 3vw;
        }
        img:first-child{
          width: 18vw;
          z-index: 3;
        }
        img:nth-child(2){
          width: 15vw;
          z-index: 2;
          left:5vw;
          bottom: -2vw;
          opacity: 0.5;
        }
        img:last-child{
          width: 11vw;
          z-index: 1;
          left:11vw;
          bottom: -2vw;
          opacity: 0.3;
        }
      }
      .obcc_number_box{
        display: flex;
        flex-direction: column;
        .obcc_number{
        display: flex;
        align-items: center;

        span:first-child{
          font-weight: bold;
          margin-left: 2vw;
        }
        .song_name{
          font-size: 3.3vw;
          font-weight: normal !important;
        }
        .obcc_song{
          width: 50vw;
          padding: 0.8vw 0vw;
          font-weight: normal;
          font-size: 3.5vw;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;

          .song_break{
            margin: 1vw;
          }
          .song_autho{
            width: 10vw;
            color: #a8a8a8;
            
          }
        }
        .song_icon{
          font-size: 3vw;
          color: rgb(0, 214, 4);
        }
      }
      }
    }
  }
}  
/* 底部 */
.special_cont{
  margin-top: 10vw;
  padding: 3vw 5vw;
  .list_title{
    font-size: 5vw;
    margin-bottom: 3vw;
  }
  .list_box{
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    img{
      width: 28vw;
      margin-bottom: 3vw;
      border-radius: 3vw;
    }
  }
}
</style>
