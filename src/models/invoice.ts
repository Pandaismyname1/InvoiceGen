import {Summary} from "./summary";
import {SummaryTableItem} from "./summaryTableItem";
import {WorkDay} from "./workDay";

export class Invoice {
    nonce: number = Math.random();
    invoiceNumber: string = "";
    invoiceDate: Date = new Date();
    invoiceDueDate: Date = new Date(new Date().setDate(this.invoiceDate.getDate() + 14));
    additionalItems: Summary = new Summary();
    defaultWorkDescription: string = "";
    workDays: WorkDay[] = [];
    hourlyRate: number = 1000;

    constructor(hourlyRate: number, defaultWorkDescription: string) {
        this.hourlyRate = hourlyRate;
        this.defaultWorkDescription = defaultWorkDescription;
    }

    static computeSummary(invoice: Invoice, workDescription: string): Summary {
        const computedWorkDayEntry = invoice.workDays.reduce((total, workDay) => total + workDay.hours, 0);
        const summary = new Summary();
        summary.items.push(new SummaryTableItem(workDescription, "Hour", invoice.hourlyRate, computedWorkDayEntry));
        summary.items.push(...invoice.additionalItems.items);
        return summary;
    }

    static computeTotal(invoice: Invoice): number {
        return Invoice.computeSummary(invoice, "").total;
    }
}

