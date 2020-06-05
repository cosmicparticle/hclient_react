import React from 'react'
import {Col, Row} from 'antd';
//import fengmap from "../../fengmap/fengmap.core.min"; //核心包
import fengmap from 'fengmap';
import './style.css';
import Super from "./../../super"
import Units from './../../units'
import { message } from 'antd';
//数字计算
// import np from "number-precision" 

/**
**/
export default class Home extends React.Component{

    constructor(props) {
        super(props);
        this.state={
            // fmapID:'10347',
            fmapID : '90884',// 工厂地图
            storeImageDatas:[],
            array:[],
            map : null,
            // 人员头像图层
            peopleImgLayer : null,
            // 车辆照片图层
            carImgLayer : null,
            // 物品照片图片
            goodsImgLayer : null,

            //控制是否可添加电子围栏
            addFenceMarker : false,
            // 添加电子围栏的按钮是否点击了
            addFenceBtn : false,
    
            // 控制是否添加任务头像
            addPeoPleImgMarker : true,
            // 添加人物头像的按钮是否点击了
            showPeoPleImgBtn : false, 
            // 显示车辆头像按钮是否点击了
            showCarImgBtn : false,
            //显示物品头像按钮是否点击了
            showGoodsBtn : false,
            //控制是否可改变图片标注
             changeMarker : false,
            //imagemarker对象, 设备图片对象
             imList : [],
            //多边形图层
            polygonLayer : null,
            //矩形标注
             rectangleMarker : null,
            //圆形标注
             circleMaker : null,
            //自定义形状标注
             polygonMarker : null,
    
            
            removeBtn: false,
            // 人移动按钮
            moveImaBtn : false,
    
            //判断当前是否点击的是poi,控制点击公共设施的时候只弹出公共设施的信息框
             clickedPOI : false,
            // 点击事件ID
             eventID : null,
            //定义选中模型
             selectedModel : null,
            // 多边形定义的点
            coords : [
                {
                    x: 13297422 ,
                    y: 4113833,
                    z: 1
                },
                {
                    x: 13297516.0,
                    y: 4113735.0,
                    z: 1
                },
                {
                    x: 13297341,
                    y: 4113577,
                    z: 1
                },
                {
                    x: 13297248,
                    y: 4113677,
                    z: 1
                }
            ],
    
        
    
    
        }
    }

    getStyle(){
        return {
            position: 'absolute',
            width: '100%',
            height: '100%',
        }
    }

    

    componentDidMount() {
        this.openMap();

        this.state.map.on('loadComplete', ()=> {
            console.log('地图加载完成！');
            //显示按钮
           // document.getElementById('tip').style.display = 'block';
           this.timer = setInterval(function () {
 //              debugger
                if (this.state.showPeoPleImgBtn) {
                    console.log("人员定位：！！" + this.state.showPeoPleImgBtn); 
                    this.showLocationPhoto("人员");
                }

                if (this.state.showCarImgBtn) {
                console.log("车辆定位：！！" + this.state.showCarImgBtn); 
                this.showLocationPhoto("车辆");
                }

                if (this.state.showGoodsBtn) {
                    console.log("物品定位：！！" + this.state.showGoodsBtn); 
                    this.showLocationPhoto("物品");
                }
            
                }.bind(this), 3000);
            
            });

       
        
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
            appName: '化工定位',
            //必要，地图应用密钥，通过蜂鸟云后台获取
            key: 'fb90e5786b64ef3229bcf7d683eb5d78'
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
        this.state.map.on('loadComplete', ()=> { 
            console.log('地图加载完成！');
            //显示按钮
           // document.getElementById('tip').style.display = 'block';
            
           // 初始化 图层
           let group = this.state.map.getFMGroup(this.state.map.focusGroupID);
           //实例化 人员 ImageMarkerLayer
           let layerPeople = new fengmap.FMImageMarkerLayer();   
           group.addLayer(layerPeople);
           //实例化 车辆 ImageMarkerLayer
           let layerCar = new fengmap.FMImageMarkerLayer();   
           group.addLayer(layerCar);
            //实例化 物品 ImageMarkerLayer
           let layerGoods = new fengmap.FMImageMarkerLayer();   
           group.addLayer(layerGoods);

           //返回当前层中第一个polygonMarker,如果没有，则自动创建
           // 实例化多边形
          let  pm = group.getOrCreateLayer('polygonMarker');

           this.setState({
                   peopleImgLayer : layerPeople,
                   carImgLayer : layerCar,
                   goodsImgLayer : layerGoods,
                   polygonLayer : pm
            })
   
           
        });
        
        //地图点击事件
        this.state.map.on('mapClickNode', this.mapEevent);
    }

