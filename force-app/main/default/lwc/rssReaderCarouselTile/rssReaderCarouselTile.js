import { LightningElement, api } from 'lwc';
import { RssItem, RssChannel } from 'c/rssFeed';
import { NumberRangeTrafficFieldConfiguration } from 'c/visualIndicatorField';

export default class RssReaderCarouselTile extends LightningElement 
{
    @api 
    get item() { return this._item }; // RssItem
    set item(value) 
    {
        if (!value instanceof RssItem) 
            throw new Error('Invalid Argument: The item attribute only supports RssItem class');
        this._item = value;
    }
    _item;
    
    @api isFirst;
    @api isLast;
    get firstOrLast() { return this.isFirst || this.isLast; }
    get tileClass() 
    {
        let tileClass = 'slds-box slds-box_x-small ';
        if (!this.isFirst) tileClass += ' slds-m-left_small ';

        return tileClass;
    }
}