import React from 'react'
import './index.css'
import { Row, Col,Button } from 'antd';
import AnyEchart from "./AnyEchart";
import LineEchart from "./LineEchart";
import AniEchart from "./AniEchart";
import ThreeTypeEchart from "./ThreeTypeEchart";
import ThreeTypeEchart1 from "./ThreeTypeEchart1";
import LiquidFillEchart from "./LiquidFillEchart";
import RootTypeEchart from "./RootTypeEchart";
import ColTypeEchart from "./ColTypeEchart";
import ColTypeEchart2 from "./ColTypeEchart2";
/**
const HOME_CONFIG = {
    component       : HomePage,
    blockIds        : null,
    excludeBlockIds : null
};
**/
export default class Home extends React.Component{


        render(){
            const titleStyle={
                color:'black',
                fontSize:'30px',
                paddingBottom:'20px',
                paddingTop:'10px',
                //border:'1px solid blue',
            };
            return (
                <div >
                    <Row  >
                        <Col className="gutter-row" style={titleStyle} align={"middle"}>
                            代办工作
                        </Col>
                    </Row>
                    <Row>
                        <Col span={12}>
                            <ThreeTypeEchart1 />
                        </Col>
                        <Col span={12}>
                            <ThreeTypeEchart />
                        </Col>
                    </Row>
                    <Row  >
                        <Col className="gutter-row" style={titleStyle} align={"middle"}>
                            已就业情况分析
                        </Col>
                    </Row>
                    <Row>
                        <Col span={6}>
                            <LiquidFillEchart />
                        </Col>
                        <Col span={9}>
                            <AnyEchart />
                        </Col>
                        <Col span={9}>
                            <ColTypeEchart />
                        </Col>
                    </Row>
                    <Row  >
                        <Col className="gutter-row" style={titleStyle} align={"middle"}>
                            待就业情况分析
                        </Col>
                    </Row>
                    <Row type={"flex"} align={"middle"} justify={"space-around"}>
                        <Col span={3}>
                            <RootTypeEchart />
                        </Col>
                        <Col span={3}>
                            <RootTypeEchart />
                        </Col>
                        <Col span={3}>
                            <RootTypeEchart />
                        </Col>
                        <Col span={3}>
                            <RootTypeEchart />
                        </Col>
                        <Col span={3}>
                            <RootTypeEchart />
                        </Col>
                        <Col span={3}>
                        <RootTypeEchart />
                    </Col>
                        <Col span={3}>
                            <RootTypeEchart />
                        </Col>
                    </Row>

                </div>
        );
    }
}