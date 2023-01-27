import {Invoice} from "./invoice";

export class Client {
    nonce: number = Math.random();
    companyName: string = "";
    address1: string = "";
    address2: string = "";
    phone: string = "";
    email: string = "";
    defaultWorkDescription: string = "";
    hourlyRate: number = 1000;
    invoices: Invoice[] = [];
}