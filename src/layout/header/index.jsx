import React from 'react';
import './index.scss';
import GlobalHeader from '../../components/globalHeader';
import {Icon} from 'antd'
import {connect} from 'react-redux'
import {setToggleCollapsed} from '@/redux/actions/utils'

class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            collapsed: false,
        };
    }

    toggleCollapsed = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        }, () => {
            this.props.toggleCollapsed(this.state.collapsed)
        });
    };

    render() {
        return (
            <div className='header-wrapper' style={{height: React.$HEADER_HEIGHT}}>
                <div className={"sidebar-flag"}
                     style={{height: React.$HEADER_HEIGHT, lineHeight: React.$HEADER_HEIGHT + 4 + 'px'}}>
                    <i onClick={() => this.toggleCollapsed()}>
                        {this.state.collapsed ? <Icon type="menu-unfold" /> : <Icon type="menu-fold" />}
                    </i>
                </div>
                <GlobalHeader/>
                {this.props.children}
            </div>
        );
    }
}

let mapStatePropsTo = () => {
    return {}
}
let mapDispatchPropsTo = (dispatch) => {
    return {
        toggleCollapsed: (flag) => dispatch(setToggleCollapsed(flag))
    }
}
export default connect(mapStatePropsTo, mapDispatchPropsTo)(Header)
