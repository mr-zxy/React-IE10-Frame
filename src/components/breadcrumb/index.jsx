import React from 'react';
import {withRouter} from 'react-router-dom';
import {Breadcrumb} from 'antd'
import './index.scss';
class BreadcrumbWrap extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            routersList: []
        }
    }

    UNSAFE_componentWillMount() {
        this.setState({
            routersList: this.props.routersList
        })
    }
    /**
     * 获取父级数据
     * @param key
     * @returns {T[]|string|*[]}
     */
    genBreadcrumb = (key) => {
        return this.getParentsById(this.state.routersList, key)
    }
    /**
     * 获取所有父级的函数
     * @param list 过滤数组
     * @param key  过滤 key
     * @returns {T[] | string | T[]|*[]}
     */
    getParentsById = (list, key) => {
        for (let i in list) {
            if (list[i].path == key) {
                return [list[i]];
            }
            if (list[i].children) {
                let node = this.getParentsById(list[i].children, key);
                if (node != undefined) {
                    return node.concat(list[i]);
                }
            }
        }
    };

    render() {
        let currentPath = this.props.location.pathname.replace('/', '')
        let breadcrumbNodes = []
        try {
            breadcrumbNodes = this.genBreadcrumb(currentPath).reverse()
        } catch (e) {
        }
        return (
            <div className="breadcrumb-wrapper" style={{height: React.$BREADCRUMB + 'px'}}>
                <Breadcrumb>
                    {
                        breadcrumbNodes && breadcrumbNodes.length && breadcrumbNodes.map(item => <Breadcrumb.Item
                            key={item.path}>{item.meta.title}</Breadcrumb.Item>)
                    }
                </Breadcrumb>
            </div>
        );
    }
}

export default withRouter(BreadcrumbWrap)

