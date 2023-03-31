import {AppData} from "../../models/appData";
import React from "react";
import {PersonalDetailsEditor} from "../components/PersonalDetailsEditor";
import {CompanyDetailsEditor} from "../components/CompanyDetailsEditor";
import {ClientsEditor} from "../components/ClientsEditor";
import {Invoice} from "../../models/invoice";
import {Client} from "../../models/client";
import {InvoiceTable} from "../components/InvoiceTable";

export interface EditorProps {
    appData: AppData;
}

export interface EditorDispatch {
    updateAppData: (appData: AppData) => void;
    setPrintInvoice: (invoice: Invoice, language: 'EN' | 'RO') => void;
    setClient: (client: Client) => void;
}

export type EditorPropsAndDispatch = EditorProps & EditorDispatch;

export interface EditorState {
    selectedClient: Client | null;
    selectedInvoice: Invoice | null;
}

export class Editor extends React.Component<EditorPropsAndDispatch, EditorState> {
    constructor(props: EditorPropsAndDispatch) {
        super(props);

        this.state = {
            selectedClient: null,
            selectedInvoice: null
        }
    }

    render() {
        return (
            <div>
                <div className="grid grid-cols-4 w-full print:hidden">
                    <div className="mt-8 mx-4">
                        <PersonalDetailsEditor personalDetails={this.props.appData.personalDetails}
                                               updatePersonalDetails={(personalDetails) =>
                                                   this.props.updateAppData({
                                                       ...this.props.appData,
                                                       personalDetails
                                                   })}></PersonalDetailsEditor>
                    </div>
                    <div className="mt-8 mx-4">
                        <CompanyDetailsEditor companyDetails={this.props.appData.companyDetails}
                                              updateCompanyDetails={(companyDetails) =>
                                                  this.props.updateAppData({
                                                      ...this.props.appData,
                                                      companyDetails
                                                  })}></CompanyDetailsEditor>
                    </div>
                    <div className="mt-8 mx-4 col-span-2">
                        <ClientsEditor clients={this.props.appData.clients}
                                       updateClients={(clients) =>
                                           this.props.updateAppData({
                                               ...this.props.appData,
                                               clients
                                           })}
                                       clientSelected={client => {this.setState({selectedClient: client});
                                       this.props.setClient(client)}}></ClientsEditor>
                    </div>
                </div>
                <div className="print:hidden">
                    <div className="mt-8 mx-4">
                        {this.state.selectedClient &&
                            <InvoiceTable invoices={this.state.selectedClient.invoices}
                                          client={this.state.selectedClient}
                                          updateInvoices={(invoices) => {
                                if (this.state.selectedClient) {
                                    this.props.updateAppData({
                                        ...this.props.appData,
                                        clients: this.props.appData.clients.map(c => c.nonce === this.state.selectedClient?.nonce ? {...c, invoices} : c)
                                    });
                                    this.setState({selectedClient: {...this.state.selectedClient, invoices}});
                                }
                            }
                            } setPrintInvoice={this.props.setPrintInvoice}></InvoiceTable>
                        }
                    </div>
                </div>
            </div>
        )
    }
}