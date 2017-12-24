(function() {

    function appendPage(pageId) {
        const dashboardHTML = document.getElementById(pageId).import;
        const template = dashboardHTML.getElementById(pageId);
        const main = document.getElementById('main-content');
        main.innerHTML = '';
        main.appendChild(template);
    }

    window.addEventListener('DOMContentLoaded', function(e) {
        e.preventDefault();
        const location = window.location.hash.replace('#','');

        switch(location){
            case 'dashboard':
                appendPage('dashboardHTML');
                break;
            default:
                break;
        }

        console.log(document.getElementById('main-content'));
    });

})();
