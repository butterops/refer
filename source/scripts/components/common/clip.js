export default class Clip {

    constructor(type, data) {
        this.type = type //Screenshots,Images,Texts,Lists,Checklists,Articles
        this.data = data
    }

    get data(){
        return this.data
    }

    get type(){
        return this.type
    }

}