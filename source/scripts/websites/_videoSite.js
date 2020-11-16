import Reference from '../core/reference'

export default class VideoSite {
    constructor(pageContext, buttonContainer, fields) {
        this.pageContext = pageContext
        this.fields = fields
        this.buttonContainer = buttonContainer
        this.capture = () => {
            var reference = new Reference(this.pageContext)
            for (var i = 0; i < this.fields.length; i++) {
                reference.add(this.fields[i])
            }
            reference.send()
        }
        this.captureButton = () => {
            return `
              <button title="Take Notes" class="ytp-button refer-video-capture-btn">
                  <svg height="80%" version="1.1" viewBox="0 0 26 86" width="80%"><use class="ytp-svg-shadow"></use><path d="M46 14h8v48H18a8 8 0 0 1-8-8V8 M46 34l-7.9-6-8.1 6V10h16v24z M30 14H16a6 6 0 0 1 0-12h34" fill="transparent" stroke="#fff" stroke-width="5" id="ytp-id-16"></path></svg>
              </button>`
        }

        // prepend a new button in the Youtube video player
        $(this.buttonContainer).prepend(this.captureButton())

        // bind capture video details to the click of new button 
        $(document).on('click', '.refer-video-capture-btn', () => { this.capture() })
    }
}