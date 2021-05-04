<template>
  <div class="vx-row">
	<div class="vx-col w-full lg:w-1/2 mb-base">
        <vx-card slot="no-body" class="text-center bg-primary-gradient greet-user">
                    <img src="@/assets/images/elements/decore-left.png" class="decore-left" alt="Decore Left" width="200" >
                    <img src="@/assets/images/elements/decore-right.png" class="decore-right" alt="Decore Right" width="175">
          <feather-icon icon="AwardIcon" class="p-6 mb-8 bg-primary inline-flex rounded-full text-white shadow" svgClasses="h-8 w-8"></feather-icon>
          <h1 class="mb-6 text-white">Скоро запуск!</h1>
        </vx-card>
      </div>
  </div>
</template>
 
<script>
import ECharts from 'vue-echarts/components/ECharts'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/legend'
import 'echarts/lib/chart/line'

export default {
  data() {
    return {
    }
  },
  components: {
    ECharts
  },

  methods:{
	getUser(){
		this.$http.get('user').then(response => {
			console.log(response.data);
		})
	},
  },

  mounted(){
	// this.getUser()
  }
}
</script>

<style lang="scss">
	.decore-left{
      position: absolute;
      left:0;
      top: 0;
    }
    .decore-right{
      position: absolute;
      right:0;
      top: 0;
    }
</style>