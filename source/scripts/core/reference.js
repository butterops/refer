import Clip from './_clip'
import Backend from './_backend'
import browser from 'webextension-polyfill';

export default class Reference {
    constructor({url, category}) {
        this.backend = new Backend()
        this.info = []
        this.meta = {
            time: new Date(),
            link: url,
            category: category,
            user: '',
            custom: []
        }
    }

    add({type, name, selector}){
        this.info = [...this.info, new Clip( type, name, selector)]
    }
    
    send() {
        console.log("A new capture is being sent to - " + this.backend.link)
        browser.runtime.sendMessage({
            from: 'content',
            subject: 'capturedReference',
            data: this
        });
    }
}