    /**
     * 地图点击事件
     */
    mapEevent=(event)=>{

        let array=this.state.array;
        //如果选中模型，修改模型的颜色、透明图、边线颜色
        if (event.nodeType === fengmap.FMNodeType.MODEL && false) {
            // 模型颜色先不修改
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
debugger
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
                let info = '拾取对象类型： 地图 \n' +
                    '地图位置坐标：x: ' + event.eventInfo.coord.x + '，y:' + event.eventInfo.coord.y;
                if (this.state.selectedModel) {
                    this.state.selectedModel.selected = false;
                }
                //弹出信息框
                // alert(info);
                console.log(info);
                break;

            //model模型
            case fengmap.FMNodeType.MODEL:
                debugger
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
                 info = '拾取对象类型： 模型 \n' +
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
                    // alert(info);
                    console.log(info);
                }, 300);
                break;

            //公共设施、图片标注模型
            case fengmap.FMNodeType.FACILITY:

                break;
            case fengmap.FMNodeType.IMAGE_MARKER:
                debugger
                // this.setState({
                //     clickedPOI :true,
                //     eventID : event.eventInfo.eventID,
                // })

                //  info = '拾取对象类型： 公共设施 \n' +
                //     '地图位置坐标：x: ' + event.eventInfo.coord.x + '，y:' + event.eventInfo.coord.y;
                // if (this.state.selectedModel) {
                //     this.state.selectedModel.selected = false;
                // }
                //弹出信息框
                // alert(info);


                let type = target.type;
                let markers;
                
                if (type == '人员') {
                    markers = this.state.peopleImgLayer.markers;
                } else if (type == '车辆') {
                    markers = this.state.carImgLayer.markers;
                } else if(type == '物品') {
                    markers = this.state.goodsImgLayer.markers;
                }

                  // 为图片标注添加信息窗
                let  fmIm =  markers.find(imv=>imv.id == target.id);
                  
