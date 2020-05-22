import React from 'react'
import {Col, Row} from 'antd';
//import fengmap from "../../fengmap/fengmap.core.min"; //核心包
import fengmap from 'fengmap';
/**
**/
export default class Home extends React.Component{
    getStyle(){
        return {
            position: 'absolute',
            width: '100%',
            height: '100%',
        }
    }

    state={
        // fmapID:'10347',
        fmapID : '90884',// 工厂地图
        storeImageDatas:[],
        array:[],
        //控制是否可添加图片标注
         addMarker : true,
    //控制是否可改变图片标注
     changeMarker : false,
    //imagemarker对象
     im : null,
    //marker图层
     layer : null,
    }

    componentDidMount() {
        this.openMap();
    }
    openMap=()=>{
        let fmapID= this.state.fmapID;

      const  mapOptions = {
            //必要，地图容器
            container: document.getElementById('fengMap'),
            //地图数据位置
            // mapServerURL: './data/' + fmapID,
            //主题数据位置
            // mapThemeURL: './data/theme',
            //设置主题
            defaultThemeName: '2001',
          mapScaleLevelRange: [16, 23],       // 比例尺级别范围， 16级到23级
          defaultMapScaleLevel: 18,          // 默认比例尺级别设置为19级

          //方向枚举型。可设置正南、正北、正东、正西、东南、西南等方向值。具体可参考fengmap.FMDirection类。
          defaultControlsPose: 200,
            //是否支持单击模型高亮
            modelSelectedEffect: false,
            //必要，地图应用名称，通过蜂鸟云后台创建
            appName: 'atest',
            //必要，地图应用密钥，通过蜂鸟云后台获取
            key: 'c7565dfdd0c82f6908db73b857f4301a'
        };
//        var fmapID = '10347'; //mapId
        //初始化地图对象
       let map = new fengmap.FMMap(mapOptions);
        //打开Fengmap服务器的地图数据和主题
//        map.openMapById(fmapID);

        //打开Fengmap服务器的地图数据和主题
        map.openMapById(fmapID, function (error) {
            //打印错误信息
            console.log(error);
        });

        //地图加载完成事件
        map.on('loadComplete', function () {
            console.log('地图加载完成！');
            //显示按钮
           // document.getElementById('tip').style.display = 'block';
        });

        //地图点击事件
        map.on('mapClickNode', this.mapEevent);
    }

    mapEevent=(event)=>{
        let array=this.state.array;
        //如果选中模型，修改模型的颜色、透明图、边线颜色
        if (event.nodeType === fengmap.FMNodeType.MODEL) {
            var model = event.target;
            var index = array.indexOf(model.FID);
            if (index != -1) {
                //将选中元素从数组中移除
                array.splice(index, 1);
                //渲染model恢复回主题中的设置
                this.setModelToDefault(model);
                //移除自定义storeImage
                //removeStoreImage(model);
            } else {
                //将选中元素添加到数组中
                array.push(model.FID);
                // 渲染model为自定义颜色
                this.setModelRender(model);
                //添加自定义storeImage
                //addStoreImage(model);
            }
        }
    }

/**
 * 设置model颜色、透明度、边线颜色
 * */
setModelRender=(model)=> {
    var modelColor = '#FF00FF'; //模型颜色
    var lineColor = '#3384fd'; //模型边线颜色
    var alpha = 1; //颜色透明度
    if (model) {
        //修改模型颜色及透明度
        model.setColor(modelColor, alpha);
        //修改模型边线的颜色及透明度
        model.setStrokeColor(lineColor, alpha);
    }
}

/**
 * 修改model恢复到主题中的设置
 * */
setModelToDefault=(model)=> {
    if (model) {
        //将模型的颜色及透明度恢复回主题中的设置
        model.setColorToDefault();
        //将模型边线的颜色及透明度恢复回主题中的设置
        model.setStrokeColorToDefault();
    }
}

/**
 * 添加自定义storeImage
 * */
addStoreImage=(model)=> {
    //定义storeImage对象
    var storeImage = {
        size: [10, 10],
        height: 2,
        image: './images/logo.png',
        angle: 0
    };
    //自定义StoreImage的方法
    model.addStoreImage(storeImage);
    //定义键值对数据对象，方便之后删除对应storeImage
    let storeImageData = {
        fid: model.FID,
        si: storeImage
    };
    this.state.storeImageDatas.push(storeImageData);
}

/**
 * 移除自定义storeImage
 * */
removeStoreImage=(model)=>{
    var storeImageData = null,
        pIndex = 0;
    this.state.storeImageDatas.map(function (item, index) {
        if (item.fid === model.FID) {
            storeImageData = item;
            pIndex = index;
        }
    });

    if (storeImageData != null) {
        var storeImage = storeImageData.si;
        //移除自定义的storeImage的方法
        model.removeStoreImage(storeImage);
        //从原数组中删除该数据
        this.state.storeImageDatas.splice(pIndex, 1);
    }
}



    render(){

        return (
            <div >
                 <div style={this.getStyle()} id={'fengMap'}></div>
                <span id="tip" className="tip">请尝试使用鼠标点击地图上模型，渲染选中模型颜色</span>

                <div id="btnsGroup" className="btnsGroup">
                    <button onClick="addMarkerFunc(this)">添加图片标注</button>
                    <button onClick="changeMarkerFunc(this)">更换所用图片</button>
                    <button onClick="moveMarkerFunc(this)">更新图片位置（动画）</button>
                    <button onClick="changePosFunc(this)">更新图片位置</button>
                    <button onClick="deleteMarkerFunc(this)">删除图片标注</button>
                </div>
            </div>
        );
    }
}
