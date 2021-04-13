import React, {Component} from 'react';
import PackTable from '@/components/packTable'
import {TextEdit,TextRemove,ButtonAdd,ButtonEdit,ButtonRemove,ButtonExport,ButtonClearCache} from '@/components/linkButton'
import SvgIcon from '@/components/svgIcon'
import './index.scss'
export default class Category extends Component {
    constructor(props) {
        super(props)
        this.dataSource = [
            {
                key: '1',
                name: '胡彦斌',
                age: 32,
                address: '西湖区湖底公园1号',
            },
            {
                key: '2',
                name: '胡彦祖',
                age: 42,
                address: '西湖区湖底公园1号',
            },
            {
                key: '3',
                name: '胡彦祖',
                age: 42,
                address: '西湖区湖底公园1号',
            },
            {
                key: '4',
                name: '胡彦祖',
                age: 42,
                address: '西湖区湖底公园1号',
            },
            {
                key: '5',
                name: '胡彦祖',
                age: 42,
                address: '西湖区湖底公园1号',
            },
            {
                key: '6',
                name: '胡彦祖',
                age: 42,
                address: '西湖区湖底公园1号',
            },
            {
                key: '7',
                name: '胡彦祖',
                age: 42,
                address: '西湖区湖底公园1号',
            },
            {
                key: '8',
                name: '胡彦祖',
                age: 42,
                address: '西湖区湖底公园1号',
            },
            {
                key: '9',
                name: '胡彦祖',
                age: 42,
                address: '西湖区湖底公园1号',
            },
            {
                key: '10',
                name: '胡彦祖',
                age: 42,
                address: '西湖区湖底公园1号',
            },
            {
                key: '11',
                name: '胡彦祖',
                age: 42,
                address: '西湖区湖底公园1号',
            },
            {
                key: '12',
                name: '胡彦祖',
                age: 42,
                address: '西湖区湖底公园1号',
            },
            {
                key: '13',
                name: '胡彦祖',
                age: 42,
                address: '西湖区湖底公园1号',
            },
            {
                key: '14',
                name: '胡彦祖',
                age: 42,
                address: '西湖区湖底公园1号',
            },
            {
                key: '15',
                name: '胡彦祖',
                age: 42,
                address: '西湖区湖底公园1号',
            },
            {
                key: '16',
                name: '胡彦祖',
                age: 42,
                address: '西湖区湖底公园1号',
            },
            {
                key: '17',
                name: '胡彦祖',
                age: 42,
                address: '西湖区湖底公园1号',
            },
            {
                key: '18',
                name: '胡彦祖',
                age: 42,
                address: '西湖区湖底公园1号',
            },
            {
                key: '19',
                name: '胡彦祖',
                age: 42,
                address: '西湖区湖底公园1号',
            },
            {
                key: '20',
                name: '胡彦祖',
                age: 42,
                address: '西湖区湖底公园1号',
            },
            {
                key: '21',
                name: '胡彦祖',
                age: 42,
                address: '西湖区湖底公园1号',
            },
        ];
        this.columns = [
            {
                title: '姓名',
                dataIndex: 'name',
                key: 'name1',
            },
            {
                title: '年龄',
                dataIndex: 'age',
                key: 'age2',
            },
            {
                title: '住址',
                dataIndex: 'address',
                key: 'address3',
            },
            {
                title: '姓名',
                dataIndex: 'name',
                key: 'name4',
            },
            {
                title: '年龄',
                dataIndex: 'age',
                key: 'age5',
            },
            {
                title: '住址',
                dataIndex: 'address',
                key: 'address6',
            },
            {
                title: '操作',
                dataIndex: '',
                key: 'x',
                render: () => <div><TextEdit/><TextRemove/></div>,
            },
        ];
    }
    onPageChange=(currentPage)=>{
        console.log(currentPage, 'currentPage')
    }
    render() {
        return (
            <div>
                <SvgIcon icon={'time'} className={'time'}/>
                <SvgIcon icon={'post'} className={'post'} />
                <ButtonAdd></ButtonAdd>
                <ButtonEdit/>
                <ButtonRemove/>
                <ButtonExport/>
                <ButtonClearCache/>
                <PackTable  dataSourceData={this.dataSource} columnsData={this.columns} total={20} pageSize={10} current={1} onPageChange={this.onPageChange}></PackTable>
            </div>
        );
    }
}

Category.propTypes = {
    // count: PropTypes.number.isRequired,
    // increment: PropTypes.func.isRequired,
    // decrement: PropTypes.func.isRequired,
    // incrementAsync: PropTypes.func.isRequired
}
