<template lang="html">
  <div class="df-poem">
    <div class="main">
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
  name: 'feedback',
  data() {
    return {
      organization: 'green',
      getFeedbackUrl: SPONSORED_URL+'/FeedBack/AllByOrg',
      delFeedbackUrl: SPONSORED_URL+'/FeedBack/Id',
      feedbackList: [],
      total: 0,
      feedbackResult:{
        feedback:[]
      },

      thisFeedback: [],
      fullscreenLoading: false,
    }
  },
  computed: {
  },
  async created() {
    this.getFeedback()
  },
  methods: {
    getFeedback() {
      this.axios({
        method: 'get',
        params: {
          organization: this.organization,
          index: '1',
          pageSize: '3',
        },
        url: this.getFeedbackUrl
      }).then(response => {
        this.feedbackList=response.data.List
        this.total=response.data.Total
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
}}
</script>
<style lang="stylus" scoped>

</style>