                this.addPopInfoWindow(fmIm);
                break;
        }

        ////

    }

    /**
     * 添加电子围栏
     * */
    addElectronicFence=()=> {
        if (!this.state.addFenceMarker) {
            //添加多边形标注
            this.addPolygonMarker();
        } 

        this.state.polygonLayer.show =!this.state.addFenceMarker;
         //修改可添加状态
         this.setState({
            addFenceMarker : !this.state.addFenceMarker,
        })
    }

    /**
     * 按钮控制 ， 显示定位设备
     */
    controlLocationPhoto=(typeValue)=> {
        // 显示定位图片
        this.showLocationPhoto(typeValue);

        if (typeValue == "人员") {
            // 控制人员点击按钮
            this.setState({
                showPeoPleImgBtn: !this.state.showPeoPleImgBtn,
            })
             // 显示人员图片
             this.state.peopleImgLayer.show = !this.state.showPeoPleImgBtn;
        } else if (typeValue == "车辆") {
             // 控制车辆点击按钮
            this.setState({
                showCarImgBtn : !this.state.showCarImgBtn,
            })
             // 显示车辆图片
             this.state.carImgLayer.show = !this.state.showCarImgBtn;
        } else if (typeValue == "物品") {
            // 控制车辆点击按钮
            this.setState({
                showGoodsBtn : !this.state.showGoodsBtn,
            })
            // 显示物品图片
            this.state.goodsImgLayer.show = !this.state.showGoodsBtn;
        }

    }


     /**
     * 显示定位设备
     * @param typeValue  显示类型。 人员、车辆、物品
     * 定时任务可以执行此
     * */
    showLocationPhoto=(typeValue)=> {
        if (!this.state.showPeoPleImgBtn || !this.state.showCarImgBtn || !this.state.showGoodsBtn) {
            
            Super.super({
                url:'api2/ks/clist/location/list/data',
                query:{
                    type: typeValue, 
                    pageSize:200
                } ,
                method:"GET"
            }).then((res)=>{
               let arr =  res.result.entities;
                arr.forEach(element => {
                    let onlyCode = element.标签信息[0].唯一编码;
                    let name = element.基本属性组.名称;
                    let type = element.基本属性组.类型;
                    let status = element.基本属性组.状态;
                    let coord = element.标签信息[0].当前坐标点;               
                    
                    if (coord != undefined) {
                        let conut = coord.indexOf(',');
                        let conutEnd = coord.indexOf(')');
                        var x = parseInt(coord.substring(1, conut)) + parseInt(13296848);                    
                        var y =  parseInt(coord.substring(conut + 1, conutEnd)) + parseInt(4113685);
                        
                        let  coordsTag = {
                                id : onlyCode,
                                name: name,
                                type : type,
                                status : status,
                                x : x,
                                y : y, 
                            }
                        this.addImageMarker(coordsTag);
                      
                    }                 
                 
                });
               
               
            })
        } else {
           
        }
    }
    

    /**
     * fengmap.FMImageMarker 自定义图片标注对象，为自定义图层。
     * https://www.fengmap.com/docs/js/v2.5.0/fengmap.FMImageMarker.html
     **/
    addImageMarker=(coordsTag)=> {

        let markers = null;
        let type = coordsTag.type;
        let urlv = require('./images/people4.png');
        if (type == "人员") {
             markers =  this.state.peopleImgLayer.markers;
             urlv = require('./images/people4.png');
        } else if (type == "车辆") {
            markers =  this.state.carImgLayer.markers;
            urlv = require('./images/car.png');
        } else if (type == "物品") {
            markers =  this.state.goodsImgLayer.markers;
            urlv = require('./images/goods.png');
        }
       
       let fmIm = new fengmap.FMImageMarker({
            //标注x坐标点
            x: coordsTag.x,
            //标注y坐标点
            y: coordsTag.y,
            //设置图片路径
            url: urlv,
            //设置图片显示尺寸
            size: 20,   
            //标注高度，大于model的高度
            height: 1,
            // alwaysShow: true,
            // avoid: false,
        });
          // 设置图片标注的唯一id
          fmIm.id = coordsTag.id;

          fmIm.name = coordsTag.name;
          fmIm.type = coordsTag.type;
          fmIm.status = coordsTag.status;
          // 设置不自动避让（图层遮盖时）
          fmIm.avoid(false);
          
           
        if (markers) {
            let im =  markers.find(imv=>imv.id == coordsTag.id);
                if (im) {
                    im.moveTo({
                        x: coordsTag.x,
                        y: coordsTag.y,
                        time: 3,
                        callback: function () {
                            console.log("位置更新完毕");
                        
                        },
                        //更新时的回调函数
                        update: function (currentXY) {
                            console.log("实时坐标：" + currentXY.x + "," + currentXY.y);
                        }
                    });
                } else {
                    if (type == "人员") {
                        //添加(人的头像)图片标注
                        this.state.peopleImgLayer.addMarker(fmIm);
                    } else if (type == "车辆") {
                        //添加(人的头像)图片标注
                        this.state.carImgLayer.addMarker(fmIm);
                    } else if (type == "物品") {
                        //添加(人的头像)图片标注
                        this.state.goodsImgLayer.addMarker(fmIm);
                    }
                }      
            }
debugger
        // 为图片标注添加信息窗
        // this.addPopInfoWindow(fmIm);
    }

    /**
     * 
     * @param {信息框控件配置} marker 
     */
     addPopInfoWindow=(marker)=> {   
        if (marker) {

            let id = marker.id;
            let name = marker.name;
            let type = marker.type;
            let status = marker.status;

            //添加绑定marker信息窗
            var ctlOpt = {
                //设置弹框的宽度
                width: 200,
                //设置弹框的高度px
                height: 100,
                //设置弹框的内容，文本或html页面元素
                content:  '类型：' +type + '<br/>标签id：' + id+ ' <br/>姓名：' + name  ,
                // content: name,
                //关闭回调函数
                closeCallBack: function () {
                    //信息窗点击关闭操作
                    console.log('信息窗关闭了！');
                }
            };
            //添加弹框到地图上，绑定marker
            var popMarker = new fengmap.FMPopInfoWindow(this.state.map, ctlOpt, marker);
            //popMarker.close(); 关闭信息窗
        } else {
            //独立信息窗坐标点
            var target = {
                //地图坐标
                coord: {
                    x: 12961581.8454802,
                    y: 4861817.63647148,
                    z: 0
                },
                groupID: 1 //楼层id
            };
            //添加独立信息窗
            var ctlOpt = {
                //添加信息框的地图位置坐标
                mapCoord: {
                    //设置弹框的x轴
                    x: target.coord.x,
                    //设置弹框的y轴
                    y: target.coord.y,
                    //控制信息框距离地图的高度
                    height: 2,
                    //设置弹框位于的楼层,当前聚焦楼层
                    groupID: target.groupID
                },
                //设置弹框的宽度
                width: 200,
                //设置弹框的高度px
                height: 100,
                //设置弹框的内容
                content: '<a target="_bank" href="https://www.fengmap.com">这是一个独立信息框</a>',
                closeCallBack: function () {
                    //信息窗点击关闭操作
                    console.log('信息窗关闭了！');
                }
            };
            //添加弹框到地图上，独立信息窗
            var popMarker = new fengmap.FMPopInfoWindow(this.state.map, ctlOpt);
        }
    }


    /**
     * 为第一层的模型添加多边形标注图层
     * */
    addPolygonMarker=()=> {
 //       debugger
        console.log("addPolygonMarker");
        //获取当前聚焦楼层
        // let group = this.state.map.getFMGroup(this.state.map.focusGroupID);
        // let group = this.state.map.getFMGroup(1);
        //返回当前层中第一个polygonMarker,如果没有，则自动创建
    //    let  pm = group.getOrCreateLayer('polygonMarker');
        // this.setState({
        //     polygonLayer : pm
        // })
//        debugger
        //创建矩形标注
        let rma = this.createRectangleMaker();
 //       debugger
        // this.state.layer.addMarker(rma);
        this.state.polygonLayer.addMarker(rma);

        //创建圆形标注
       let cm =  this.createCircleMaker();
       this.state.polygonLayer.addMarker(cm);

        //创建自定义形状标注
        let cpm = this.createPolygonMaker(this.state.coords);
        this.state.polygonLayer.addMarker(cpm);
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
     * 创建圆形标注
     * */
    createCircleMaker=()=> {
        return new fengmap.FMPolygonMarker({
            //设置颜色
            color: '#3CF9DF',
            //设置透明度
            alpha: .3,
            //设置边框线的宽度
            lineWidth: 3,
            //设置高度
            height: 15,
            //多边形的坐标点集数组
            points: {
                //设置为圆形
                type: 'circle',
                //设置此形状的中心坐标
                center: {
                    x: 13297123.0,
                    y: 4113906.0
                },
                //设置半径
                radius: 50,
                //设置段数，默认为40段
                segments: 40
            }
        });
    }


    /**
     * 创建自定义形状标注
     * coords 多边形的坐标点集数组
     * */
    createPolygonMaker=(coords)=> {
        //实例化polygonMarker
        return new fengmap.FMPolygonMarker({
            //设置透明度
            alpha: 0.5,
            //设置边框线的宽度
            lineWidth: 3,
            //设置高度
            height: 28,
            //多边形的坐标点集数组
            points: coords
        });
    }

    /**
     * 删除所有标注
     * */
     deleteMarkerFunc=()=> {
 //           debugger
         this.setState({            
            removeBtn : true
         })
         // 删除电子围栏
        if (this.state.polygonLayer) {
            //移除该层的所有标注
            this.state.polygonLayer.removeAll();
            //修改可添加状态
            this.setState({
                addFenceMarker:true,
                addFenceBtn : false,
            })
        }

        // 删除任务头像
         if (this.state.peopleImgLayer) {
             //移除该层的所有标注
             this.state.peopleImgLayer.removeAll();
            // this.state.imgLayer.show = false;
             //修改可添加状态
             this.setState({
                addPeoPleImgMarker:true,
                addPeoPleImgBtn : false,
             })
         }

    }

    /**
     * 从远程获取定位实体数据, 并存放在变量中
     * 暂时不用
     */
     getLocationList=(typeValue)=> {

         Super.super({
            url:'api2/ks/clist/location/list/data',
            query:{
                type: typeValue,
                pageSize:100
            } ,
            method:"GET"
        }).then((res)=>{
            debugger
            console.log("44444");
            return  res.result.entities;
        })

    }

    /**
     * 解析数据后返回coordsTag
     */
    getCoordsTag=()=> {

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

                <div  id="fmbtnsGroup" className="fmbtnsGroup">

                    <button  className={this.state.addFenceMarker===true?'addFenceBtn active':'addFenceBtn'} onClick={this.addElectronicFence.bind(this)}>显示电子围栏</button>

                    <button  className={this.state.showPeoPleImgBtn===true?'showPeoPleImgBtn active':'showPeoPleImgBtn'} onClick={this.controlLocationPhoto.bind(this, '人员')}>显示人员</button>
                    <button  className={this.state.showGoodsBtn===true?'addPeoPleImgBtn active':'addPeoPleImgBtn'} onClick={this.controlLocationPhoto.bind(this, '物品')}>显示物品</button>
                    <button  className={this.state.showCarImgBtn===true?'showCarImgBtn active':'showCarImgBtn'} onClick={this.controlLocationPhoto.bind(this, '车辆')}>显示车辆</button>
                   
                    {/* <button className={this.state.moveImaBtn===true?'moveImaBtn active':'moveImaBtn'}  onClick={this.moveMarkerFunc.bind(this)}>移动人的位置</button> */}
                   
                    {/* <button className={this.state.removeBtn===true?'removeBtn active':'removeBtn'} onClick={this.deleteMarkerFunc.bind(this)}>删除所有标注</button> */}
                </div>
            </div>
        );
    }
}
