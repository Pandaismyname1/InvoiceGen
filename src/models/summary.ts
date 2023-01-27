import {SummaryTableItem} from "./summaryTableItem";

export class Summary {
    items: SummaryTableItem[] = [];

    get subTotal(): number {
        return this.items.reduce((total, item) => total + item.totalCost, 0);
    }

    get subTotalFormatted(): string {
        return (this.subTotal / 100).toFixed(2);
    }

    get subTotalFormattedWithCurrency(): string {
        return `$${this.subTotalFormatted}`;
    }

    get total(): number {
        return this.subTotal;
    }

    get totalFormatted(): string {
        return (this.total / 100).toFixed(2);
    }

    get totalFormattedWithCurrency(): string {
        return `$${this.totalFormatted}`;
    }

    get invoicedTotal(): number {
        return this.total;
    }

    get invoicedTotalFormatted(): string {
        return (this.invoicedTotal / 100).toFixed(2);
    }

    get invoicedTotalFormattedWithCurrency(): string {
        return `$${this.invoicedTotalFormatted}`;
    }
}