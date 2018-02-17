import { data, utils } from '../scripts/global';
import serverApi from '../scripts/serverApi'

export default (function() {

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
            serverApi.getDeveloperProfiles();
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

    window.onload = function() {
        buildCurrentUserDashInfo()
        const recursiveApi = new api();
        recursiveApi.init();
    };

    function buildCurrentUserDashInfo(){
        const currentUser = data.getCurrentUser();
        // console.log("In Function");
        const currentUserDashInfo = document.getElementById('currentUserDashInfo');
        // console.log(currentUserDashInfo);
        // make div
        const divDevInfo = document.createElement('div');
        divDevInfo.className = `fc-devInfo`;
            // make img
            const devImage = document.createElement('img');
            devImage.className = `sidebarImage`;
            // console.log(currentUser.name);
            if(!currentUser.image){
                currentUser.image = './public/images/avatar1.png';
            }
            devImage.setAttribute('src', `${currentUser.image}`)
            // connect
            divDevInfo.appendChild(devImage)
            // make h2 heading
            const h2DevName = document.createElement('h2');
            h2DevName.className = `devName`;
            h2DevName.innerText = `${currentUser.name}`;
            // connect
            divDevInfo.appendChild(h2DevName);
            // make h3 heading
            const h3DevTitle = document.createElement('h3');
            h3DevTitle.className = `devTitle`;
            h3DevTitle.innerText = `${currentUser.title}`;
            // connect
            divDevInfo.appendChild(h3DevTitle);
        //connect
        currentUserDashInfo.appendChild(divDevInfo);
    }

})();
