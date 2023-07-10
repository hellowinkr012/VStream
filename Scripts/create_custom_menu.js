class Menu {
    list=[];
    items={};

    search;
    linker;
    style="";
    container;
    constructor(container,linker,search,style="",list=[]) {
        this.container=container;
        if (container==undefined) {
            this.container=document.createElement("menu");
        }
        
        this.linker=linker;
        this.list=list;
        this.search=search ;
    }
    render() {
        this.list.forEach((element)=> {
            this.items[element.key]={};
            this.items[element.key]["link"]=new this.linker(element) ;    
            this.container.insertAdjacentHTML("beforeend",this.items[element.key][ "link"].elements) ;
        });
    }
}

function showMenu(element,className) {
    if (element.className.includes(className)) { element.classList.remove(className);}
    else { element.classList.add(className); }
}
