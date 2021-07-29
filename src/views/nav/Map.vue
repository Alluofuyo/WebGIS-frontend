<template>
  <div ref="share" id="mapContainer">
    <keep-alive>
      <div id="shareContainer" class="basic-shadow">
        <div>
          <span class="shareTitle">分享</span>
          <i class="el-icon-refresh-right refresh" @click="refresh"></i>
        </div>
        <div class="search">
          <el-input v-model="search" placeholder="搜索" size="mini" clearable @keypress.enter="getSearch"></el-input>
        </div>
        <div v-if="sharepoints.length>0" class="cards">
          <div class="shareCard" v-for="p in sharepoints" :key="sharepoints.id">
            <el-card class="box-card">
              <template #header>
                <div class="card-header">
                  <div class="user_header">
                    <el-avatar
                        src="https://www.baidu.com/link?url=NcbIKL8EimmF14kh0TnOiCZagG_OocKsUxSmdzCo-djfqZHMU-aYDpCi5np6iSwC0FmmhnzwcxZvzD_38Ne3WYaz3bmTjBS_y2nUaxk1pH2nfSTPT2-pIMAMX2LI4piZ4Q9Ls2JQZHrS5YZP5ol140hfjLvyPrYbhSV7Eyy4tgJSogwIZF-PjpOjWMk7p-_29_WfH4OYpVM_Wxwjr2sRJAi_GEupkA9b9j8vN0duwgoHu21R2XlGZedpgN2cg_726Zyg_8ApA41W05wF-86MXaWoDa1KSORVrkLbE1d0rBkU0-YT3HDRgebr26IIYbIyTgdUYL_BXY6K-JEyiIRw1TTlNZT2NOHb1euaD8-RbiGJg7tCsvgPTIR_JmhiPS5hXMipc484D5Ivf2TYzdlk9BEAyhvjXjmYHtHUzxg-3d9-9qblIFtkAmaPqIx1YxinMx4J0qMcx42BnGuUQ_uJYhWsRS6xUyoIrm9af_tqppF1SGA2hCj0Utq4hv34xd47shq3vqfCiItOK2o2K6xnpA2hQIyiOKcJaGf6gBGy-1R00eH-Pw38gt1XVOy_C0Qn&wd=&eqid=dd4eb2400000b6540000000560ee4fef"
                        alt="头像"></el-avatar>
                    <span style="display: inline-block;margin-left: 10px;font-size: 18px;">{{ p.nickname }}</span>
                  </div>
                </div>
              </template>
              <div class="content">
                {{ p.content }}
              </div>
              <div class="footer">
                <div class="position">
                  <i class="el-icon-location-information"></i>
                  <span>{{ p.address }}</span>
                </div>
                <a class="read_more" @click="getDetail(p)">查看更多>></a>
              </div>
            </el-card>
          </div>
        </div>
      </div>
    </keep-alive>

    <div class="map_buttons">
      <div class="button_group">
        <el-button size="mini" @click="addPoint">
          <i class="el-icon-add-location"></i>
          分享
        </el-button>
      </div>
    </div>
    <div v-show="editPoint" class="editPanel basic-shadow">
      <el-form label-width="50px">
        <div style="font-weight: bold; font-size: 24px; line-height: 1.2;text-align: center">
          分享
        </div>
        <el-divider></el-divider>
        <el-form-item label="标题:">
          <el-input v-model="sharePoint.title"></el-input>
        </el-form-item>
        <el-form-item label="内容:">
          <el-input v-model="sharePoint.content" type="textarea"></el-input>
        </el-form-item>
        <el-form-item label="坐标:">
          <el-input v-model="position">
            <template #append>
              <el-button @click="selectPosition" icon="el-icon-add-location"></el-button>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item label="标签:">
          <el-tag
              :key="tag"
              v-for="tag in sharePoint.tags"
              closable
              :disable-transitions="false"
              @close="handleClose(tag)">
            {{ tag }}
          </el-tag>
          <el-input
              class="input-new-tag"
              v-if="inputVisible"
              v-model="inputValue"
              ref="saveTagInput"
              size="small"
              @keyup.enter="handleInputConfirm"
              @blur="handleInputConfirm"
          >
          </el-input>
          <el-button v-else class="button-new-tag" size="small" @click="showInput">+</el-button>

        </el-form-item>
        <div style="text-align: right;">
          <el-button @click="addShare" type="primary">添加</el-button>
          <el-button @click="cancelShare">取消</el-button>
        </div>
      </el-form>
    </div>
  </div>

  <el-dialog
      title="详细"
      v-model="detailVisible"
      width="30%"
  >
    <div class="detailHeader">
      <el-avatar src=""></el-avatar>
      {{ currentInfo.nickname }}
    </div>
    <el-divider></el-divider>
    <div class="detailContent">
      {{ currentInfo.content }}
    </div>
    <el-divider></el-divider>
    <div class="detailFooter">
      <div class="positionInfo">{{ currentInfo.address }}</div>
      <div class="timeInfo">{{ new Date(currentInfo.time).toLocaleString() }}</div>
    </div>
    <template #footer>
    <span class="dialog-footer">
      <el-button type="primary" @click="detailVisible = false">确 定</el-button>
    </span>
    </template>
  </el-dialog>

