import Lynda from './websites/lynda.com'
import Youtube from './websites/youtube.com'

class PageContext {
    constructor(location) {
        this.location = location
        if (this.location.href.startsWith('https://www.youtube.com/watch?v=')) {
            this.category = 'videos:youtube'
            new Youtube(this)
        }
        else if(this.location.href.startsWith('https://www.linkedin.com/learning')) {
            this.category = 'videos:lynda'
            new Lynda(this)
        }
    }
}
$(document).ready(function(){
    var currentPage = new PageContext(location)
})
