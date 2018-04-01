import { models } from '../models/models';
import { templates, fill } from './templater';
import { modalInterview } from '../templates/interviewPrep';
import { homeScreen } from '../templates/homeScreen';
import { modalLessons } from '../templates/voteForLesson';
// import { setUpDashboard } from '../templates/dashboard';
import { editProfilePicture } from '../templates/editProfilePicture';
import { editProfile } from '../templates/editProfile';
import { utils, data } from './global';
import { signOut } from './auth';

export default (function() {
    function setUpPage(template) {
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
                setUpPage('homeScreen');
                homeScreen();
                break;
            case 'dashboard':
                import('../templates/dashboard')
                    .then(dashboard => setUpPage(dashboard.setup()))
                break;
            case 'upcoming-lessons':
                setUpPage(fill(templates.upcomingLessons.page, models.getUpcomingLessonsModel()));
                break;
            case 'vote-for-lessons':
                setUpPage(fill(templates.voteForLesson.page, models.getVoteForLessonsModel()));
                modalLessons();
                break;
            case 'edit-profile':
                // setUpPage('editProfile');
                setUpPage(fill(templates.editProfile.page, models.getEditProfileModel()));
                editProfile();
                editProfilePicture();
                break;
            case 'sign-out':
                signOut()
                    .then((res) => {
                        setUpPage('homeScreen');
                        homeScreen();
                    })
                    .catch((err) => {
                        console.log(err);
                    });
                break;
            case 'interview-prep':
                // setUpPage('interviewPrep');
                setUpPage(fill(templates.interviewPrep.page, models.getInterviewPrepModel()));
                modalInterview();
                break;
            case 'recursive-directory':
                setUpPage(fill(templates.recursiveDirectory.page, models.getRecursiveDirectoryModel()));
                break;
            default:
                window.location.hash = "dashboard";
                setUpPage(fill(templates.dashboard.page, models.getDashboardModel()));
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
