import {PersonalDetails} from "../../models/personalDetails";
import React from "react";
import {CompanyDetails} from "../../models/companyDetails";

export interface IssuerProps {
    personalDetails: PersonalDetails;
    companyDetails: CompanyDetails;
}

export interface IssuerDispatch {

}

export type IssuerPropsAndDispatch = IssuerProps & IssuerDispatch;

export class Issuer extends React.Component<IssuerPropsAndDispatch, {}> {

    render() {
        return (
            <div className="flex flex-row">
                <div>
                <h2>Issued by: </h2>
                <h2>{this.props.personalDetails.name} </h2>
                <h2>Owner of {this.props.companyDetails.companyName}</h2>
                </div>
                <div>
                    <img width={50}
                         src={this.props.personalDetails.signatureBase64} alt="Signature"/>
                </div>
            </div>
        );
    }
}