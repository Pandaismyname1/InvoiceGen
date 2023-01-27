import React, {Component} from 'react';

export interface PageCounterProps {
    currentPage: number;
    totalPages: number;
}

export class PageCounter extends Component<PageCounterProps> {
    render() {
        return (
            <div className="flex flex-row-reverse">
                <div >
                    Page <b>{this.props.currentPage}</b> of <b>{this.props.totalPages}</b>
                </div>
            </div>
        );
    }
}

export default PageCounter;