</template>

<script>
import AMapLoader from '@amap/amap-jsapi-loader'
import {mapState} from "vuex";
import ShareCard from "../../components/ShareCard.vue";

export default {
  name: "Map",
  components: [ShareCard],
  data() {
    return {
      search: "",
      editPoint: false,
      detailVisible: false,
      map: null,
      marker: null,
      amap: {},
      sharePoint: {
        position: {
          x: "",
          y: ""
        },
        title: "",
        content: "",
        tags: []
      },
      searchResult: [],
      currentInfo: {},
      inputVisible: false,
      inputValue: "",
      position: "",
      points: [],
      sharepoints: [],
      mass: {}
    }
  },
  computed: {
    ...mapState(["userInfo"])
  },
  methods: {
    getSearch() {
      this.axios.get("/share/search?keyword=" + window.encodeURIComponent(this.search)).then(res => {
        if (res.data.status === 0) {
          this.searchResult = res.data.data.searchResult
          this.$nextTick(() => {
            this.sharepoints = this.searchResult
            let task = setInterval(() => {
              if (this.amap) {
                clearInterval(task)
                this.$nextTick(() => {
                  this.sharepoints.forEach(e => {
                    this.amap.plugin('AMap.Geocoder', function () {
                      let geocoder = new that.amap.Geocoder({
                        city: "长沙市"
                      })
                      let lnglat = [e.position.x, e.position.y]
                      geocoder.getAddress(lnglat, function (status, result) {
                        if (status === "complete" && result.info === "OK") {
                          e["address"] = result.regeocode.formattedAddress
                        }
                      })
                    })
                  })
                })
              }
            }, 100)
          })
        }
      })
    },
    refresh() {

    },
    getDetail(user) {
      this.currentInfo = user
      this.detailVisible = true
    },
    addShare() {
      let data = this.sharePoint;
      data.userid = this.userInfo.id;
      data.time = new Date().toISOString();
      this.axios.post("/share/add", this.sharePoint).then(res => {
        if (res.data.status === 0) {
          this.$message.success("添加成功")
          this.editPoint = false
          this.cancelShare()
        } else {
          this.editPoint = false
          this.$message.error(res.data.msg)
          this.cancelShare()
        }
      }).catch(err => {
        this.editPoint = false
        this.$message.error(err)
        this.cancelShare()
      })
    },
    cancelShare() {
      this.sharePoint = {
        position: {
          x: "",
          y: ""
        },
        title: "",
        content: "",
        tags: []
      }
      this.position = ""
      if (this.marker !== null) {
        this.map.remove(this.marker)
        this.marker = null
      }
      this.inputVisible = false
      this.inputValue = ""
      this.editPoint = false
    },
    updateMarkers: function () {
      this.axios.get("/share/points").then(res => {
        console.log(res)
        if (res.data.status === 0) {
          this.points = []
          res.data.data.points.forEach(v => {
            let m = {
              "lnglat": [v.x, v.y],
              "id": v.id,
            }

            this.points.push(m)
          })
          this.mass = new AMap.MassMarks(this.points, {
            opacity: 0.8,
            zIndex: 111,
            cursor: "pointer",
            style: {
              url: '/src/assets/location.png',
              anchor: new AMap.Pixel(16, 32),
              size: new AMap.Size(32, 32),
              zIndex: 3,
            }
          })
          let that = this
          let task = setInterval(() => {
            if (that.map) {
              clearInterval(task)
              this.mass.setMap(this.map);
              this.mass.on("click", (e) => {
                that.axios.get("/share/points?id=" + e.data.id).then(res => {
                  console.log(res)
                  this.openInfoWindow(res.data.data.point)
                }).catch(err => {
                  console.error(err)
                })
              })
            }
          }, 100)

        }
      }).catch(err => {
        console.error(err)
      })
    },
    addPoint() {
      this.editPoint = !this.editPoint
    },
    openInfoWindow(data) {
      let title = "<span>" + data.title + "</span><br>"
      let content = "<span>" + data.content + "</span>>"
      let infoWindow = new AMap.InfoWindow({
        content: title + content,
        anchor: "middle-left"
      })
      infoWindow.open(this.map, [data.position.x, data.position.y])
    },
    handleClose(tag) {
      this.sharePoint.tags.splice(this.sharePoint.tags.indexOf(tag), 1)
    },
    showInput() {
      this.inputVisible = true;
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },
    handleInputConfirm() {
      let inputValue = this.inputValue;
      if (inputValue) {
        this.sharePoint.tags.push({tag: inputValue})
      }
      this.inputVisible = false;
      this.inputValue = "";
    },
    selectPosition() {
      let that = this
      this.map.setDefaultCursor("url(/src/assets/add.cur) 16 16,auto")
      this.map.on("click", (e) => {
        console.log(e)
        console.log(this)
        console.log(that)
        that.sharePoint.position.x = e.lnglat.getLng()
        that.sharePoint.position.y = e.lnglat.getLat()
        if (that.marker === null) {
          that.marker = new AMap.Marker({
            map: that.map,
            position: e.lnglat,
            draggable: true
          })
          that.marker.on("dragend", (e1) => {
            that.sharePoint.position.x = e1.lnglat.getLng()
            that.sharePoint.position.y = e1.lnglat.getLat()
            that.position = e1.lnglat.getLng() + " , " + e1.lnglat.getLat()
          })
        } else {
          that.marker.setPosition(e.lnglat)
        }

        that.position = e.lnglat.getLng() + " , " + e.lnglat.getLat()
        that.map.setDefaultCursor()
      }, this.map, true)
    },
    updateInfo() {
      let that = this
      this.axios.get("/share/allShare").then(res => {
        if (res.data.status === 0) {
          console.log(res.data)
          let task = setInterval(() => {
            if (this.amap) {
              clearInterval(task)
              that.sharepoints=res.data.data.shares;
              that.sharepoints.forEach(e => {
                this.amap.plugin('AMap.Geocoder', function () {
                  let geocoder = new that.amap.Geocoder()
                  let lnglat = [e.position.x, e.position.y]
                  geocoder.getAddress(lnglat, function (status, result) {
                    if (status === "complete" && result.info === "OK") {
                      e["address"] = result.regeocode.formattedAddress
                    }
                  })
                })
              })
            }
          }, 100)

        }
      }).catch(err => {
        console.error(err)
      })
    }
  },
  mounted() {
    AMapLoader.load({
      "key": "8253644b705e57e861f82f8742d7ae9f"
    }).then((AMap) => {
      this.amap = AMap
      this.map = new AMap.Map('mapContainer')
      this.updateMarkers()
      this.updateInfo()
    }).catch(e => {
      console.error(e)
    })
  },
}
</script>

