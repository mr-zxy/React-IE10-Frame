import React, {Component} from 'react';
import {Table,ConfigProvider} from 'antd';
import PackCard from '@/components/packCard'
import zhCN from 'antd/es/locale/zh_CN';
const pageSizeOptions =['10','20','30','40','50']

export default class packTable extends Component {
    constructor(props) {
        super(props)
        this.dataSource = [];
        this.columns = []
    }
    onChange(currentPpage) {
        this.props.onPageChange(currentPpage)
    }
    onShowSizeChange = (current, size) => {
        this.props.onShowSizeChange(size)
    }
    render() {
        //isPaginationProps 是否显示分页
        let {total,current,pageSize,dataSourceData,columnsData,isPaginationProps} = this.props;
        const paginationProps = {
            total: total, // 共条数
            pageSize: pageSize, //pageSize 当前页数
            current: current,//current 当前条数
            // hideOnSinglePage: true,  // 只有一页时是否隐藏分页器
            showQuickJumper: true,
            pageSizeOptions:pageSizeOptions,
            showSizeChanger:true,   // 是否可以改变 pageSize
            showTotal: () => `共${total}条`,   // 用于显示数据总量和当前数据顺序
            onChange: (event) => this.onChange(event),
            onShowSizeChange:(value,event)=> this.onShowSizeChange(value,event)  // ageSize 变化的回调
        }
        this.dataSource = dataSourceData;  // 数据
        this.columns = columnsData  // 表头
        return (
            <div className={'container-packTable'}>
                <PackCard>
                    <ConfigProvider locale={zhCN}>
                    <Table {...this.props} dataSource={this.dataSource}   bordered={true} columns={this.columns}
                            pagination={isPaginationProps===false?false:paginationProps} />
                    </ConfigProvider>
                </PackCard>
            </div>
        )
    }
}
