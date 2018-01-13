(function() {

    function appendPage(pageId) {
        const dashboardHTML = document.getElementById(pageId).import;
        const template = dashboardHTML.getElementById(pageId).cloneNode(true);
        const main = document.getElementById('main-content');
        main.innerHTML = '';
        main.appendChild(template);
    }

    function hashRouting() {
        const location = window.location.hash.replace('#','');
        switch(location){
            case 'dashboard':
                appendPage('dashboardHTML');
                break;
            case 'upcoming-lessons':
                appendPage('upcomingLessonsHTML');
                break;
            case 'vote-for-lessons':
                appendPage('voteForLessonHTML');
                break;
            case 'edit-profile':
                appendPage('editProfileHTML');
                break;
            case 'sign-out':
                appendPage('signOutHTML');
                break;
            case 'interview-prep':
                appendPage('interviewPrepHTML');
                break;
            case 'recursive-directory':
                appendPage('recursiveDirectoryHTML');
                break;
            default:
                break;
        }
    }

    window.addEventListener('hashchange', function(e) {
        e.preventDefault();
        hashRouting();
    });
    window.addEventListener('load', function(e) {
        e.preventDefault();
        hashRouting();
    });

})();
