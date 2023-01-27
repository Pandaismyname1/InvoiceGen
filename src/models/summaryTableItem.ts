export class SummaryTableItem {
    description: string;
    unit: string;

    // In cents
    unitCost: number;
    quantity: number;

    constructor(description: string, unit: string, unitCost: number, quantity: number) {
        this.description = description;
        this.unit = unit;
        this.unitCost = unitCost;
        this.quantity = quantity;
    }

    get totalCost(): number {
        return this.unitCost * this.quantity;
    }

    get unitCostFormattedWithCurrency(): string {
        return this.unitCost.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
    }

    get totalCostFormattedWithCurrency(): string {
        return this.totalCost.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
    }

}