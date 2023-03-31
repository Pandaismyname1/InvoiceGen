import {Component} from "react";
import {Exchange} from "../../Exchange";
import {Invoice} from "../../models/invoice";

export interface VatAndConversionRatesProps {
    invoice: Invoice;
}
export class VatAndConversionRates extends Component<VatAndConversionRatesProps> {

    render() {
        return (
            <div>
                <div>
                    <p>Societatea este neplatitoare de TVA.</p>
                </div>
                <div>
                    <p><b>Sume in RON (curs {this.cursUSD()}): Valoare {this.totalInRON()}, TVA 0.00 RON,
                        TOTAL {this.totalInRON()}</b></p>
                </div>
            </div>
        );
    }

    private cursUSD() {
        const date = new Date(this.props.invoice.invoiceDate);
        const rate = Exchange.getExchangeRate(date, "USD");
        if (!rate) {
            return <span>Rate not found</span>;
        }
        return <span>{Number(rate)}
            </span>;
    }

    private totalInRON() {
        const totalHours = this.props.invoice.workDays.reduce((acc, curr) => acc + curr.hours, 0);
        const totalInUSD = totalHours * this.props.invoice.hourlyRate;
        const date = new Date(this.props.invoice.invoiceDate);
        const rate = Exchange.getExchangeRate(date, "USD");
        if (!rate) {
            return <span>Rate not found</span>;
        }
        return <span>{(Number(rate) * totalInUSD).toLocaleString('ro-RO', {style: 'currency', currency: 'RON'})}
            </span>;
    }

}