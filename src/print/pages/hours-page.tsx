import React, {Component} from 'react';
import GenericPage from "./generic-page";
import {Invoice} from "../../models/invoice";
import {CompanyDetails} from "../../models/companyDetails";
import {PersonalDetails} from "../../models/personalDetails";
import {HoursTable} from "../components/tables/hours-table";
import {Issuer} from "../components/issuer";
import {Spacing} from "../components/spacing";

export interface HoursPageProps {
    invoice: Invoice;
    companyDetails: CompanyDetails;
    personalDetails: PersonalDetails;
}

class HoursPage extends Component<HoursPageProps> {
    render() {
        return (
            <GenericPage invoice={this.props.invoice}
                         companyDetails={this.props.companyDetails}
                         personalDetails={this.props.personalDetails}
                         currentPage={2}
                         totalPages={2}>
                <HoursTable items={this.props.invoice.workDays}></HoursTable>
                <Spacing height={20}></Spacing>
                <Issuer personalDetails={this.props.personalDetails}
                        companyDetails={this.props.companyDetails}/>
            </GenericPage>
        );
    }
}

export default HoursPage;
