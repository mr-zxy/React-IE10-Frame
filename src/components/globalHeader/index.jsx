import React from 'react';
import './index.scss';
import Avatar from './avatarDropdown';

export default class GlobalHeader extends React.Component {
    render() {
        return (
            <div className="global-header-wrapper" style={{height:React.$HEADER_HEIGHT}}>
                <span className="action">
                    <Avatar/>
                </span>
            </div>
        );
    }
}
