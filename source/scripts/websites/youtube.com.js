import VideoSite from './_videoSite'

export default class Youtube {
  constructor(pageContext) {
    this.pageContext = pageContext
    this.buttonContainer = '.ytp-right-controls'
    this.fields = [
      {
        type: 'text',
        name: 'videoTitle',
        selector: 'h1.title.ytd-video-primary-info-renderer',
      },
      {
        type: 'link',
        name: 'videoUrl',
        selector: this.pageContext.location
      },
      {
        type: 'text',
        selector: '.ytp-time-current',
        name: 'videoCurrentTime'
      },
      {
        type: 'screenshot',
        selector: '.html5-main-video',
        name: 'videoScreenshot'
      }
    ]
    
    new VideoSite(this.pageContext, this.buttonContainer, this.fields)
  }
}