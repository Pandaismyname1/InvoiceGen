import {Component} from "react";

export interface FromDetailsProps {
    address1: string;
    address2: string;
    phone: string;
    registrationNumber: string;
    vatNumber: string;
}

export class FromDetails extends Component<FromDetailsProps> {
render() {
        return (
            <div className="flex flex-col">
                <div >
                    <b>FROM:</b>
                </div>
                <div >
                    {this.props.address1}
                </div>
                <div >
                    {this.props.address2}
                </div>
                <div >
                    <b>Phone:</b> {this.props.phone}
                </div>
                <div >
                    <b>Reg. No.:</b> {this.props.registrationNumber}
                </div>
                <div >
                    <b>VAT.No. / Tax Id:</b> {this.props.vatNumber}
                </div>
            </div>
        );
    }

}