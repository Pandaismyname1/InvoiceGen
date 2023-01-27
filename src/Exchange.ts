import XMLData from './data/bnr-2022.xml';

const xml = new DOMParser().parseFromString(XMLData, 'text/xml');
const dates = xml.querySelectorAll('Cube');

const getExchangeRate = (date: Date, currency: string) => {
    const dateNode = Array.from(dates).find((node) => node.getAttribute('date') === date.toISOString().slice(0, 10));
    const rateNode = dateNode?.querySelector(`Rate[currency='${currency}']`);

    return rateNode?.innerHTML;
}