import {Component} from "react";
import {Invoice} from "../../models/invoice";

export interface EssentialsProps {
    invoice: Invoice;
}

export class Essentials extends Component<EssentialsProps> {
    formatInvoiceDate() {
        const date = new Date(this.props.invoice.invoiceDate);
        return date.toLocaleDateString();
    }

    formatDueDate() {
        const date = new Date(this.props.invoice.invoiceDueDate);
        return date.toLocaleDateString();
    }

    render() {
        return (
            <div className="flex flex-row justify-between">
                <div className="flex flex-col">
                    <div>
                        <span className="font-bold text-blue-800 uppercase">Invoice number:</span> {this.props.invoice.invoiceNumber}
                    </div>
                    <div>
                        <span className="font-bold text-blue-800 uppercase">Invoice date:</span> {this.formatInvoiceDate()}
                    </div>
                    <div>
                        <span className="font-bold text-blue-800 uppercase">Due date:</span> {this.formatDueDate()}
                    </div>
                </div>
            </div>
        );
    }
}