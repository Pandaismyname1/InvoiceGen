import {WorkDay} from "../../../models/workDay";
import {DataTable} from "primereact/datatable";
import {Column} from "primereact/column";

export interface HoursTableProps {
    items: WorkDay[];
}

export function HoursTable(props: HoursTableProps) {


    const workDayBody = (rowData: WorkDay) => {
        const date = new Date(rowData.date);
        return date.toLocaleDateString();
    }

    const footer = (
        <div className="flex flex-row-reverse">
            <div>
                    <span
                        className="font-bold text-blue-800 uppercase">Total:</span> {props.items.reduce((acc, item) => acc + item.hours, 0)} Hours
            </div>
        </div>
    );

    const hoursBody = (rowData: WorkDay) => {
        return rowData.hours.toFixed(2)
    }

    return (
        <DataTable value={props.items} showGridlines size="small" footer={footer}>
            <Column field="date" header="Date" body={workDayBody}></Column>
            <Column field="unit" header="Unit" headerStyle={{width: '100px'}}></Column>
            <Column field="hours" header="Quantity" headerStyle={{width: '100px'}} body={hoursBody}></Column>
        </DataTable>
    );
}