<template>
  <div class="main">
    <h2>项目审核</h2>
    <el-button type="primary" size="mini" @click="getSubject">刷新</el-button>

      <div >
        <div  v-for="(item,index) in projectList" :key="index">
          <el-card class="subject">
          <h3 class="projectName">{{ item.projectName }}</h3>
          <div>
            描述：{{ item.describe }}
            <div>状态：{{ item.status }}</div>
          </div>
          <div>月费：{{ item.monthFee }}</div>
          <div>创建时间：{{ item.createTime }}</div>
          <div v-for="(pic,index) in item.picPaths">
            <img id="pic" :src=pic alt="loading" :key="index">
          </div>
          <div id="button">
            <el-button type="success" size="small" @click="green(item.id)">通过</el-button>
            &nbsp;
            <el-button type="primary" size="small" @click="red(item.id)">不通过</el-button>
          </div>
          </el-card>
        </div>
      </div>

  </div>
</template>

<script>
import qs from "querystring";

export default {
  name: "",
  data() {
    return {
      getProjectUrlByPage: 'http://121.5.128.97:9012/v2.0/admin-microservice/subject/yellow',
      redUrl: 'http://121.5.128.97:9012/v2.0/admin-microservice/projects/status/red',
      greenUrl: 'http://121.5.128.97:9012/v2.0/admin-microservice/projects/status/green',
      projectList: [],
      total: 0,
    };
  },

  methods: {
    getSubject() {
      this.axios({
        method: 'get',
        params: {
          index: '1',
          pageSize: '6',
        },
        url: this.getProjectUrlByPage
      }).then(response => {
        console.log(response.data.List)
        console.log("getsubject")
        console.log(response.data)
        this.projectList = response.data.List
        this.total = response.data.Total
      }).catch(error => {
        this.$message({
          message: 'error/(ㄒoㄒ)/~~获取项目失败',
          type: 'error',
        })
        Promise.reject(error)
      })
    },
    red(id) {
      this.axios({
        method: 'put',
        params: {
          projectId: id
        },
        url: this.redUrl
      }).then(response => {
        this.$message({
          message: '操作成功',
          type: 'success',
        })
      }).catch(error => {
        this.$message({
          message: 'error/(ㄒoㄒ)/~~操作失败',
          type: 'error',
        })
        Promise.reject(error)
      })
    },
    green(id) {
      this.axios({
        method: 'put',
        params: {
          projectId: id
        },
        url: this.greenUrl
      }).then(response => {
        this.$message({
          message: '操作成功',
          type: 'success',
        })
      }).catch(error => {
        this.$message({
          message: 'error/(ㄒoㄒ)/~~操作失败',
          type: 'error',
        })
        Promise.reject(error)
      })
    },
  },
  created() {
    this.getSubject()
  }
}
</script>


<style lang="less" scoped>
.main {
  margin: 20px;
  width: 80%;
}

#detail {
  width: 80%;
  margin: 0 auto;
}

#subject {
  background-color: #c5efbe;
  padding: 10px;
  margin: 15px;
  border-radius: 15px;
}

#pic {
  display: block;
  margin: 10px;
  width: 31%;
  height: 220px;
  float: left;
}

#edictPic {
  display: block;
  margin: 10px;
  width: 31%;
  height: 220px;
  float: left;
}

#edictPic:hover {
  cursor: pointer;
  filter: brightness(120%);
}

.projectName {
  margin-top: 20px;
  clear: left;
}

#button {
  clear: left;
}
</style>
