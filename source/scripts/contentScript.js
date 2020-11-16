import Youtube from './websites/youtube.com'

class PageContext {
    constructor(location) {
        this.location = location
        if (this.location.href.startsWith('https://www.youtube.com/watch?v=')) {
            this.category = 'videos:youtube'
            new Youtube(this)
        }
    }
}
$(document).ready(function(){
    var currentPage = new PageContext(location)
})
