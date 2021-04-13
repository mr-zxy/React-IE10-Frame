import React,{Component} from 'react';
import './index.scss'
import { Card } from 'antd';
export default class packCard extends Component{
    constructor(props){
        super(props)
    }
    render() {
        return (
            <div {...this.props} className={this.props.className?this.props.className+" container-packCard":'container-packCard'}>
                <Card>
                    {this.props.children}
                </Card>
            </div>
        );
    }
}
