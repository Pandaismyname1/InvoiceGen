import {Component} from "react";

export interface ToDetailsProps {
    companyName: string;
    address1: string;
    address2: string;
    phone: string;
    email: string;
}

export class ToDetails extends Component<ToDetailsProps> {
    render() {
        return (
            <div className="flex flex-col">
                <div >
                    <b>TO:</b>
                </div>
                <div>
                    <b>{this.props.companyName}</b>
                </div>
                <div>
                    {this.props.address1}
                </div>
                <div>
                    {this.props.address2}
                </div>
                <div>
                    <b>Phone:</b> {this.props.phone}
                </div>
                <div>
                    <b>Email:</b> {this.props.email}
                </div>
            </div>
        );
    }
}