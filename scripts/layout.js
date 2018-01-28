class api {

    constructor() {

    }

    init() {
        // do stuff when page loads
        window.addEventListener('load', function(e) {
            e.preventDefault();
            console.log(e);
            console.log(document.getElementById('main-content'));
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
