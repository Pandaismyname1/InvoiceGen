import {SummaryTableItem} from "../../../models/summaryTableItem";
import {DataTable} from "primereact/datatable";
import {Column} from "primereact/column";

export interface SummaryTableProps {
    items: SummaryTableItem[];
}

export function SummaryTable(props: SummaryTableProps) {
    
    const formatToCurrency = (value: number) => {
        return new Intl.NumberFormat('en-US', {style: 'currency', currency: 'USD'}).format(value);
    }

    const footer = (
        <div className="flex flex-row-reverse">
            <div className="flex flex-col">
                <div className="border-gray-200" style={{borderBottomWidth: 1}}>
                    <span className="font-bold text-blue-800 uppercase">Subtotal:</span> {formatToCurrency(props.items.reduce((acc, item) => acc + item.totalCost, 0))}
                </div>
                <div className="border-gray-200" style={{borderBottomWidth: 1}}>
                    <span className="font-bold text-blue-800 uppercase">Total:</span> {formatToCurrency(props.items.reduce((acc, item) => acc + item.totalCost, 0))}
                </div>
                <div>
                    <span className="font-bold text-blue-800 uppercase">Invoiced Total:</span> {formatToCurrency(props.items.reduce((acc, item) => acc + item.totalCost, 0))}
                </div>
            </div>
        </div>
    );

    return (
        <DataTable value={props.items} showGridlines size="small" footer={footer}>
                <Column field="description" header="Description"></Column>
                <Column field="unit" header="Unit"></Column>
                <Column field="unitCostFormattedWithCurrency" header="Unit Cost"></Column>
                <Column field="quantity" header="Quantity"></Column>
                <Column field="totalCostFormattedWithCurrency" header="Total Cost" ></Column>
        </DataTable>
    );
}