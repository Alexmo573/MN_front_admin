<template>
  <div class="main">
    <div class="subject" >
      <el-button-group >
        <el-button type="primary" size="mini" @click="red()">冻结项目</el-button>
        <el-button type="primary" size="mini" @click="back()">返回</el-button>
      </el-button-group>
      <div>
        <h3 class="projectName">{{ item.projectName }}</h3>
        <div >
          描述：{{ item.describe }}
          <div >状态：{{ item.status }}</div>
        </div>
        <div >月费：{{ item.monthFee }}</div>
        <div >创建时间：{{ item.createTime }}</div>
        <div v-for="(pic,index) in item.picPaths">
          <img id="pic" :src=pic alt="loading" :key="index">
        </div>
      </div>
    </div>
    <div>
      <div id="noticeLis" v-for="(notice,index) in noticeList">
        <div id="noticeBlock" :key="index">
          <div>{{notice.content}}</div>
          <div id="motTime">{{notice.createTime}}</div>
        </div>
      </div>
    </div>
    <div>
      <div v-for="(item,index) in feedbackList">
        <div class="feedback">
          <div class="feedbackContent" v-html="item.content" :key="index"></div>
          <div id="feedbackFoot">{{item.projectName}}&nbsp;{{item.createTime}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props:{
    id: ''
  },
  data() {
    return {
      getProjectUrlByPage: 'http://121.5.128.97:9012/v2.0/admin-microservice/projects/id',
      projectNoticeUrl: 'http://121.5.128.97:9012/v2.0/admin-microservice/notices/id',
      getFeedbackUrl:'http://121.5.128.97:9012/v2.0/admin-microservice/feedbcks/id',
      redUrl: 'http://121.5.128.97:9012/v2.0/admin-microservice/projects/status/red',
      projectList: [],
      total: 0,
      noticeList: [],
      Pid: '',
      item:{},
      feedbackList: [],
    };
  },
  mounted() {//在模板编译完成后执行

  },
  methods: {
    getSubject() {
      this.Pid=this.$route.params.sId;
      console.log('pId')
      console.log(this.Pid)
      this.axios({
        method: 'get',
        params: {
          id:this.Pid
        },
        url: this.getProjectUrlByPage
      }).then(response => {
        console.log("getsubject")
        console.log(response.data)
        this.item = response.data
      }).catch(error => {
        this.$message({
          message: 'error/(ㄒoㄒ)/~~获取项目失败',
          type: 'error',
        })
        Promise.reject(error)
      })
    },
    getNotice(){
      this.Pid=this.$route.params.sId;
      this.axios({
        method: 'get',
        params: {
          subjectId: this.Pid,
        },
        url: this.projectNoticeUrl
      }).then(response => {
        console.log("notice")
        console.log(response.data)
        this.noticeList=response.data
      }).catch(error => {
        this.$message({
          message: 'error/(ㄒoㄒ)/~~获取项目公告失败',
          type: 'error',
        })
        Promise.reject(error)
      })
    },
    getFeedback() {
      this.Pid=this.$route.params.sId;
      this.axios({
        method: 'get',
        params: {
          subjectId: this.Pid
        },
        url: this.getFeedbackUrl
      }).then(response => {
        this.feedbackList=response.data
        console.log('feedback')
        console.log(response.data)
      }).catch(error => {
        this.$message({
          message: 'error/(ㄒoㄒ)/~~获取反馈失败',
          type: 'error',
        })
        Promise.reject(error)
      })
    },
    red(){
      this.Pid=this.$route.params.sId;
      this.axios({
        method: 'put',
        params: {
          projectId:  this.Pid
        },
        url: this.redUrl
      }).then(response => {
        this.$message({
          message: '冻结项目成功',
          type: 'success',
        })
      }).catch(error => {
        this.$message({
          message: 'error/(ㄒoㄒ)/~~冻结项目失败',
          type: 'error',
        })
        Promise.reject(error)
      })
    },
    back(){
      this.$router.push({name:'District'})
    }
  },
  created() {
    this.getSubject()
    this.getNotice()
    this.getFeedback()
  }
}
</script>


<style lang="less" scoped>
.main{
  margin: 20px;
  width: 80%;
}
#detail{
  width: 80%;
  margin: 0 auto;
}
#subject {
  background-color: #c5efbe;
  padding: 10px;
  margin-bottom: 12px;
  margin-top: 12px;
  border-radius: 15px;
}

#pic{
  display: block;
  margin: 10px;
  width: 31%;
  height: 220px;
  float: left;
}
#edictPic{
  display: block;
  margin: 10px;
  width: 31%;
  height: 220px;
  float: left;
}
#edictPic:hover{
  cursor: pointer;
  filter: brightness(120%);
}
.projectName{
  margin-top:20px;
  clear: left;
}
#button{
  clear: left;
}
#noticeLis{
  clear: left;
  margin-top: 15px;
}
#noticeBlock{
  border-style: inset;
  border-radius: 8px;
  border-width: 2px;
  padding: 12px;
  margin-top: 20px;
  margin-bottom: 15px
}
#motTime{
  font-size: small;
  margin-top: 8px;
  margin-left: 75%
}
.feedback{
  background-color: #eaf5df;
  margin-bottom: 12px;
  margin-top: 8px;
  padding: 10px;
  border-radius: 15px;
}
.feedbackContent{
  margin: 20px;
}
#feedbackFoot{
  font-size :small;
  margin-left :25px;
  margin-bottom: 20px;
}

</style>
