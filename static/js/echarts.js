// 基于准备好的dom，初始化echarts实例
var myChart = echarts.init(document.getElementById('myEcharts'),'dark');
var hop = 0
var pop = 0
var zop = 0
axios({
    method:'GET',
    url:'http://localhost:3005/admin/roomxl'
}).then(value=>{
    // console.log(value.data);
    let arr = value.data
    for(let i =0;i<arr.length;i++){
        if(arr[i].type === '豪华'){
            hop+=arr[i].occupancy
        }
        if(arr[i].type === '普通'){
            pop+=arr[i].occupancy
        }
        if(arr[i].type === '总统'){
            zop+=arr[i].occupancy
        }
    }
    // console.log(hop,pop,zop);
    // 指定图表的配置项和数据
var option = {
    title: {
        text: '黑珍珠酒店入住数据'
    },
    tooltip: {},
    legend: {
        data: ['入住量']
    },
    xAxis: {
        data: ['普通房', '豪华房', '总统房']
    },
    yAxis: {},
    series: [
    {
        type: 'bar',
        name:'入住量',
        data: [
            {
                value: pop,
                // 设置单个柱子的样式
                itemStyle: {
                color: '#ffcc66',
                shadowColor: '#ffcc66',
                borderType: 'dashed',
                opacity: 0.5
                }
            },
            {
                value: hop,
                // 设置单个柱子的样式
                itemStyle: {
                color: '#4a5a6a',
                shadowColor: '#4a5a6a',
                borderType: 'dashed',
                opacity: 0.5
                }
            },
            {
            value: zop,
            // 设置单个柱子的样式
            itemStyle: {
            color: '#91cc75',
            shadowColor: '#91cc75',
            borderType: 'dashed',
            opacity: 0.5
            }
        }
        ]
    }
    ]
};
// 使用刚指定的配置项和数据显示图表。
myChart.setOption(option);
}).catch(reason=>{
    console.log(reason)
})


