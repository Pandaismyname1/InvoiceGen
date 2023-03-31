import React, {Component} from 'react';
import {ToDetails} from "../components/to-details";
import {Spacing} from "../components/spacing";
import {SummaryTable} from "../components/tables/summary-table";
import {SummaryTableItem} from "../../models/summaryTableItem";
import GenericPage from "./generic-page";
import {Invoice} from "../../models/invoice";
import {CompanyDetails} from "../../models/companyDetails";
import {PersonalDetails} from "../../models/personalDetails";
import {Client} from "../../models/client";
import {VatAndConversionRates} from "../components/vat-and-conversion-rates";
import {Issuer} from "../components/issuer";


export interface SummaryPageProps {
    invoice: Invoice;
    companyDetails: CompanyDetails;
    personalDetails: PersonalDetails;
    client: Client;
    language: 'EN' | 'RO';
}

export class SummaryPage extends Component<SummaryPageProps> {
    render() {

        const items: SummaryTableItem[] = Invoice.computeSummary(this.props.invoice, this.props.invoice.defaultWorkDescription).items;

        return (
            <div className="print:break-after-page">
            <GenericPage invoice={this.props.invoice}
                         companyDetails={this.props.companyDetails}
                         personalDetails={this.props.personalDetails}
                         language={this.props.language}
                         currentPage={1}
                         totalPages={2}>
                <Spacing height={10}></Spacing>
                <ToDetails companyName={this.props.client.companyName}
                           address1={this.props.client.address1}
                           address2={this.props.client.address2}
                           phone={this.props.client.phone}
                           email={this.props.client.email}></ToDetails>
                <Spacing height={10}></Spacing>
                <SummaryTable items={items}></SummaryTable>
                {this.props.language === 'RO' && <VatAndConversionRates invoice={this.props.invoice}></VatAndConversionRates>}
                {this.props.language === 'RO' &&
                    <div>
                        <Spacing height={10}></Spacing>
                        <Issuer personalDetails={this.props.personalDetails}
                                companyDetails={this.props.companyDetails}
                                language={this.props.language}/>
                    </div>}
            </GenericPage>
            </div>
        );
    }
}

export default SummaryPage;