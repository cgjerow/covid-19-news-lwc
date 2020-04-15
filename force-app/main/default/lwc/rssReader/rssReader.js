import { LightningElement, api, track } from 'lwc';
import { RssChannelBuilder, RssItemBuilder } from 'c/rssFeed';

const WHO_FEED = 'https://www.who.int/rss-feeds/news-english.xml';
const GOOGLE_NEWS_FEED = 'https://news.google.com/rss/search?q=covid+19&hl=en-US&gl=US&ceid=US:en'
const CDC_FEED = 'https://tools.cdc.gov/api/v2/resources/media/404952.rss';
export default class RssReader extends LightningElement 
{
    @api url = CDC_FEED;
    @track _rssItems = [];

    connectedCallback()
    {
        this.readRssFeed();
    }

    @api getRssItems()
    {
        return this.readRssFeed();
    }

    async readRssFeed()
    {
        this._rssItems = [];
        const response = await fetch(this.url);
        const data = new window.DOMParser().parseFromString(await response.text(), "text/xml")
        const items = data.querySelectorAll("item");
        const channel = data.querySelector("channel");
        const rssChannel = 
            new RssChannelBuilder()
                .setTitle(channel.querySelector("title") ? channel.querySelector("title").innerHTML : '')
                .setDescription(channel.querySelector("description") ? channel.querySelector("description").innerHTML : '')
                .build();
        items.forEach(el => {
            this._rssItems.push(
                new RssItemBuilder()
                    .setChannel(rssChannel)
                    .setAuthor(el.querySelector("author") ? el.querySelector("author").innerHTML : '')
                    .setCategory(el.querySelector("category") ? el.querySelector("category").innerHTML : '')
                    .setComments(el.querySelector("comments") ? el.querySelector("comments").innerHTML : '')
                    .setDescription(el.querySelector("description") ? this.decodeHTML(el.querySelector("description").innerHTML) : '')
                    .setEnclosure(el.querySelector("enclosure") ? el.querySelector("enclosure").innerHTML : '')
                    .setGuid(el.querySelector("guid") ? el.querySelector("guid").innerHTML : '')
                    .setLink(el.querySelector("link") ? el.querySelector("link").innerHTML : '')
                    .setPubDate(el.querySelector("pubDate") ? el.querySelector("pubDate").innerHTML : '')
                    .setSource(el.querySelector("source") ? el.querySelector("source").innerHTML : '')
                    .setTitle(el.querySelector("title") ? el.querySelector("title").innerHTML : '')
                    .build()
            );
        });
    }

    decodeHTML(html) 
    {
        var txt = document.createElement('textarea');
        txt.innerHTML = html;
        return txt.value;
    }
}