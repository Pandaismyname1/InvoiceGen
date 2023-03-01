
export class Exchange {
    static loadedFiles: { [key: string]: string } = {};
    static getExchangeRate (date: Date, currency: string) {
        const fileName = `data/bnr-${date.getFullYear()}.xml`;
        let xmlFile: string;
        if (!Exchange.loadedFiles[fileName]) {
            const request = new XMLHttpRequest();
            request.open('GET', fileName, false);
            request.send(null);
            xmlFile = request.responseText;
            Exchange.loadedFiles[fileName] = xmlFile;
        } else {
            xmlFile = Exchange.loadedFiles[fileName];
        }

        const xml = new DOMParser().parseFromString(xmlFile, 'text/xml');
        const dates = xml.querySelectorAll('Cube');

        const xmlDate = new Date(date);
        let dateNode = Array.from(dates).find((node) => node.getAttribute('date') === date.toISOString().slice(0, 10));

        while (!dateNode && xmlDate > new Date(2022, 0, 1)) {
            xmlDate.setDate(xmlDate.getDate() - 1);
            dateNode = Array.from(dates).find((node) => node.getAttribute('date') === xmlDate.toISOString().slice(0, 10));
        }

        const rateNode = dateNode?.querySelector(`Rate[currency='${currency}']`);

        return rateNode?.innerHTML;
    }
}