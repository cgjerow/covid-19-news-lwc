import { LightningElement } from 'lwc';

export default class RssFeed extends LightningElement {}


class RssChannelBuilder
{
    title;
    description;

    setTitle(title) { this.title = title; return this; }
    setDescription(description) { this.description = description; return this; }

    build()
    {
        return new RssChannel(this);
    }
}

class RssChannel
{
    get title() { return this._title }
    get description() { return this._description }
    
    _title;
    _description;

    constructor(rssChannelBuilder)
    {
        this._title = rssChannelBuilder.title;
        this._description = rssChannelBuilder.description;
    }
}

class RssItemBuilder
{
    author;
    category;
    channel;
    comments;
    description;
    enclosure;
    guid;
    link;
    pubDate;
    source;
    title;

    setAuthor(author) { this.author = author; return this; }
    setCategory(category) { this.category = category; return this; }
    setChannel(channel) { this.channel = channel; return this; }
    setComments(comments) { this.comments = comments; return this; }
    setDescription(description) { this.description = description; return this; }
    setEnclosure(enclosure) { this.enclosure = enclosure; return this; }
    setGuid(guid) { this.guid = guid; return this; }
    setLink(link) { this.link = link; return this; }
    setPubDate(pubDate) { this.pubDate = pubDate; return this; }
    setSource(source) { this.source = source; return this; }
    setTitle(title) { this.title = title; return this; }

    build()
    {
        return new RssItem(this);
    }
}

class RssItem
{
    get author() { return this._author }
    get category() { return this._category }
    get channel() { return this._channel }
    get comments() { return this._comments }
    get description() { return this._description }
    get enclosure() { return this._enclosure }
    get guid() { return this._guid }
    get link() { return this._link }
    get pubDate() { return this._pubDate }
    get source() { return this._source }
    get title() { return this._title }

    _author;
    _category;
    _channel;
    _comments;
    _description;
    _enclosure;
    _guid;
    _link;
    _pubDate;
    _source;
    _title;

    constructor(rssBuilder)
    {
        this._author = rssBuilder.author;
        this._category = rssBuilder.category;
        this._channel = rssBuilder.channel;
        this._comments = rssBuilder.comments;
        this._description = rssBuilder.description;
        this._enclosure = rssBuilder.enclosure;
        this._guid = rssBuilder.guid;
        this._link = rssBuilder.link;
        this._pubDate = rssBuilder.pubDate;
        this._source = rssBuilder.source;
        this._title = rssBuilder.title;
    }

    _diff_hours(dt2, dt1) 
    {
        var diff =(dt2.getTime() - dt1.getTime()) / 1000;
        diff /= (60 * 60);
        return Math.abs(Math.round(diff));
    }
}

export {
    RssChannel,
    RssChannelBuilder,
    RssItem,
    RssItemBuilder,
};