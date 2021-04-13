import React, {Component} from 'react';
import {ReactSVG} from 'react-svg'
import {Spin} from 'antd';
import './index.scss'

/**
 * https://www.npmjs.com/package/react-svg 文档
 * 坑 1.引入必须解构引入
 *   2. src 里面必须包裹require(path)
 *
 beforeInjection={(svg) => {
                          console.log('before')
                      }}  加载前
 afterInjection={(error, svg) => {

                          console.log('after')
                      }}   加载后
 onClick={() => {
                          console.log('wrapper onClick')
                      }}   点击
 fallback={() => <span>Error!</span>} 记载失败
 */
class SvgIcon extends Component {

    constructor(props) {
        super(props)
    }

    render() {
        let {icon, isload = true} = this.props;
        let url = null
        try {
            url = require(`@/assets/icons/svg/${icon}.svg`)
        } catch (e) {
            url = ''
        }
        return (
            <ReactSVG src={url}
                      loading={() => isload !== 'false' && <Spin/>} // 加载loading
                      useRequestCache={true}  // 缓存
                      wrapper="span"
                      {...this.props}
            />
        )

    }
}

export default SvgIcon
