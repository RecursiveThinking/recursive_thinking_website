class api {

    constructor() {

    }

    appendPage(pageId) {
        const dashboardHTML = document.getElementById(pageId).import;
        const template = dashboardHTML.getElementById(pageId);
        const main = document.getElementById('main-content');
        main.innerHTML = '';
        main.appendChild(template);
    }

    init() {
        window.addEventListener('DOMContentLoaded', function(e) {
            e.preventDefault();
            console.log(e);
            console.log(document.getElementById('main-content'));
        });
    }

}
const recursiveApi = new api();
recursiveApi.init();
// recursiveApi.appendPage('dashboardHTML');


