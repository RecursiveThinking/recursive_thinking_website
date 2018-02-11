(function() {
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
        switch (location) {
            case 'dashboard':
                appendPage('dashboard');
                setUpDashboard();
                break;
            case 'upcoming-lessons':
                var allLessons = JSON.parse(localStorage.getItem('allLessons'));
                
                setUpPage(fill(templates.upcomingLessons.page, {
                    upcomingLessons: allLessons.map(lesson => {
                        let formattedDate = getFormattedLessonDate(new Date(lesson.date))
                        return fill(templates.upcomingLessons.lessonSummary, {
                            day: formattedDate.dateOfMonth,
                            month: formattedDate.monthAsString,
                            year: formattedDate.year,
                            title: lesson.title
                        })
                    })
                }))

                break;
            case 'vote-for-lessons':
                appendPage('voteForLesson');
                setUpVoteForLesson();
                break;
            case 'edit-profile':
                appendPage('editProfile');
                // setUpEditProfile();
                break;
            case 'sign-out':
                appendPage('signOut');
                // setUpSignOut();
                break;
            case 'interview-prep':
                appendPage('interviewPrep');
                // setUpInterviewPrep();
                break;
            case 'recursive-directory':

                var allUsers = JSON.parse(localStorage.getItem('allUsers'));
            
                recursiveApi.getDeveloperProfiles(); // not used yet

                setUpPage(fill(templates.recursiveDirectory.page, {
                    recursiveDirectory: allUsers.map((user) => fill(templates.recursiveDirectory.developer, {
                        // name, title and location are slots where you can insert text (or HTML) or DOM Elements
                        name: user.name,
                        title: user.title,
                        location: user.location,
                        // picture is attribute insertion (find slot="picture")
                        picture: {
                            // insert these attributes into the element tagged as a slot
                            src: `./public/images/${randomAvatar()}`, 
                            alt: `Profile picture for ${user.name}` 
                        }
                    }))
                }));

                // setUpRecursiveDirectory();
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
