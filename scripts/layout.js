class api {

    constructor() {

    }

    init() {
        window.addEventListener('load', function(e) {
            e.preventDefault();
            const headerheight = document.getElementsByTagName("header")[0].offsetHeight;
            const mainContainer = document.getElementById("mainWindow");
            mainContainer.style.marginTop = `${headerheight}px`;
        });


        // adding our click listener to each sidebar item
        const sidebarItems = document.getElementsByClassName('sidebar-item');
        const sideBarItemsArray = Array.from(sidebarItems);
        sideBarItemsArray.forEach((item) => {
            item.addEventListener('click', () => {
                const pageId = item.getAttribute('data-pageId');
                window.location.hash = pageId;
            });
        });
    }

}
const recursiveApi = new api();
recursiveApi.init();
