import React from 'react'
import {Col, Row} from 'antd';
//import fengmap from "../../fengmap/fengmap.core.min"; //核心包
import fengmap from 'fengmap';
import './style.css';
/**
**/
export default class Home extends React.Component{
    getStyle(){
        return {
            position: 'absolute',
            width: '100%',
            height: '100%',
            top: '100px'
        }
    }

    state={
        // fmapID:'10347',
        fmapID : '90884',// 工厂地图
        storeImageDatas:[],
        array:[],
        map : null,
            //控制是否可添加图片标注
         addMarker : true,
        //控制是否可改变图片标注
         changeMarker : false,
        //imagemarker对象
         im : null,
        //marker图层
         layer : null,
        //矩形标注
         rectangleMarker : null,
        //圆形标注
         circleMaker : null,
        //自定义形状标注
         polygonMarker : null,
        addBtn : false,
        removeBtn: false,
        //判断当前是否点击的是poi,控制点击公共设施的时候只弹出公共设施的信息框
         clickedPOI : false,
        // 点击事件ID
         eventID : null,
        //定义选中模型
         selectedModel : null
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
        this.state.map = new fengmap.FMMap(mapOptions);
        //打开Fengmap服务器的地图数据和主题
//        map.openMapById(fmapID);

        //打开Fengmap服务器的地图数据和主题
        this.state.map.openMapById(fmapID, function (error) {
            //打印错误信息
            console.log(error);
        });

        //地图加载完成事件
        this.state.map.on('loadComplete', function () {
            console.log('地图加载完成！');
            //显示按钮
           // document.getElementById('tip').style.display = 'block';
        });

        //地图点击事件
        this.state.map.on('mapClickNode', this.mapEevent);
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
///

        //鼠标左右键点击事件
        let buttonType = event.domEvent.button;
        let buttonTypeText = '';
        if (buttonType === 0) {
            buttonTypeText = '我是鼠标左键点击';
            console.log('我是鼠标左键点击');
        } else if (buttonType === 2) {
            buttonTypeText = '我是鼠标右键点击';
            console.log('我是鼠标右键点击');
        }

        //地图模型
        let target = event.target;
        if (!target) {
            return;
        }
        //筛选点击类型,打印拾取信息
        switch (target.nodeType) {
            //地面模型
            case fengmap.FMNodeType.FLOOR:
                if (this.state.clickedPOI && event.eventInfo.eventID === this.state.eventID) return;
                var info = '拾取对象类型： 地图 \n' +
                    '地图位置坐标：x: ' + event.eventInfo.coord.x + '，y:' + event.eventInfo.coord.y;
                if (this.state.selectedModel) {
                    this.state.selectedModel.selected = false;
                }
                //弹出信息框
                alert(info);
                break;

            //model模型
            case fengmap.FMNodeType.MODEL:
                if (this.state.clickedPOI && event.eventInfo.eventID === this.state.eventID) {
                    this.setState({
                        clickedPOI : false
                    })

                    return;
                }
                //过滤类型为墙的model
                if (target.typeID === 300000) {
                    //其他操作
                    return;
                }
                let info = '拾取对象类型： 模型 \n' +
                    'FID：' + target.FID + '\n' +
                    'model中心点坐标：x: ' + target.mapCoord.x + '，y:' + target.mapCoord.y + '\n' +
                    '地图位置坐标：x: ' + event.eventInfo.coord.x + '，y:' + event.eventInfo.coord.y;

                //模型高亮
                if (this.state.selectedModel && this.state.selectedModel.FID != target.FID) {
                    this.state.selectedModel.selected = false;
                }
                target.selected = true;
                this.setState({
                    selectedModel : target,
                })


                setTimeout(function () {
                    //弹出信息框
                    alert(info);
                }, 300);
                break;

            //公共设施、图片标注模型
            case fengmap.FMNodeType.FACILITY:
            case fengmap.FMNodeType.IMAGE_MARKER:

                this.setState({
                    clickedPOI :true,
                    eventID : event.eventInfo.eventID,
                })

                 info = '拾取对象类型： 公共设施 \n' +
                    '地图位置坐标：x: ' + event.eventInfo.coord.x + '，y:' + event.eventInfo.coord.y;
                if (this.state.selectedModel) {
                    this.state.selectedModel.selected = false;
                }
                //弹出信息框
                alert(info);
                break;
        }

        ////

    }

