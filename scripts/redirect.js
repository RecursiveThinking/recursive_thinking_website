import { models } from '../models/models';
import { templates, fill } from './templater';
import { modalInterview } from '../templates/interviewPrep';
import { homeScreen } from '../templates/homeScreen';
import { modalLessons } from '../templates/voteForLesson';
import { setUpDashboard } from '../templates/dashboard';
import { editProfilePicture } from '../templates/editProfilePicture';
import { utils, data } from './global';

export default (function() {
    function appendPage(pageId) {
        const main = document.getElementById('main-content');
        main.innerHTML = '';
        main.appendChild(templates[pageId].page);
    }

    function setUpPage(template) {
        const main = document.getElementById('main-content');
        main.innerHTML = '';
        main.appendChild(template);
    }

    // Appends HTML template, then runs associated setup scripts
    function hashRouting() {
        const location = window.location.hash.replace('#','');
        utils.checkFullScreen(location);
        switch (location) {
            case 'home':
                appendPage('homeScreen');
                homeScreen();
                break;
            case 'dashboard':
                setUpPage(fill(templates.dashboard.page, models.getDashboardModel()));
                break;
            case 'upcoming-lessons':
                setUpPage(fill(templates.upcomingLessons.page, models.getUpcomingLessonsModel()));
                break;
            case 'vote-for-lessons':
                setUpPage(fill(templates.voteForLesson.page, models.getVoteForLessonsModel()));
                modalLessons();
                break;
            case 'edit-profile':
                // appendPage('editProfile');
                setUpPage(fill(templates.editProfile.page, models.getEditProfileModel()));
                editProfilePicture();
                break;
            case 'sign-out':
                appendPage('signOut');
                break;
            case 'interview-prep':
                // appendPage('interviewPrep');
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
