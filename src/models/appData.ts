import {CompanyDetails} from "./companyDetails";
import {Client} from "./client";
import {PersonalDetails} from "./personalDetails";

export class AppData {
    personalDetails: PersonalDetails = new PersonalDetails();
    companyDetails: CompanyDetails = new CompanyDetails();
    clients: Client[] = [];
}