import VideoSite from './_videoSite'

export default class Lynda {
  constructor(pageContext) {
    this.pageContext = pageContext
    this.buttonContainer = 'vjs-control-bar'
    this.fields = [
      {
        type: 'text',
        name: 'videoTitle',
        selector: 'h1.course-banner__headline',
      },
      {
        type: 'link',
        name: 'videoUrl',
        selector: this.pageContext.location
      },
      {
        type: 'text',
        selector: 'vjs-current-time-display',
        name: 'videoCurrentTime'
      },
      {
        type: 'screenshot',
        selector: 'vjs-tech',
        name: 'videoScreenshot'
      }
    ]
    
    new VideoSite(this.pageContext, this.buttonContainer, this.fields)
  }
}