import React, {Component} from 'react';

export interface HeaderProps {
    companyName: string;
}

class Header extends Component<HeaderProps> {
    render() {
        return (
            <div className="flex flex-row justify-between">
                <div className="text-3xl font-bold text-blue-900">
                    {this.props.companyName}
                </div>
                <div className="text-6xl font-bold text-blue-800">
                    INVOICE
                </div>
            </div>
        );
    }
}

export default Header;