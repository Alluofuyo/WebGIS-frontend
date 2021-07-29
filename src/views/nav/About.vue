<template>
  <div id="infoContainer">
    <li>
      <ol>1.点击主页的右上角分享,可以添加分享信息</ol>
      <ol>2.左边的分享栏可以查看分享</ol>
      <ol>3.左边的分享栏可以搜索</ol>
      <ol>4.token信息本地持久化,因此下次进来,不用重新登录,除非注销登录</ol>
    </li>
  </div>
</template>

<script>
import {mapState, mapMutations} from 'vuex'

export default {
  name:"About"
};
</script>

<style>



#infoContainer {
  width: 100%;
  height: 100%;
  background: rgb(247, 243, 243);
  display: flex;
  text-align: center;
}


</style>
