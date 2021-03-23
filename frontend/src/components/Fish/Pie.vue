<script>
import { Pie } from 'vue-chartjs'

export default {
  extends: Pie,
  //props: ['data', 'options'],
  props: ['fish'],
    watch: {
        fish: function (newVal) {
            this.chartdata.labels = newVal.labels
            this.chartdata.datasets[0].data = newVal.percents
            this.renderChart(this.chartdata, this.options)
            //alert( `Новое значение ${newVal.baseInfo.id}`)
            
        }
    },
  data() {
    return {
      chartdata: {
        labels: [],
        datasets: [
          {
            label: "Data One",
            //backgroundColor: "#f87979",
            data: [],
            backgroundColor: ["#9b53ed", "#f0f078", "#6eb6e6", "#e366ab", "#66e37b", "#5f6363"], 
            borderWidth: 0
          },
        ],
        
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
      },
    };
  },
  mounted () {
   // alert('gefjeh')
    this.chartdata.labels = this.fish.labels
    this.chartdata.datasets[0].data = this.fish.percents
    this.renderChart(this.chartdata, this.options)
  }
}
</script>
