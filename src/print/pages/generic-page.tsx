import React, {Component} from 'react';
import PageCounter from "../components/page-counter";
import Header from "../components/header";
import {Spacing} from "../components/spacing";
import {FromDetails} from "../components/from-details";
import {Essentials} from "../components/essentials";
import {Invoice} from "../../models/invoice";
import {CompanyDetails} from "../../models/companyDetails";
import {PersonalDetails} from "../../models/personalDetails";

export interface GenericPageProps {
    children: React.ReactNode;
    invoice: Invoice;
    companyDetails: CompanyDetails;
    personalDetails: PersonalDetails;
    currentPage: number;
    totalPages: number;
    language: 'EN' | 'RO';

}

class GenericPage extends Component<GenericPageProps> {
    render() {
        return (
            <div>
                <PageCounter currentPage={this.props.currentPage} totalPages={this.props.totalPages}></PageCounter>
                <Header companyName={this.props.companyDetails.companyName}></Header>
                <Spacing height={20}></Spacing>
                <div className="w-full flex flex-row justify-between">
                    <div>
                        <FromDetails address1={this.props.companyDetails.address1}
                                     address2={this.props.companyDetails.address2}
                                     phone={this.props.companyDetails.phone}
                                     language={this.props.language}
                                     registrationNumber={this.props.companyDetails.registrationNumber}
                                     vatNumber={this.props.companyDetails.vatNumber}
                                     bank={this.props.companyDetails.bankName}
                                     bankAccount={this.props.companyDetails.bankAccountNumber}
                                     capital={this.props.companyDetails.capital}></FromDetails>
                    </div>
                    <div>
                        <Essentials invoice={this.props.invoice} language={this.props.language}></Essentials>
                    </div>
                </div>
                <Spacing height={20}></Spacing>
                {this.props.children}
            </div>
        );
    }
}

export default GenericPage;