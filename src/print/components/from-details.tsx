import {Component} from "react";

export interface FromDetailsProps {
    address1: string;
    address2: string;
    phone: string;
    registrationNumber: string;
    vatNumber: string;
    capital: string;
    bank: string;
    bankAccount: string;
    language: 'EN' | 'RO';
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
                <div>
                    <b>{this.props.language === 'EN' ? 'Phone' : 'Tel'}:</b> {this.props.phone}
                </div>
                <div >
                    <b>Reg. No.:</b> {this.props.registrationNumber}
                </div>
                {this.props.language === 'RO' && <div>
                    <b>Reg. Capital.:</b> {this.props.capital}
                </div>}
                {this.props.language === 'RO' && <div>
                    <b>Banca:</b> {this.props.bank}
                </div>}
                {this.props.language === 'RO' && <div>
                    <b>IBAN:</b> {this.props.bankAccount}
                </div>}
                <div >
                    <b>{this.props.language === 'EN' ? 'VAT.No. / Tax Id' : 'CUI'}:</b> {this.props.vatNumber}
                </div>
            </div>
        );
    }

}