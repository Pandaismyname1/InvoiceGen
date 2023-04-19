import {Invoice} from "../../models/invoice";
import React from "react";
import {DataTable, DataTableRowEditCompleteParams, DataTableRowReorderParams} from "primereact/datatable";
import {Client} from "../../models/client";
import {Column, ColumnEditorOptions} from "primereact/column";
import {InputText} from "primereact/inputtext";
import {Calendar} from "primereact/calendar";
import {ConfirmDialog} from "primereact/confirmdialog";
import {Dialog} from "primereact/dialog";
import {TimesheetEditor} from "./TimesheetEditor";
import {InputNumber} from "primereact/inputnumber";
import {Exchange} from "../../Exchange";

export interface InvoiceTableProps {
    client: Client;
    invoices: Invoice[];
}

export interface InvoiceTableDispatch {
    updateInvoices: (invoices: Invoice[]) => void;
    setPrintInvoice: (invoice: Invoice, language: 'EN' | 'RO') => void;
}

export type InvoiceTablePropsAndDispatch = InvoiceTableProps & InvoiceTableDispatch;

export interface InvoiceTableState {
    invoiceToDelete: Invoice | null;
    editableInvoice: Invoice | null;
}

export class InvoiceTable extends React.Component<InvoiceTablePropsAndDispatch, InvoiceTableState> {
    constructor(props: InvoiceTablePropsAndDispatch) {
        super(props);

        this.state = {
            invoiceToDelete: null,
            editableInvoice: null
        }
    }

