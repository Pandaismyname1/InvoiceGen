import {Client} from "../../models/client";
import React from "react";
import {
    DataTable,
    DataTableRowEditCompleteParams,
    DataTableRowReorderParams,
    DataTableSelectionChangeParams
} from "primereact/datatable";
import {Column, ColumnEditorOptions} from "primereact/column";
import {InputText} from "primereact/inputtext";
import {Dialog} from "primereact/dialog";
import {ConfirmDialog} from "primereact/confirmdialog";
import {InputNumber} from "primereact/inputnumber";
import {Invoice} from "../../models/invoice";

export interface ClientsEditorProps {
    clients: Client[];
}

export interface ClientsEditorDispatch {
    updateClients: (clients: Client[]) => void;
    clientSelected?: (client: Client) => void;
}

export interface ClientsEditorState {
    selectedClient: Client | null;
    clientToDelete: Client | null;
}

export type ClientsEditorPropsAndDispatch = ClientsEditorProps & ClientsEditorDispatch;

export class ClientsEditor extends React.Component<ClientsEditorPropsAndDispatch, ClientsEditorState> {
    constructor(props: ClientsEditorPropsAndDispatch) {
        super(props);

        this.state = {
            selectedClient: null,
            clientToDelete: null
        };
    }

    render() {
        const header = (
            <div className="flex justify-between">
                <h3 className="text-xl">Clients</h3>
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        onClick={() => this.props.updateClients([...this.props.clients, new Client()])}>
                    Add new client
                </button>
            </div>
        );


        const textEditor = (options: ColumnEditorOptions) => {
            return <InputText type="text" value={options.value}
                              onChange={(e) => options.editorCallback?.(e.target.value)}/>;
        }
        const currencyEditor = (options: ColumnEditorOptions) => {
            return <InputNumber value={options.value} mode="currency" currency="USD" locale="en-US"
                              onChange={(e) => options.editorCallback?.(e.value)}/>;
        }

        const hourlyRateBody = (options: Client) => {
            const rate = Number(options.hourlyRate);
            return <span>{rate.toLocaleString('en-US', {style: 'currency', currency: 'USD'})}
            </span>;
        }

        const onRowEditComplete = (e: DataTableRowEditCompleteParams) => {
            let _clients = [...this.props.clients];
            let {newData, index} = e;

            _clients[index] = newData;

            this.props.updateClients(_clients);
        }

        const deleteButton = (rowData: Client) => {
            return (
                <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                        onClick={() => {
                            this.setState({clientToDelete: rowData})
                        }}>
                    Delete
                </button>
            );
        }

        const confirmDelete = () => {
            if (this.state.clientToDelete) {
                this.props.updateClients(this.props.clients.filter(c => c !== this.state.clientToDelete));
                this.setState({clientToDelete: null});
            }
        }


        const onRowReorder = (e: DataTableRowReorderParams) => {
            let _clients = [...this.props.clients];
            let {dragIndex, dropIndex} = e;

            _clients.splice(dropIndex, 0, _clients.splice(dragIndex, 1)[0]);

            this.props.updateClients(_clients);
        }


        const onRowSelect = (e: DataTableSelectionChangeParams) => {
            this.setState({selectedClient: e.value});
            if (this.props.clientSelected) {
                this.props.clientSelected(e.value);
            }
        }

        return (
            <div>
                <h2 className="text-2xl">Customers</h2>
                <div className="mt-8">
                    <DataTable value={this.props.clients}
                               paginator={true} rows={10} rowsPerPageOptions={[10, 20, 50]}
                               header={header} reorderableRows onRowReorder={onRowReorder}
                               editMode="row" dataKey="companyName" onRowEditComplete={onRowEditComplete}
                               responsiveLayout="scroll"
                               selectionMode="single" selection={this.state.selectedClient}
                               onSelectionChange={onRowSelect}>
                        <Column rowReorder headerStyle={{width: '3rem'}} bodyStyle={{textAlign: 'center'}}></Column>
                        <Column field="companyName" header="Name" editor={(options) => textEditor(options)}></Column>
                        <Column field="address1" header="Address1" editor={(options) => textEditor(options)}></Column>
                        <Column field="address2" header="Address2" editor={(options) => textEditor(options)}></Column>
                        <Column field="phone" header="Phone" editor={(options) => textEditor(options)}></Column>
                        <Column field="email" header="Email" editor={(options) => textEditor(options)}></Column>
                        <Column field="defaultWorkDescription" header="Work Desc" editor={(options) => textEditor(options)}></Column>
                        <Column field="hourlyRate" header="Hourly Rate" editor={(options) => currencyEditor(options)} body={hourlyRateBody}></Column>
                        <Column header="Edit" rowEditor headerStyle={{width: '10%', minWidth: '8rem'}}
                                bodyStyle={{textAlign: 'center'}}></Column>
                        <Column header="Delete" body={deleteButton} headerStyle={{width: '10%', minWidth: '8rem'}}
                                bodyStyle={{textAlign: 'center'}}></Column>
                    </DataTable>
                </div>
                <ConfirmDialog header="Delete client" visible={this.state.clientToDelete !== null}
                               message={`Are you sure you want to delete ${this.state.clientToDelete?.companyName}?`}
                               onHide={() => this.setState({clientToDelete: null})} accept={() => {
                    confirmDelete()
                }}></ConfirmDialog>
            </div>
        )
    }
}