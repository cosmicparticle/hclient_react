import React from 'react'
import { Row } from 'antd';
import PrintWeightDetail from './PrintWeightDetail'
import BrushController from "echarts/src/component/helper/BrushController";

/**
 * 打印榜单
 */
export default class PrintWeight extends React.Component{


    render(){

        console.log(this.props);
        let urlParams = this.props.location.search;

        console.log(urlParams);
        urlParams = urlParams.substr(1);
        console.log(urlParams);
        let arr = urlParams.split("&");

        let unique_code;
        let hydrocarbon_token;
        arr.forEach(element => {
            let ele = element.split("=");
            if ("unique_code" === ele[0]) {
                unique_code = ele[1];
            } else if ("hydrocarbon_token" === ele[0]) {
                hydrocarbon_token = ele[1];
            }
        });
         return (
            <div >
                {/*<Row>*/}
                    <PrintWeightDetail unique_code={unique_code} hydrocarbon_token={hydrocarbon_token}></PrintWeightDetail>
                {/*</Row>*/}
            </div>
        );
    }
}
