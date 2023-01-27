import {CompanyDetails} from "../../models/companyDetails";
import React from "react";
import {InputText} from "primereact/inputtext";

export interface CompanyDetailsEditorProps {
    companyDetails: CompanyDetails;
}

export interface CompanyDetailsEditorDispatch {
    updateCompanyDetails: (companyDetails: CompanyDetails) => void;
}

export type CompanyDetailsEditorPropsAndDispatch = CompanyDetailsEditorProps & CompanyDetailsEditorDispatch;

export class CompanyDetailsEditor extends React.Component<CompanyDetailsEditorPropsAndDispatch, {}> {
    render() {
        return (
            <div>
                <h2 className="text-2xl">Company Details</h2>
                <br/>
                <div className="p-grid">
                    <div className="p-col-12 p-md-6 mt-8">
                        <span className="p-float-label">
                            <InputText id="companyName" value={this.props.companyDetails.companyName}
                                       onChange={(e) => this.props.updateCompanyDetails({
                                           ...this.props.companyDetails,
                                           companyName: (e.target as HTMLInputElement).value
                                       })}/>
                            <label htmlFor="companyName">Company Name</label>
                        </span>
                    </div>
                    <div className="p-col-12 p-md-6 mt-8">
                        <span className="p-float-label">
                            <InputText id="companyAddress1" value={this.props.companyDetails.address1}
                                       onChange={(e) => this.props.updateCompanyDetails({
                                           ...this.props.companyDetails,
                                           address1: (e.target as HTMLInputElement).value
                                       })}/>
                            <label htmlFor="companyAddress1">Address 1</label>
                        </span>
                    </div>
                    <div className="p-col-12 p-md-6 mt-8">
                        <span className="p-float-label">
                            <InputText id="companyAddress2" value={this.props.companyDetails.address2}
                                       onChange={(e) => this.props.updateCompanyDetails({
                                           ...this.props.companyDetails,
                                           address2: (e.target as HTMLInputElement).value
                                       })}/>
                            <label htmlFor="companyAddress2">Address 2</label>
                        </span>
                    </div>
                    <div className="p-col-12 p-md-6 mt-8">
                        <span className="p-float-label">
                            <InputText id="companyPhone" value={this.props.companyDetails.phone}
                                       onChange={(e) => this.props.updateCompanyDetails({
                                           ...this.props.companyDetails,
                                           phone: (e.target as HTMLInputElement).value
                                       })}/>
                            <label htmlFor="companyPhone">Phone</label>
                        </span>
                    </div>
                    <div className="p-col-12 p-md-6 mt-8">
                        <span className="p-float-label">
                            <InputText id="companyEmail" value={this.props.companyDetails.email}
                                       onChange={(e) => this.props.updateCompanyDetails({
                                           ...this.props.companyDetails,
                                           email: (e.target as HTMLInputElement).value
                                       })}/>
                            <label htmlFor="companyEmail">Email</label>
                        </span>
                    </div>
                    <div className="p-col-12 p-md-6 mt-8">
                        <span className="p-float-label">
                            <InputText id="companyRegistrationNumber"
                                       value={this.props.companyDetails.registrationNumber}
                                       onChange={(e) => this.props.updateCompanyDetails({
                                           ...this.props.companyDetails,
                                           registrationNumber: (e.target as HTMLInputElement).value
                                       })}/>
                            <label htmlFor="companyRegistrationNumber">Registration Number</label>
                        </span>
                    </div>
                    <div className="p-col-12 p-md-6 mt-8">
                        <span className="p-float-label">
                            <InputText id="companyVatNumber" value={this.props.companyDetails.vatNumber}
                                       onChange={(e) => this.props.updateCompanyDetails({
                                           ...this.props.companyDetails,
                                           vatNumber: (e.target as HTMLInputElement).value
                                       })}/>
                            <label htmlFor="companyVatNumber">VAT Number</label>
                        </span>
                    </div>
                </div>
            </div>
        )
    }
}