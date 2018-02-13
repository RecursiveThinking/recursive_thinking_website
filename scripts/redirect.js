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
                // appendPage('voteForLesson');
                // setUpVoteForLesson();
                var allUsers = JSON.parse(localStorage.getItem('allUsers'))
                // var allLessons = JSON.parse(localStorage.getItem('allLessons'));
                var allLessons = JSON.parse(localStorage.getItem('allLessons'));
                let lessonLimit = 4;
                setUpPage(fill(templates.voteForLesson.page, {
                    voteForLesson: allLessons.map(lesson => {
                        let filteredTaughtByUserArray = returnFilteredTaughtByUserArray(lesson.lessonTaughtBy);
                        // console.log(filteredTaughtByUserArray);
                        return fill(templates.voteForLesson.displayALesson, {
                            title: lesson.title,
                            description: lesson.description,
                            lessonVotes: getLessonVoteString(lesson),
                            // lessonTeachers: lesson.lessonTaughtBy.map((image) => {
                            //     return `<img class="avatarThumbRound" src="./public/images/avatar${image}.png" alt="avatar${image} - Sweet Mug">`
                            // })
                            lessonTeachers: filteredTaughtByUserArray.map(userObj => fill(templates.voteForLesson.displayTaughtByLessons, {
                                    imgAttrs: {
                                        // src: `./public/images/avatar${image}.png`,
                                        src: `${userObj["image"]}`,
                                        alt: `Lesson ${lesson.title} will be taught by ${userObj["name"]}`
                                    }
                                })
                            )
                        })
                    })
                }))
                // turn on lesson modal
                modalLessons();
                
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
                modalInterview();
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
                            // src: `./public/images/${randomAvatar()}`,
                            src: `./public/images/${user.image}`,  
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
