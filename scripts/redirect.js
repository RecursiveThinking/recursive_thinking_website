(function() {

    function appendPage(pageId) {
        const dashboardHTML = document.getElementById(pageId).import;
        const template = dashboardHTML.getElementById(pageId+'HTML').cloneNode(true);
        const main = document.getElementById('main-content');
        main.innerHTML = '';
        main.appendChild(template);

        // Demonstrating that the template has loaded
        console.log(document.getElementById(pageId+'HTML'));
    }

    // Appends HTML template, then runs associated setup scripts
    function hashRouting() {
        const location = window.location.hash.replace('#','');
        switch(location){
            case 'dashboard':
                appendPage('dashboard');
                setUpDashboard();
                break;
            case 'upcoming-lessons':
                appendPage('upcomingLessons');
                break;
            case 'vote-for-lessons':
                appendPage('voteForLesson');
                break;
            case 'edit-profile':
                appendPage('editProfile');
                break;
            case 'sign-out':
                appendPage('signOut');
                break;
            case 'interview-prep':
                appendPage('interviewPrep');
                break;
            case 'recursive-directory':
                appendPage('recursiveDirectory');
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
