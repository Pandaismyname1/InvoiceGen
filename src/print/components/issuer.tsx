import {PersonalDetails} from "../../models/personalDetails";
import React from "react";
import {CompanyDetails} from "../../models/companyDetails";

export interface IssuerProps {
    personalDetails: PersonalDetails;
    companyDetails: CompanyDetails;
    language: 'EN' | 'RO';
}

export interface IssuerDispatch {

}

export type IssuerPropsAndDispatch = IssuerProps & IssuerDispatch;

export class Issuer extends React.Component<IssuerPropsAndDispatch, {}> {

    render() {
        return (
            <div className="flex flex-row">
                <div>
                <h2>{this.props.language === 'EN' ? 'Issued by' : 'Factura emisa de'}</h2>
                <h2>{this.props.personalDetails.name} </h2>
                <h2>{this.props.language === 'EN' ? 'Owner of' : 'Asociat unic al'} {this.props.companyDetails.companyName}</h2>
                </div>
                <div>
                    <img width={50}
                         src={this.props.personalDetails.signatureBase64} alt="Signature"/>
                </div>
            </div>
        );
    }
}