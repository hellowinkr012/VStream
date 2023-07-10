// NAV MENU JS
// 1). THE MENU BUTTON

var navbar_container={
    "side-menu":document.getElementById("side-menu"),
    "side-menu-container":document.getElementById("side-menu-container"),
    "quick-menu-container":document.getElementById("quick-menu-containers"),
    "recent-medias":document.querySelector("#recent-medias"),
}

// SIDE MENU JS
class SideMenuLink {
    texts="";
    icon="";
    elements;
    constructor(data) {
        this.texts=data.key;
        this.icon=data.icon;
        this.elements=this.create();
    }
    create() {
        let markup=`
                <div class="bg-blue-l-2 h-bg-blue-d-1 color-white poppins-sans-serif-font content-font-3xs p-relative d-flex d-row -p-4">
                    <span class="content-font material-symbols-outlined -p-4 color-blue-l-1">${this.icon}</span><div class=" d-flex items-center full-w -p-4" >${this.texts}</div> 
                </div>`;
        return markup;
    };
};

let side_menu_data=[
    {"key":"Playlist","icon":"subscriptions"},
    {"key":"Languages","icon":"translate"},
    {"key":"Searches","icon":"movie_filter"}
]
let nav_side_menu=new Menu(navbar_container["side-menu"], SideMenuLink ,"#side-menu > div", "",side_menu_data);
nav_side_menu.render();

// SHOW MENU ON CLICK OF BUTOON AND HIDE AFTER CLICK AGAINS

navbar_container["side-menu-container"].addEventListener("mousedown",(event)=> {
    showMenu(event.target.parentElement,"menu-show");
});

// QUICK NAVIGATION AT TOP
class QuickNavigationLinkTop {
    link="";
    links=new Array();
    elements;
    constructor(data) {
        this.link=data.key;
        this.links=data.value ;
        this.elements=this.create();
    }
    create() {
        let link_groups=``;
        for (let element in this.links) {
            link_groups+=`
                    <li class="color-white h-bg-blue-d-1 -p-2 open-sans-font content-font-xs">${this.links[element]}</li>
            `;
        };
        let markup=`
                <div id="quick-menu" class="menu-show-reveal p-relative d-flex -p-4">
                    <button class="no-border no-outline link-1" >${this.link }</button>
                    <menu class="z-2 opacity-none shadow-md bg-blue-l-2 left-0 top-100 spacing-0 p-absolute">
                        <ul class="default-list spacing-0 d-flex d-column">
                        ${link_groups}</ul> </menu>
                </div>
            `
        return markup ;
    };
};

let quick_link_data=fetchData("../Data/navigation_link.json");
let menu_quick_link;
quick_link_data.then((data)=> {
    let result_data=Object.entries(data).map((element)=> {
        return {"key":element[0],"value":element[1]};
    });

    menu_quick_link=new Menu(navbar_container["quick-menu-container"],QuickNavigationLinkTop,"#quick-menu > button","",result_data) ;
    menu_quick_link.render();
});

// RECENT MEDIA OF FRONT MAIN PAGE
class RecentAreaDisplay {
    text="";
    links=new Array();
    tags=new Array() ;
    elements;
    constructor(data) {
        this.text=data.key;
        this.desc=data.value.description ;
        this.tags=data.value.tag;

        this.elements=this.create();
    }
    create() {
        let tags_markup=``;
        for (let tag_index in this.tags) {tags_markup+=`<span class="recent-media-tag">${this.tags[tag_index]}</span>` ;
        };
        let markup=`
            <div class="d-flex p-relative   wide-section-landscape" >
                <div class="recent-media-data open-sans-font full-h -p-2">
                        <div class="-p-2 color-white heading-font-2xl"> ${this.text}</div>
                        <div class="color-white-gray -p-2 heading-font-1xs"> ${tags_markup} </div>
                        <div id="recent-media-description" class="color-white-gray -p-2 heading-font-1xs"> ${this.desc}</div>
                </div>
                <div id="recent-media-img" class="p-relative full-h p-2">
                    <div class="full-w full-h">

                    </div>
                </div>
            </div>
        `
        return markup ;
    };
};
let recent_media_data=fetchData("../Data/movie_details__.json");
let recent_media;
recent_media_data.then((data)=> {
    let result_data=Object.entries(data).map((element)=> {
        return {"key":element[0],"value":element[1]};
    });


    recent_media=new Menu(navbar_container["recent-medias"],RecentAreaDisplay,"#recent-medias","",result_data) ;
    recent_media.render();
});