    /**
     * 添加多边形标注按钮事件
     * */
    addMarkerFunc=()=> {
        debugger
        console.log("3333333333");
        if (this.state.addMarker == true) {
            //添加多边形标注
            this.addPolygonMarker();

            //修改可添加状态
            this.setState({
                addMarker:false,
                addBtn : true,
                removeBtn : false
            })
        }
    }

    /**
     * 为第一层的模型添加多边形标注图层
     * */
    addPolygonMarker=()=> {
        debugger
        console.log("addPolygonMarker");
        //获取当前聚焦楼层
        // let group = this.map.getFMGroup(this.map.focusGroupID);
        let group = this.state.map.getFMGroup(1);
        //返回当前层中第一个polygonMarker,如果没有，则自动创建
       let  pm = group.getOrCreateLayer('polygonMarker');
        this.setState({
            layer : pm
        })
        debugger
        //创建矩形标注
        let rma = this.createRectangleMaker();
        debugger
        // this.state.layer.addMarker(rma);
        pm.addMarker(rma);

        //创建圆形标注
        // createCircleMaker();
        // this.state.layer.addMarker(circleMaker);

        //创建自定义形状标注
        // createPolygonMaker(coords);
        // this.state.layer.addMarker(polygonMarker);
    }


    /**
     * 创建矩形标注
     * fengmap.FMPolygonMarker 自定义图片标注对象
     * https://www.fengmap.com/docs/js/v2.5.0/fengmap.FMPolygonMarker.html
     */
    createRectangleMaker=()=> {

        return   new fengmap.FMPolygonMarker({
            //设置颜色
            color: '#9F35FF',
            //设置透明度
            alpha: 0.3,
            //设置边框线的宽度
            lineWidth: 3,
            //设置高度
            height: 25,
            //多边形的坐标点集数组
            points: {
                //设置为矩形
                type: 'rectangle',
                //设置此形状的中心坐标
                center: {
                    x: 13297201.0,
                    y: 4113843.0
                },
                //矩形的起始点设置，代表矩形的左上角。优先级大于center。
                /*startPoint: {
                 x: 1.2961583E7,
                 y: 4861865.0
                 },*/
                //设置矩形的宽度
                width: 70,
                //设置矩形的高度
                height: 70
            }
        });

    }

    /**
     * 删除多边形标注按钮事件
     * */
     deleteMarkerFunc=()=> {
            debugger
         this.setState({
             addBtn : false,
             removeBtn : true
         })
        if (this.state.layer) {
            //移除该层的所有标注
            this.state.layer.removeAll();
            //修改可添加状态
            this.setState({
                addMarker:true
            })
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

               {/* <div id="btnsGroup" className="btnsGroup">
                    <button onClick="addMarkerFunc(this)">添加图片标注</button>
                    <button onClick="changeMarkerFunc(this)">更换所用图片</button>
                    <button onClick="moveMarkerFunc(this)">更新图片位置（动画）</button>
                    <button onClick="changePosFunc(this)">更新图片位置</button>
                    <button onClick="deleteMarkerFunc(this)">删除图片标注</button>
                </div>*/}

                <div  id="btnsGroup" className="btnsGroup">
                    <button  className={this.state.addBtn===true?'addBtn active':'addBtn'} onClick={this.addMarkerFunc.bind(this)}>添加多边形标注</button>
                    <button className={this.state.removeBtn===true?'removeBtn active':'removeBtn'} onClick={this.deleteMarkerFunc.bind(this)}>删除多边形标注</button>
                </div>
            </div>
        );
    }
}
