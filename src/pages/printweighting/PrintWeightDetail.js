import React from 'react'
import Units from "../../units";
import { Table } from 'antd';
import Super from "./../../super"
import { Row, Col } from 'antd';
import './index.css'
import {color} from "echarts/src/export";
export default class PrintWeightDetail extends  React.Component{

    state={
      arr:null
    }

    componentWillMount(){

    }

    componentDidMount() {
      const {unique_code, hydrocarbon_token}=this.props

      this.getOrderInfo(unique_code, hydrocarbon_token);
    }

       /**
        * 获取订单信息
        */
    getOrderInfo  = async (unique_code,hydrocarbon_token)=> {

      console.log("unique_code:" + unique_code + "hydrocarbon_token: " + hydrocarbon_token);
       Super.super({
              url:'api2/ks/c/upper_computer_order',
              header:{
                hydrocarbonToken:hydrocarbon_token
              },
              query:{
                unique_code
              } ,
              method:"GET"
          }).then((res)=>{

             let arr =  res.result;
             this.setState({
               arr:arr
             })

            //  let orderCode = arr.基本信息.订单号;
            //  let materialName =  arr.物资信息[0].物资类型;
            //  let guige =  arr.物资信息[0].名称;
            //  let jinFactoryTime = arr.车辆台账[0].进场时间;
            // let chuFactoryTime = arr.基本信息.过磅时间;

            // let maoWeight = arr.毛重过磅信息[0].过磅重量;
            // let piWeight = arr.皮重过磅信息[0].过磅重量;
            // let jingWeight = arr.基本信息.实际重量;

            // let maoWeightOpposite = arr.基本信息.对方过磅毛重;
            // let piWeightOpposite = arr.基本信息.对方过磅皮重;
            // let jingWeightOpposite =  arr.基本信息.对方过磅净重;

            // let fahuoUnit = arr.发货单位[0].单位名称;
            // let shouhuoUnit =  arr.收货单位[0].单位名称;
            // let yunshuUnit = arr.运输商[0].名称;
            // let carID = arr.承运车辆[0].车牌号;

          })

  }

    render(){

      let arr = this.state.arr;
      if (arr) {
            let orderCode = arr.基本信息.订单号;
             let materialName =  arr.物资信息[0].物资类型;
             if (materialName) {
              materialName = materialName.split("R@R")[1];
             }
             let guige =  arr.物资信息[0].名称;
             let jinFactoryTime = arr.车辆台账[0].进场时间;
            let chuFactoryTime = arr.基本信息.过磅时间;

            let maoWeight = arr.毛重过磅信息[0].过磅重量;
            let piWeight = arr.皮重过磅信息[0].过磅重量;
            let jingWeight = arr.基本信息.实际重量;

            let maoWeightOpposite = arr.基本信息.对方过磅毛重;
            let piWeightOpposite = arr.基本信息.对方过磅皮重;
            let jingWeightOpposite =  arr.基本信息.对方过磅净重;

            let fahuoUnit = arr.发货单位[0].单位名称;
            let shouhuoUnit =  arr.收货单位[0].单位名称;
            let yunshuUnit = arr.运输商[0].名称;
            let carID = arr.承运车辆[0].车牌号;

        return  <div className="printWeight">
                    <h2 style={{textAlign:"center",fontSize:"23px"}}>山东创新炭材料有限公司过磅单</h2>

                    <Row  gutter={[16, 16]}  style={{}}>
                        <Col style={{textAlign:"left"}}  span={8} style={{}}>打印时间: 2020-10-17 00:30:08</Col>
                        <Col style={{textAlign:"center"}} span={8} >单号: DD08083257329</Col>
                        <Col style={{textAlign:"right"}} span={8} >单位: kg</Col>
                    </Row>

                    <Row  gutter={[16, 16]} align="middle" justify="start" style={{}}>
                        <Col className="weightCol"  span={4} style={{}}>物资名称</Col>
                        <Col className="weightCol" span={4} >预焙阳极</Col>
                        <Col className="weightCol" span={4} >进场时间</Col>
                        <Col className="weightCol" span={4} >2020年10月20日</Col>
                        <Col className="weightCol" span={4} >出场时间</Col>
                        <Col className="weightCol" span={4} >2020年10月20日</Col>
                    </Row>
                    <Row gutter={[16, 16]}>
                        <Col className="weightCol" span={4} >规格</Col>
                        <Col className="weightCol" span={4} >H1333</Col>
                        <Col className="weightCol" span={4} >毛重</Col>
                        <Col className="weightCol" span={4} >6440</Col>
                        <Col className="weightCol" span={4} >对方毛重</Col>
                        <Col className="weightCol" span={4} >0</Col>
                    </Row>
                    <Row gutter={[16, 16]}>
                        <Col className="weightCol" span={4} >供货单位</Col>
                        <Col className="weightCol" span={4} >山东创新</Col>
                        <Col className="weightCol" span={4} >皮重</Col>
                        <Col className="weightCol" span={4} >222</Col>
                        <Col className="weightCol" span={4} >对方皮重</Col>
                        <Col className="weightCol" span={4} >0</Col>
                    </Row>
                    <Row gutter={[16, 16]}>
                        <Col className="weightCol" span={4} >收货单位</Col>
                        <Col className="weightCol" span={4} >阳新</Col>
                        <Col className="weightCol" span={4} >净重</Col>
                        <Col className="weightCol" span={4} >4333</Col>
                        <Col className="weightCol" span={4} >对方净重</Col>
                        <Col className="weightCol" span={4} >0</Col>
                    </Row>
                    <Row gutter={[16, 16]}>
                        <Col className="weightCol" span={4} >运输单位</Col>
                        <Col className="weightCol" span={4} >阳新</Col>
                        <Col className="weightCol"  span={4} >车号</Col>
                        <Col className="weightCol" span={4} >鲁MB7897</Col>
                        <Col className="weightCol" span={4} >备注</Col>
                        <Col className="weightCol" span={4} >备注</Col>
                    </Row>
                </div>
      } else {
        return <div></div>
      }


    }

}
