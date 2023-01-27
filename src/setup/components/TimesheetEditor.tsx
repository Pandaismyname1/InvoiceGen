import {Invoice} from "../../models/invoice";
import React, {ChangeEvent} from "react";
import {DataTable, DataTableRowEditCompleteParams, DataTableRowReorderParams} from "primereact/datatable";
import {Column, ColumnEditorOptions} from "primereact/column";
import {WorkDay} from "../../models/workDay";
import {InputNumber} from "primereact/inputnumber";
import {Calendar} from "primereact/calendar";
import {Dialog} from "primereact/dialog";
import * as XLSX from 'xlsx';
import {Dropdown, DropdownChangeParams} from "primereact/dropdown";

export interface TimesheetEditorProps {
    invoice: Invoice;
}

export interface TimesheetEditorDispatch {
    updateInvoice: (invoice: Invoice) => void;
}

export type TimesheetEditorPropsAndDispatch = TimesheetEditorProps & TimesheetEditorDispatch;

export interface TimesheetEditorState {
    importPopupOpen: boolean;
    workBook: XLSX.WorkBook | null;
    selectedSheetName: string;
    selectedSheet: XLSX.WorkSheet | null;
    generatedWorkdays: WorkDay[]
}

export class TimesheetEditor extends React.Component<TimesheetEditorPropsAndDispatch, TimesheetEditorState> {
    constructor(props: TimesheetEditorPropsAndDispatch) {
        super(props);

        this.state = {
            importPopupOpen: false,
            workBook: null,
            selectedSheetName: '',
            selectedSheet: null,
            generatedWorkdays: []
        }

        this.uploadHandler = this.uploadHandler.bind(this);
        this.onSheetDropdownChange = this.onSheetDropdownChange.bind(this);
    }

    uploadHandler(event: ChangeEvent<HTMLInputElement>) {
        const reader = new FileReader();
        reader.onload = (e) => {
            if (e.target == null) return;
            const data = e.target.result;
            const workbook = XLSX.read(data, {
                raw: true,
                type: 'buffer',
                cellDates: true,
                cellNF: false,
                cellText: false
            });
            this.setState({workBook: workbook})
        }
        if (event.target.files == null) return;
        reader.readAsArrayBuffer(event.target.files[0]);
    }

    onSheetDropdownChange(e: DropdownChangeParams) {
        const sheetName = e.value as string;
        const sheet = this.state.workBook?.Sheets[sheetName];
        if (sheet == null) {
            this.setState({selectedSheetName: '', selectedSheet: null})
        } else {
            const json = XLSX.utils.sheet_to_json(sheet);
            const workDays = json.map((row: any) => {
                const start = new Date(row["Start Time"]);
                const end = new Date(row["End Time"]);
                const date = new Date(new Date(row.Date).getTime() + 1000 * 60 * 60 * 24);
                const hours = (end.getTime() - start.getTime()) / 1000 / 60 / 60;
                const result = new WorkDay();
                result.date = date;
                result.hours = hours;
                return result;
            }).filter(x => x.hours).sort((a, b) => a.date.getTime() - b.date.getTime());
            this.setState({selectedSheetName: sheetName, selectedSheet: sheet, generatedWorkdays: workDays})
        }
    }

    render() {

        const header = (
            <div className="flex justify-between">
                <h3 className="text-xl">Invoices</h3>
                <div>
                    <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 mr-2 px-4 rounded"
                            onClick={() => {
                                this.setState({importPopupOpen: true})
                            }}>
                        Import Sheet
                    </button>
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 mr-2 px-4 rounded"
                            onClick={() => this.props.updateInvoice({
                                ...this.props.invoice,
                                workDays: [...this.props.invoice.workDays, new WorkDay()]
                            })}>
                        Add new Work Day
                    </button>
                    <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                            onClick={() => {
                                const workDays: WorkDay[] = [];
                                this.props.updateInvoice({...this.props.invoice, workDays})
                            }}>
                        Clear
                    </button>
                </div>
            </div>
        );

        const onRowReorder = (e: DataTableRowReorderParams) => {
            let workDays = [...this.props.invoice.workDays];
            workDays.splice(e.dropIndex, 0, workDays.splice(e.dragIndex, 1)[0]);
            this.props.updateInvoice({...this.props.invoice, workDays});
        }


        // TODO this is not working because we have cell editing not row editing
        // TODO update the workdays when the cell is being edited
        const onRowEditComplete = (e: DataTableRowEditCompleteParams) => {
            let workDays = [...this.props.invoice.workDays];
            workDays[e.index] = e.data;
            this.props.updateInvoice({...this.props.invoice, workDays});
        }

        const deleteButton = (rowData: WorkDay) => {
            return (
                <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                        onClick={() => {
                            this.props.updateInvoice({
                                ...this.props.invoice,
                                workDays: this.props.invoice.workDays.filter(c => c !== rowData)
                            })
                        }}>
                    Delete
                </button>
            );
        }

        const workDayBody = (rowData: WorkDay) => {
            const date = new Date(rowData.date);
            return date.toLocaleDateString();
        }

        const numberEditor = (options: ColumnEditorOptions) => {
            return <InputNumber type="text" value={options.value}
                                onChange={(e) => options.editorCallback?.(e.value)}/>;
        }

        const dateEditor = (options: ColumnEditorOptions) => {
            const date = new Date(options.value);
            return <Calendar value={date}
                             onChange={(e) => options.editorCallback?.(e.value)}/>;
        }

        return (
            <div>
                <DataTable value={this.props.invoice.workDays} key="nonce"
                           header={header} reorderableRows onRowReorder={onRowReorder}
                           editMode="cell" dataKey="companyName" onRowEditComplete={onRowEditComplete}
                           responsiveLayout="scroll">
                    <Column field="date" header="Date" body={workDayBody} editor={dateEditor}/>
                    <Column field="hours" header="Hours" editor={numberEditor}/>
                    <Column header="Delete" body={deleteButton} headerStyle={{width: '5%', minWidth: '8rem'}}
                            bodyStyle={{textAlign: 'center'}}></Column>
                </DataTable>
                <Dialog header="Sheet Import" visible={this.state.importPopupOpen} style={{width: '50vw'}}
                        onHide={() => this.setState({importPopupOpen: false})}>
                    <div className="grid grid-cols-2">
                        <div className="flex flex-col">
                            <label htmlFor="sheetUpload">Upload sheet</label>
                            <input type="file" onChange={this.uploadHandler}/>
                        </div>
                        {this.state.workBook != null && <div>
                            <Dropdown id="sheetSelection" options={this.state.workBook.SheetNames} style={{width: '100%'}}
                                      value={this.state.selectedSheetName} placeholder={"Select sheet"}
                                      onChange={this.onSheetDropdownChange}/>
                        </div>}
                    </div>

                    {this.state.selectedSheet != null && <div>

                        <DataTable value={this.state.generatedWorkdays} key="nonce">
                            <Column field="date" header="Date" body={workDayBody} editor={dateEditor}/>
                            <Column field="hours" header="Hours" editor={numberEditor}/>
                        </DataTable>
                        <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                                onClick={() => {
                                    this.props.updateInvoice({
                                        ...this.props.invoice,
                                        workDays: [...this.props.invoice.workDays, ...this.state.generatedWorkdays]
                                    });
                                    this.setState({importPopupOpen: false})
                                }
                                }>
                            Import
                        </button>
                    </div>}
                </Dialog>
            </div>
        );
    }
}