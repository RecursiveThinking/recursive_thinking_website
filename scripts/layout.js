class api {

    constructor() {
        this.apiUrl = "https://6a3h75mkhi.execute-api.us-east-1.amazonaws.com/Prod"
    }

    init() {
        // window.addEventListener('load', function(e) {
        //     e.preventDefault();
        //     const headerheight = document.getElementsByTagName("header")[0].offsetHeight;
        //     const mainContainer = document.getElementById("mainWindow");
        //     mainContainer.style.marginTop = `${headerheight}px`;
        // });

        // adding our click listener to each sidebar item
        const sidebarItems = document.getElementsByClassName('sidebar-item');
        const sideBarItemsArray = Array.from(sidebarItems);
        sideBarItemsArray.forEach((item) => {
            item.addEventListener('click', () => {
                const pageId = item.getAttribute('data-pageId');
                window.location.hash = pageId;
                window.scrollTo(0, 0);
            });
        });
    }

    getDeveloperProfiles() {
        const resource = "/developer";

        const options = {
            method: "GET"
        };
        fetch(this.apiUrl + resource, options)
            .then((data) => {
                return data.json();
            })
            .then((response) => {
                console.log("shit worked", response);
                return response;
            })
            .catch((err) => {
                console.log("shit broke ", err);
                return err;
            })
    }

}
const recursiveApi = new api();
recursiveApi.init();
