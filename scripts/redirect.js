import { templates } from './templater';
import { utils } from './global';
import { signOut } from './auth';

import * as dashboard from '../templates/dashboard'
import * as upcomingLessons from '../templates/upcomingLessons'
import * as voteForLesson from '../templates/voteForLesson'
import * as editProfile from '../templates/editProfile'
import * as interviewPrep from '../templates/interviewPrep'
import * as recursiveDirectory from '../templates/recursiveDirectory'
import * as homeScreen from '../templates/homeScreen'

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
                window.location.hash = "dashboard";
                dashboard.setup(renderPage)
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
