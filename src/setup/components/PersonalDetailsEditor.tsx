import {PersonalDetails} from "../../models/personalDetails";
import React, {ChangeEvent} from "react";
import { InputText } from 'primereact/inputtext';

export interface PersonalDetailsEditorProps {
    personalDetails: PersonalDetails;
}

export interface PersonalDetailsEditorDispatch {
    updatePersonalDetails: (personalDetails: PersonalDetails) => void;
}

export type PersonalDetailsEditorPropsAndDispatch = PersonalDetailsEditorProps & PersonalDetailsEditorDispatch;

export class PersonalDetailsEditor extends React.Component<PersonalDetailsEditorPropsAndDispatch, {}> {

    constructor(props: PersonalDetailsEditorPropsAndDispatch) {
        super(props);
    }

    signatureChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files![0];
        const reader = new FileReader();
        reader.onload = (e) => {
            this.props.updatePersonalDetails({
                ...this.props.personalDetails,
                signatureBase64: (e.target as any).result
            })
        };
        reader.readAsDataURL(file);
    }

    render() {
        return (
            <div>
                <h2 className="text-2xl">Personal Details</h2>
                <br/>
                <div className="p-grid">
                    <div className="p-col-12 p-md-6 mt-8">
                        <span className="p-float-label">
                            <InputText id="name" value={this.props.personalDetails.name}
                                       onChange={(e) => this.props.updatePersonalDetails({
                                           ...this.props.personalDetails,
                                           name: (e.target as HTMLInputElement).value
                                       })}/>
                            <label htmlFor="name">First Name</label>
                        </span>
                    </div>
                    <div className="p-col-12 p-md-6 mt-8">
                        <span className="p-float-label">
                            <InputText id="email" value={this.props.personalDetails.email}
                                       onChange={(e) => this.props.updatePersonalDetails({
                                           ...this.props.personalDetails,
                                           email: (e.target as HTMLInputElement).value
                                       })}/>
                            <label htmlFor="email">Email</label>
                        </span>
                    </div>
                    <div className="p-col-12 p-md-6 mt-8">
                        <span className="p-float-label">
                            <InputText id="phone" value={this.props.personalDetails.phone}
                                       onChange={(e) => this.props.updatePersonalDetails({
                                           ...this.props.personalDetails,
                                           phone: (e.target as HTMLInputElement).value
                                       })}/>
                            <label htmlFor="phone">Phone</label>
                        </span>
                    </div>
                    <div className="p-col-12 p-md-6 mt-8">
                        <span className="p-float-label">
                            <input type="file" id="signature" onChange={this.signatureChange}></input>
                        </span>
                        <img src={this.props.personalDetails.signatureBase64} alt="Signature" width="100" height="100"/>
                    </div>
                </div>
            </div>
        );
    }
}