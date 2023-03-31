import React, {useState} from 'react';
import './App.css';
import SummaryPage from "./print/pages/summary-page";
import "primereact/resources/themes/lara-light-indigo/theme.css"  //theme
import "primereact/resources/primereact.min.css"                  //core css
import "primeicons/primeicons.css"
import {AppData} from "./models/appData";
import {Client} from "./models/client";
import {Invoice} from "./models/invoice";
import {Editor} from "./setup/pages/Editor";
import {useLocalStorage} from "primereact/hooks";
import HoursPage from "./print/pages/hours-page";
import {Callback} from "./print/components/callback";                                //icons

function App() {
    const [appData, setAppData] = useLocalStorage<AppData>(new AppData(), 'appData');
    const [printableInvoice, setPrintableInvoice] = useState<Invoice | null>(null);
    const [printableLanguage, setPrintableLanguage] = useState<'EN' | 'RO'>('EN');
    const [client, setClient] = useState<Client | null>(null);
    return (
        <div>
            <Editor appData={appData} updateAppData={(appData) => setAppData(appData)}
                    setPrintInvoice={(invoice, language) => {
                        setPrintableInvoice(invoice)
                        setPrintableLanguage(language)
                    }}
                    setClient={(client) => {
                        setClient(client)
                    }}></Editor>
            {printableInvoice && client && printableLanguage &&
                <div className="hidden print:block">
                    <SummaryPage invoice={printableInvoice}
                                 companyDetails={appData.companyDetails}
                                 personalDetails={appData.personalDetails}
                                 language={printableLanguage}
                                 client={client}></SummaryPage>
                    {printableLanguage === 'EN' &&
                    <HoursPage invoice={printableInvoice}
                               companyDetails={appData.companyDetails}
                               personalDetails={appData.personalDetails}></HoursPage>
                    }

                    <Callback contactName={appData.personalDetails.name}
                              contactEmail={appData.personalDetails.email}
                              contactPhone={appData.personalDetails.phone}></Callback>
                </div>
            }
        </div>
    );
}

export default App;
