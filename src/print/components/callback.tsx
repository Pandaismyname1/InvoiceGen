export interface CallbackProps {
    contactName: string;
    contactEmail: string;
    contactPhone: string;
}

export function Callback(props: CallbackProps) {
    return <div className="text-center print:fixed print:bottom-2 print:left-0 print:right-0">If you have any questions concerning this invoice, contact
        <span className="font-bold ml-2">{props.contactName}</span>,
        <span className="font-bold ml-2">{props.contactPhone}</span>, <br/>
        <span className="font-bold">{props.contactEmail}</span>
    </div>
}