import React from 'react'
import Super from "./../../super"
import { Row, Col } from 'antd';
import './index.css'
import moment from "moment";
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

          })

  }

    render(){

      let arr = this.state.arr;
      if (arr) {
            let baeInfo = arr.基本信息;
             let orderCode = null;
          let chuFactoryTime = null;
          let jingWeight = null;
          let maoWeightOpposite = null;
          let piWeightOpposite = null;
          let jingWeightOpposite = null;
          let baoshu = null;
          let kuaishu = null;
          let jieSuanWeight = null;
          if (baeInfo){
                 orderCode = baeInfo.订单号;
                chuFactoryTime = baeInfo.过磅时间;
                if (chuFactoryTime) {
                    chuFactoryTime=moment(chuFactoryTime).format("YYYY/MM/DD  HH:mm:ss")
                }

                 jingWeight = baeInfo.实际重量;
                 maoWeightOpposite = baeInfo.对方过磅毛重;
                 piWeightOpposite = baeInfo.对方过磅皮重;
                 jingWeightOpposite =  baeInfo.对方过磅净重;
                 baoshu =  baeInfo.包数;
                 kuaishu =  baeInfo.块数;
                jieSuanWeight =  baeInfo.结算重量;
            }


             let materialName = null;
             let guige =  null;
            if (arr.物资信息[0]) {
              materialName =  arr.物资信息[0].物资类型;
                guige =  arr.物资信息[0].名称;
             }
             if (materialName) {
                materialName = materialName.split("@R@")[1];
             }


             let jinFactoryTime = null;
             if (arr.车辆台账[0]) {
                 jinFactoryTime = arr.车辆台账[0].进场时间;
                if (jinFactoryTime) {
                    jinFactoryTime=moment(jinFactoryTime).format("YYYY/MM/DD  HH:mm:ss")
                }
             }


            let maoWeight = null;
          if (arr.毛重过磅信息[0]){
              maoWeight = arr.毛重过磅信息[0].过磅重量;
          }
            let piWeight = null;
          if (arr.皮重过磅信息[0]){
              piWeight =  arr.皮重过磅信息[0].过磅重量;
          }

            let fahuoUnit = null;
            if (arr.发货单位[0]){
                fahuoUnit = arr.发货单位[0].单位名称;
            }
            let shouhuoUnit =  null;
          if (arr.收货单位[0]){
              shouhuoUnit = arr.收货单位[0].单位名称;
          }
            let yunshuUnit = null;
          if (arr.运输商[0]){
              yunshuUnit =  arr.运输商[0].名称;
          }
            let carID = null;
          if (arr.承运车辆[0]){
              carID = arr.承运车辆[0].车牌号;
          }

         let dayinTime =  moment(new Date()).format("YYYY/MM/DD  HH:mm:ss")

        return  <div className="printWeight" >
                    <h2 style={{textAlign:"center",fontSize:"17px",color:"#000"}}>山东创新炭材料有限公司磅单</h2>

                    <Row   style={{}}>
                        <Col style={{textAlign:"left"}}  span={8} style={{}}>打印时间: {dayinTime}</Col>
                        <Col style={{textAlign:"center"}} span={8} >
                            规格:  {guige}
                            {/*单号: {orderCode}*/}
                        </Col>
                        <Col style={{textAlign:"right"}} span={8} >单位: kg</Col>
                    </Row>

                    <Row  gutter={[16, 16]} style={{}}>
                        <Col className="weightCol"   span={3}>物资名称</Col>
                        <Col className="weightCol" span={5} >{materialName}</Col>
                        <Col className="weightCol" span={3} >进场时间</Col>
                        <Col className="weightCol"  span={5} >{jinFactoryTime}</Col>
                        <Col className="weightCol" span={3} >xxxx</Col>
                        <Col className="weightCol weightColRight" span={5} >{chuFactoryTime}</Col>
                    </Row>
                    <Row gutter={[16, 16]}>
                        <Col className="weightCol" span={3} >xxx</Col>
                        <Col className="weightCol" span={5} >{guige}</Col>
                        <Col className="weightCol" span={3} >我方毛重</Col>
                        <Col className="weightCol" span={5} >{maoWeight}</Col>
                        <Col className="weightCol" span={3} >对方毛重</Col>
                        <Col className="weightCol weightColRight" span={5} >{maoWeightOpposite}</Col>
                    </Row>
                    <Row gutter={[16, 16]}>
                        <Col className="weightCol" span={3} >发货单位</Col>
                        <Col className="weightCol" span={5} >{fahuoUnit}</Col>
                        <Col className="weightCol" span={3} >我方皮重</Col>
                        <Col className="weightCol" span={5} >{piWeight}</Col>
                        <Col className="weightCol" span={3} >对方皮重</Col>
                        <Col className="weightCol weightColRight" span={5} >{piWeightOpposite}</Col>
                    </Row>
                    <Row gutter={[16, 16]}>
                        <Col className="weightCol" span={3} >收货单位</Col>
                        <Col className="weightCol" span={5} >{shouhuoUnit}</Col>
                        <Col className="weightCol" span={3} >我方净重</Col>
                        <Col className="weightCol" span={5} >{jingWeight}</Col>
                        <Col className="weightCol" span={3} >对方净重</Col>
                        <Col className="weightCol weightColRight" span={5} >{jingWeightOpposite}</Col>
                    </Row>
                    <Row gutter={[16, 16]}>
                        <Col className="weightCol " span={3} >运输单位</Col>
                        <Col className="weightCol " span={5} >{yunshuUnit}</Col>
                        <Col className="weightCol "  span={3} >车号</Col>
                        <Col className="weightCol " span={5} >{carID}</Col>

                        <Col className="weightCol" span={3} >包数</Col>
                        <Col className="weightCol weightColRight" span={5} >{baoshu}</Col>

                        {/*<Col className="weightCol " span={3} >备注</Col>*/}
                        {/*<Col className="weightCol weightColRight " span={5} > </Col>*/}
                    </Row>
                <Row gutter={[16, 16]}>

                    <Col className="weightCol weightColEnd" span={3} >出场时间</Col>
                    <Col className="weightCol weightColEnd" span={5} >{chuFactoryTime}</Col>

                    {/*<Col className="weightCol weightColEnd" span={3} >包数</Col>*/}
                    {/*<Col className="weightCol weightColEnd" span={5} >{baoshu}</Col>*/}
                    <Col className="weightCol weightColEnd"  span={3} >块数</Col>
                    <Col className="weightCol weightColEnd" span={5} >{kuaishu}</Col>
                    <Col className="weightCol weightColEnd" span={3} >结算重量</Col>
                    <Col className="weightCol weightColRight weightColEnd" span={5} > {jieSuanWeight}</Col>
                </Row>

                </div>
      } else {
        return <div></div>
      }


    }

}
