export default class Reference {
    constructor(info, link) {
        this.info = info
        this.link = link
    }

    send() {
        console.log("clip sent to - localhost:3002", this.info)
    }

}