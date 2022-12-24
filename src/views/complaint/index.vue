<template>
  <div>
    <!-- 卡片视图 -->
    <el-card v-for="(item,index) in list" :key="index" v-show="item.status!=='green'">
      <div >
        <div>{{item.content}}</div>
        <el-button-group id="checkBut">
          <el-button type="primary" size="mini" @click="check(item.subjectId)">项目详情</el-button>
          <el-button type="primary" size="mini" @click="checkOver(item.id)">处理完成</el-button>
        </el-button-group>
      </div>

    </el-card>
  </div>
</template>
<script>
export default{
  data() {
    return {
      getComplaintUrl: 'http://121.5.128.97:9012/v2.0/admin-microservice/conplaints',
      finComUrl: 'http://121.5.128.97:9012/v2.0/admin-microservice/conplaints/status',
      list: [],
    }
  },
  methods:{
    getComplaint() {
      this.axios({
        method: 'get',
        url: this.getComplaintUrl
      }).then(response => {
        console.log(response.data)
        this.list=response.data
      }).catch(error => {
        this.$message({
          message: 'error/(ㄒoㄒ)/~~获取投诉失败',
          type: 'error',
        })
        Promise.reject(error)
      })
    },
    check(id){
      console.log(id)
      this.$router.push({name:'Project',params:{sId:id}})
    },
    checkOver(id){
      this.axios({
        method: 'put',
        params: {
          id: id
        },
        url: this.finComUrl
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
    }
  },
  created(){
    this.getComplaint()
  }

}
</script>
<style>
#checkBut{
  margin-left: 80%;
}
</style>