<style scoped>
.detailFooter {
  text-align: right;
}

.refresh {
  font-size: 20px;
  float: right;
  margin: 5px 18px 5px 5px;
}

.refresh:hover {
  color: #3a8ee6;
  cursor: pointer;
}

.box-card {
  height: 200px;
  position: relative;
  overflow: hidden;
  text-overflow: ellipsis;
}

.el-tag {
  margin-left: 10px;
}

.position, .read_more {
  cursor: pointer;
}

.position:hover, .read_more:hover {
  color: #3a8ee6;
}

.user_header {
  display: flex;
  align-items: center;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.shareCard {
  margin-bottom: 6px;
}

.cards {
  padding: 0 20px 0 5px;
}

.button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}

.input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}


.editPanel {
  width: 300px;
  padding: 20px;
  background: white;
  margin-top: 58px;
  position: absolute;
  z-index: 2010;
  right: 10px;
  cursor: auto;
  border-radius: 5px;
}

#mapContainer {
  background: #000;
  display: flex;
  flex-grow: 1;
}

.map_buttons {
  width: 100%;
  position: absolute;
}

.map_buttons .button_group {
  position: relative;
  margin: 10px;
  float: right;
  z-index: 999;
}

.footer {
  text-align: right;
  padding: 10px 0;
  font-size: 12px;
  color: #848484;
  position: absolute;
  bottom: 0;
  right: 20px;
}

.content {
  line-height: 1.20;
}


#shareContainer {
  height: 100%;
  width: 15vw;
  max-width: 300px;
  min-width: 200px;
  background: white;
  border-radius: 5px;
  z-index: 999;
  float: left;
  cursor: auto;
}


.shareTitle {
  display: inline-block;
  margin-top: 5px;
  margin-left: 10px;
}

.search {
  padding: 10px 20px 10px 10px;

}
</style>