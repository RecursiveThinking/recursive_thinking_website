var allUsers = JSON.parse(localStorage.getItem('allUsers'));
var allLessons = JSON.parse(localStorage.getItem('allLessons'));
var allProfileStatistics = JSON.parse(localStorage.getItem('allProfileStatistics'))

function setUpDashboard(){
    buildUpcomingLesson();
    buildProfileStatistics();
}

function buildProfileStatistics(){
    // console.log(allProfileStatistics);
    for(let i = 0; i < allProfileStatistics.length; i += 1){
        console.log(allProfileStatistics[i].totalCount);
        console.log(allProfileStatistics[i].title);
    }
}

function buildUpcomingLesson(){
    // select the upComingLessonCard
    const upComingLessonCard = document.getElementById('upComingLessonCard');
    console.log(upComingLessonCard);
    console.log(allLessons);
    
    if(allLessons.length > 0){
        // set what lesson you want to display
        const upComingLesson = allLessons[0];
        
        let upComingMeetingDate = new Date(upComingLesson.date)
        // get date
        let dayOfWeek = getDayOfWeek(upComingMeetingDate.getDay());
        // console.log(getDayOfWeek(date.getDay()));
        let date = upComingMeetingDate.getDate();
        // console.log(date);
        let year = upComingMeetingDate.getFullYear();
        // console.log(year);
        let monthAsNumberIndex = upComingMeetingDate.getMonth();
        // console.log(monthAsNumberIndex);
        let monthAsNumber = monthAsNumberIndex + 1;
        // console.log(monthAsNumber);
        let monthAsString = getMonthOfYear(monthAsNumberIndex);
        // console.log(monthAsString);
        // allLessions[0].date.getMonth();
        let upComingDateString = `${year} ${monthAsNumber} ${date}`
        // console.log(upComingDateString);
        
        // start of the card
        
        // create flex container dateRow
        const divDateRow = document.createElement('div');
        divDateRow.className = `fc-dateRow contVertCenter`;
            //add h1
            const h1 = document.createElement('h1');
            h1.className = `h1Date colorGreen fw300`;
            h1.innerText = `${date}`;
            // connect h1 to div
            divDateRow.appendChild(h1);
            
            // div dateRowMonthYear
            const divDateRowMonthYear = document.createElement('div');
            divDateRowMonthYear.className = `fc-dateRowMonthYear`
            
                // heading Month String
                const h4Month = document.createElement('h4');
                h4Month.className = `h4MonthYear colorBlack fw500 ttup`;
                h4Month.innerText = `${monthAsString}`
                // connect
                divDateRowMonthYear.appendChild(h4Month);
                // heading Year
                const h4Year = document.createElement('h4');
                h4Year.className = `h4MonthYear colorBlack fw500 ttup`;
                h4Year.innerText = `${year}`
                // connect
                divDateRowMonthYear.appendChild(h4Year);
            
            // connect div to div
            divDateRow.appendChild(divDateRowMonthYear);
            
        // connect div to upComingCard
        upComingLessonCard.appendChild(divDateRow);
        
        // hr
        const hr1 = document.createElement('hr');
        // connect
        upComingLessonCard.appendChild(hr1);
        
        // div lesson title
        const divLessonTitleDescription = document.createElement('div');
        divLessonTitleDescription.className = `fc-lessonTitleDescription`;
            
            // h4 title
            const h4LessonTitle = document.createElement('h4');
            h4LessonTitle.className = `h4LessonTitle ucMargin colorBlack fw300`
            h4LessonTitle.innerText = `${upComingLesson.title}`;
            // connect
            divLessonTitleDescription.appendChild(h4LessonTitle);
            
            // p
            const pLesson = document.createElement('p');
            pLesson.innerText = `${upComingLesson.description}`;
            // connect
            divLessonTitleDescription.appendChild(pLesson);
            
            // connect
            upComingLessonCard.appendChild(divLessonTitleDescription);
        //
        const hr2 = document.createElement('hr');
        // connect
        upComingLessonCard.appendChild(hr2);
        
        //
        const h4LessonTitleTaught = document.createElement('h4');
        h4LessonTitleTaught.className = `h4LessonTitle ucMargin colorBlack fw300 ttup`;
        h4LessonTitleTaught.innerText = `Taught By:`
        // connect
        upComingLessonCard.appendChild(h4LessonTitleTaught);
        
        // div
        const divTaughtByThumbs = document.createElement('fc-taughtByThumbs');
        divTaughtByThumbs.className = `fc-taughtByThumbs`;
        
            const loopNumber = getRandomNumber(1, 5);
            // console.log(loopNumber);
            
            // function to randomly generate taught by thumbs, # determined by random function above
            // also - this just 
            let randomGenTaughtByThumbs = generateTaughtByThumbs(loopNumber, divTaughtByThumbs, upComingLesson.title);
            
            console.log(randomGenTaughtByThumbs);
            // // img
            // const imgTaughtByThumbs1 = document.createElement('img');
            // imgTaughtByThumbs1.className = `avatarThumbRound`;
            // imgTaughtByThumbs1.setAttribute('src', '../public/images/avatar1.png');
            // imgTaughtByThumbs1.setAttribute('alt', `lesson ${upComingLesson.title} taught by developer`);
            // // connect
            // divTaughtByThumbs.appendChild(imgTaughtByThumbs1);
            
        // connect
        upComingLessonCard.appendChild(divTaughtByThumbs);
    }
    else{
        // display a warning 
    }
}

function buildAttendingList(){
    
}