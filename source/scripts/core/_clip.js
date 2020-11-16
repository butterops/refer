export default class Clip {

    constructor(type, name, selector) {
        this.type = type
        this.name = name
        this.value = ''
        this.selector = selector
        switch (this.type) {
            case 'text':
                this.value = $(this.selector).text()
                break
            case 'link':
                this.value = this.selector.href //location object
                break
            case 'date':
                this.value = this.selector //date object
                break
            case 'screenshot':
                var canvas = document.createElement('canvas');
                var video = $(this.selector)[0]; // getting DOM from jq object
                var ctx = canvas.getContext('2d');

                // Change the size here
                canvas.width = parseInt(video.offsetWidth);
                canvas.height = parseInt(video.offsetHeight);
                ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

                this.value = canvas.toDataURL('image/jpeg');

                break
            default: console.error('@clipping: clip type not recognized, supported types are screenshot, text, Link and time')
        }
    }
}