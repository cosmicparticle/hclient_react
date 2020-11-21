import React from 'react'
import {Button, Upload, Icon, message, Modal} from 'antd'
import Super from "../../super";

export default class NewUpload extends React.Component{
    constructor(props){
        super(props)
        // console.log(props)
        // console.log(this.props)
        this.state={
            fileList:[],
            removed:false
        }

    }
    handleRemove=(info)=>{

        Modal.confirm({
            title: "删除提示",
            content: "您确定删除此图片吗？",
            okText: "确认",
            cancelText: "取消",
            onOk: () => {
                let fileList = []
                this.setState({
                    fileList,
                    removed:true
                });
                this.triggerChange({removed:true});
            },
            onCancel: () => {
            }
        });

    }
    handleChange=(info)=>{
        let fileList = info.fileList.slice(-1)
        this.setState({
            fileList,
        });
        this.triggerChange(fileList[0]);
        return false;
    }
    triggerChange = (changedValue) => {
        const {onChange} = this.props
        if (onChange) {
          onChange(changedValue);
        }
      }
    beforeUpload=(file)=>{
        // const isJPG = file.type === 'image/jpeg';
        // const isPNG = file.type === 'image/png';
        // if (!(isJPG || isPNG)) {
        //     message.error('只能上传JPG 、JPEG 、PNG格式的图片~')
        // }
        const isLt5M = file.size / 1024 / 1024 < 5;
        if (!isLt5M) {
            message.error('超过5M限制 不允许上传~')
        }
        return false
    }
    render(){
        const {width}=this.props

        const {removed,fileList}=this.state
//        console.log(this.props);
        const fileList1=this.props.fileList && removed===false?this.props.fileList:fileList;

        return (
            <div>                                           
                <Upload    
                    action="image/*"               
                    listType= 'text'
                    fileList={fileList1}
                    beforeUpload={this.beforeUpload}
                    onChange={this.handleChange}
                    onRemove={this.handleRemove}
                >
                {fileList1.length>=1?"":
                    <Button style={{width:width}}>
                        <Icon type="upload" /> 点击上传
                    </Button>}                                                                                                                                                   
                </Upload>                                               
            </div>
        )
    }
}