    render() {
        const header = (
            <div className="flex justify-between">
                <h3 className="text-xl">Invoices</h3>
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        onClick={() => this.props.updateInvoices([...this.props.invoices, new Invoice(this.props.client.hourlyRate, this.props.client.defaultWorkDescription)])}>
                    Add new invoice
                </button>
            </div>
        );

        const deleteButton = (rowData: Invoice) => {
            return (
                <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                        onClick={() => {
                            this.setState({invoiceToDelete: rowData})
                        }}>
                    Delete
                </button>
            );
        }

        const confirmDelete = () => {
            if (this.state.invoiceToDelete) {
                this.props.updateInvoices(this.props.invoices.filter(c => c !== this.state.invoiceToDelete));
                this.setState({invoiceToDelete: null});
            }
        }


        const onRowReorder = (e: DataTableRowReorderParams) => {
            let _clients = [...this.props.invoices];
            let {dragIndex, dropIndex} = e;

            _clients.splice(dropIndex, 0, _clients.splice(dragIndex, 1)[0]);

            this.props.updateInvoices(_clients);
        }

        const textEditor = (options: ColumnEditorOptions) => {
            return <InputText type="text" value={options.value}
                              onChange={(e) => options.editorCallback?.(e.target.value)}/>;
        }

        const dateEditor = (options: ColumnEditorOptions) => {
            const date = new Date(options.value);
            return <Calendar value={date} onChange={(e) => options.editorCallback?.(e.value)}/>;
        }

        const invoiceDateBody = (rowData: Invoice) => {
            const date = new Date(rowData.invoiceDate);
            return <span>{date.toLocaleDateString()}
            </span>
        }

        const invoiceDueDateBody = (rowData: Invoice) => {
            const date = new Date(rowData.invoiceDueDate);
            return <span>{date.toLocaleDateString()}
            </span>
        }

        const onRowEditComplete = (e: DataTableRowEditCompleteParams) => {
            let invoices = [...this.props.invoices];
            let {newData, index} = e;

            invoices[index] = newData;

            this.props.updateInvoices(invoices);
        }

        const editDetailsButton = (rowData: Invoice) => {
            return (
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        onClick={() => {
                            this.setState({editableInvoice: rowData});
                        }}
                >
                    Timesheet
                </button>
            );
        }

        const printEN = (rowData: Invoice) => {
            return (
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        onClick={() => {
                            this.props.setPrintInvoice(rowData, "EN");
                            document.title = `Invoice ${rowData.invoiceNumber} EN`

                            setTimeout(() => {
                                window.print()
                            }, 100);
                        }}
                >
                    Print
                </button>
            );
        }

        const printRO = (rowData: Invoice) => {
            return (
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        onClick={() => {
                            this.props.setPrintInvoice(rowData, "RO");
                            document.title = `Invoice ${rowData.invoiceNumber} RO`

                            setTimeout(() => {
                                window.print()
                            }, 100);
                        }}
                >
                    Print
                </button>
            );
        }

        const updateTimesheet = (timesheet: Invoice) => {
            this.setState({editableInvoice: timesheet});
            this.props.updateInvoices(this.props.invoices.map(i => i.nonce === this.state.editableInvoice?.nonce ? timesheet : i));
        }

        const currencyEditor = (options: ColumnEditorOptions) => {
            return <InputNumber value={options.value} mode="currency" currency="USD" locale="en-US"
                                onChange={(e) => options.editorCallback?.(e.value)}/>;
        }

        const hourlyRateBody = (options: Invoice) => {
            const rate = Number(options.hourlyRate);
            return <span>{rate.toLocaleString('en-US', {style: 'currency', currency: 'USD'})}
            </span>;
        }

        const totalBody = (options: Invoice) => {
            const total = Invoice.computeTotal(options);
            return <span>{total.toLocaleString('en-US', {style: 'currency', currency: 'USD'})}
            </span>;
        }

        const totalInRonBody = (options: Invoice) => {
            const date = new Date(options.invoiceDate);
            const rate = Exchange.getExchangeRate(date, "USD");
            if (!rate) {
                return <span>Rate not found</span>;
            }
            const total = Invoice.computeTotal(options);
            const totalInRon = total * Number(rate);
            return <span>{totalInRon.toLocaleString('ro-RO', {style: 'currency', currency: 'RON'})}
            </span>;
        }

        const ronRateBody = (options: Invoice) => {
            const date = new Date(options.invoiceDate);
            const rate = Exchange.getExchangeRate(date, "USD");
            if (!rate) {
                return <span>Rate not found</span>;
            }
            return <span>{Number(rate)}
            </span>;
        }

        const totalHoursBody = (options: Invoice) => {
            const hours = options.workDays.reduce((acc, day) => acc + day.hours, 0);
            return <span>{hours.toFixed(2)}
            </span>;
        }

        const orderedInvoices = this.props.invoices.sort((a, b) => a.invoiceDate > b.invoiceDate ? -1 : 1);

        return (
            <div>
                <h2 className="text-2xl">Invoices</h2>
                <div className="mt-8">
                    <DataTable value={orderedInvoices}
                               paginator={true} rows={10} rowsPerPageOptions={[10, 20, 50]}
                               header={header} reorderableRows onRowReorder={onRowReorder}
                               editMode="row" dataKey="companyName" onRowEditComplete={onRowEditComplete}
                               responsiveLayout="scroll"
                    >
                        <Column rowReorder headerStyle={{width: '3rem'}} bodyStyle={{textAlign: 'center'}}></Column>
                        <Column field="invoiceNumber" header="Invoice Number" editor={textEditor}/>
                        <Column field="defaultWorkDescription" header="Work Description" editor={textEditor}/>
                        <Column field="invoiceDate" header="Invoice Date" editor={dateEditor} body={invoiceDateBody}/>
                        <Column field="invoiceDueDate" header="Due Date" editor={dateEditor} body={invoiceDueDateBody}/>
                        <Column field="hourlyRate" header="Hourly Rate" editor={(options) => currencyEditor(options)} body={hourlyRateBody}></Column>
                        <Column header="Worked Hours" body={totalHoursBody} headerStyle={{width: '8%', minWidth: '8rem'}}></Column>
                        <Column header="Invoice Total" body={totalBody} headerStyle={{width: '8%', minWidth: '8rem'}}></Column>
                        <Column header="RON Rate" body={ronRateBody} headerStyle={{width: '8%', minWidth: '8rem'}}></Column>
                        <Column header="RON Total" body={totalInRonBody} headerStyle={{width: '8%', minWidth: '8rem'}}></Column>
                        <Column header="Edit" rowEditor headerStyle={{width: '8%', minWidth: '8rem'}}
                                bodyStyle={{textAlign: 'center'}}></Column>
                        <Column header={"Timesheet"} body={editDetailsButton} headerStyle={{width: '5%', minWidth: '8rem'}}
                                bodyStyle={{textAlign: 'center'}}></Column>
                        <Column header="Print EN" body={printEN} headerStyle={{width: '5%', minWidth: '8rem'}}
                                bodyStyle={{textAlign: 'center'}}></Column>
                        <Column header="Print RO" body={printRO} headerStyle={{width: '5%', minWidth: '8rem'}}
                                bodyStyle={{textAlign: 'center'}}></Column>
                        <Column header="Delete" body={deleteButton} headerStyle={{width: '5%', minWidth: '8rem'}}
                                bodyStyle={{textAlign: 'center'}}></Column>
                    </DataTable>
                </div>
                <ConfirmDialog header="Delete client" visible={this.state.invoiceToDelete !== null}
                               message={`Are you sure you want to delete ${this.state.invoiceToDelete?.invoiceNumber}?`}
                               onHide={() => this.setState({invoiceToDelete: null})} accept={() => {
                    confirmDelete()
                }}></ConfirmDialog>
                <Dialog  header="Edit Invoice" visible={this.state.editableInvoice !== null} style={{ width: '600px' }}
                         onHide={() => this.setState({editableInvoice: null})}>
                    {this.state.editableInvoice && <TimesheetEditor invoice={this.state.editableInvoice}
                                                                     updateInvoice={updateTimesheet}/>}
                </Dialog>
            </div>
        );
    }
}

