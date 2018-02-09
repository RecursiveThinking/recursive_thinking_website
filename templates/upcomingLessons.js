var allUsers = JSON.parse(localStorage.getItem('allUsers'));
var allLessons = JSON.parse(localStorage.getItem('allLessons'));
var allProfileStatistics = JSON.parse(localStorage.getItem('allProfileStatistics'));



function setUpUpComingLessons()
{
    buildUpComingLessons();
}
function buildUpComingLessons(){
    // grab lesson card
    const upComingLessonsCard = document.getElementById('upComingLessonsCard');
    console.log(upComingLessonsCard);
    
    if(allLessons.length > 0){
        // loop through array
        for(let i = 0; i < allLessons.length; i += 1){
            let upComingLessonDateObj = new Date(allLessons[i].date);
            console.log(upComingLessonDateObj);
            
            //function to return a date object formatted for all conditions
            let upComingLessonDateFormatted = getFormattedLessonDate(upComingLessonDateObj)
            console.log(upComingLessonDateFormatted);
            
            // start building the infor for the card
            const divDateRowTitle = document.createElement('div');
            divDateRowTitle.className = `fc-dateRowTitle`;
                // div
                const divDateRow = document.createElement('div');
                divDateRow.className = `fc-dateRow contVertCenter`;
                    // green h1 date
                    const h1DateRowTitle = document.createElement('h1');
                    h1DateRowTitle.className = `h1Date colorGreen fw300`
                    h1DateRowTitle.innerText = `${upComingLessonDateFormatted.dateOfMonth}`
                    // connect h1
                    divDateRow.appendChild(h1DateRowTitle)
                    // div
                    const divDateRowMonthYear = document.createElement('div');
                    divDateRowMonthYear.className = `fc-dateRowMonthYear`;
                        // h4 Month
                        const h4Month = document.createElement('h4');
                        h4Month.className = `h4MonthYear colorBlack06 fw500 ttup`;
                        h4Month.innerText = `${upComingLessonDateFormatted.monthAsString}`
                        // connect
                        divDateRowMonthYear.appendChild(h4Month);
                        // h4 Year
                        const h4Year = document.createElement('h4');
                        h4Year.className = `h4MonthYear colorBlack06 fw500 ttup`;
                        h4Year.innerText = `${upComingLessonDateFormatted.year}`;
                        // connect
                        divDateRowMonthYear.appendChild(h4Year);
                    // connect div
                    divDateRow.appendChild(divDateRowMonthYear);
                // connect div
                divDateRowTitle.appendChild(divDateRow);
                // connect h4
                const h4LessonTitle = document.createElement('h4');
                h4LessonTitle.className = `h4LessonTitle negMarg colorGray66 fw300`
                h4LessonTitle.innerText = `${allLessons[i].title}`
                // connect h4 title
                divDateRowTitle.appendChild(h4LessonTitle);
            // connect div
            upComingLessonsCard.appendChild(divDateRowTitle);
            // hr on all but last
            if(i !== allLessons.length - 1){
                const hr = document.createElement('hr');
                upComingLessonsCard.appendChild(hr);
            }
        }
        
    } else {
        // display a warning
    }
}