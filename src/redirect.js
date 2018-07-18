import { templates } from './templater';
import { utils } from './global';
import { signOut } from './auth';

import * as dashboard from './pages/dashboard'
import * as upcomingLessons from './pages/upcomingLessons'
import * as voteForLesson from './pages/voteForLesson'
import * as setupProfile from './pages/setupProfile'
import * as editProfile from './pages/editProfile'
import * as viewProfile from './pages/viewProfile'
import * as interviewPrep from './pages/interviewPrep'
import * as recursiveDirectory from './pages/recursiveDirectory'
import * as homeScreen from './pages/homeScreen'

export default (function() {
    function renderPage(template) {
        const main = document.getElementById('main-content');
        main.innerHTML = '';

        if (typeof template === "string")
            main.appendChild(templates[template].page);

        else
            main.appendChild(template);
    }

    // Appends HTML template, then runs associated setup scripts
    function hashRouting() {
        const location = window.location.hash.replace('#','');
        utils.checkFullScreen(location);
        switch (location) {
            case 'home': 
                homeScreen.setup(renderPage)
                break;
            case 'dashboard':
                dashboard.setup(renderPage)
                break;
            case 'upcoming-lessons':
                upcomingLessons.setup(renderPage)
                break;
            case 'vote-for-lessons':
                voteForLesson.setup(renderPage)
                break;
            case 'edit-profile':
                editProfile.setup(renderPage)
                break;
            case 'setup-profile':
                setupProfile.setup(renderPage)
                break;
            case 'view-profile':
                viewProfile.setup(renderPage);
                break;
            case 'sign-out':
                signOut()
                    .then((res) => {
                        homeScreen.setup(renderPage)
                    })
                    .catch((err) => {
                        console.log(err);
                    });
                break;
            case 'interview-prep':
                interviewPrep.setup(renderPage)
                break;
            case 'recursive-directory':
                recursiveDirectory.setup(renderPage)
                break;
            default:
                // window.location.hash = "dashboard";
                // dashboard.setup(renderPage)
                window.location.hash = "home";
                homeScreen.setup(renderPage)
                break;

        // run this after the routing so that if we change the route we get the right titel
        utils.setTitle();
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
