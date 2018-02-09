var allUsers = JSON.parse(localStorage.getItem('allUsers'));
var allLessons = JSON.parse(localStorage.getItem('allLessons'));


function setUpRecursiveDirectory(){
    buildRecursiveDirectory();
}

function buildRecursiveDirectory(){
    const gridContainer = document.getElementById('gridContainer');
    console.log(gridContainer);
    for(let i = 0; i < allUsers.length; i += 1){
        // console.log(`${allUsers[i].name} | ${allUsers[i].title} | ${allUsers[i].location}`);
        const div = document.createElement('div');
        // add class
        div.className = `cell`;
        // article
        const articleCell = document.createElement('article');
        // add art class
        articleCell.className = `directory-card`
            
            // add article image
            const articleImage = document.createElement('img');
            // add img class
            articleImage.className = `devPicture`
            // image attr
            let randAvatarImage = randomAvatar();
            // console.log(randAvatarImage);
            let randAvatarImageTest = Random.randomPrint();
            console.log(randAvatarImageTest);
            articleImage.setAttribute('src', `./public/images/${randAvatarImage}`);
            articleImage.setAttribute('alt', `a picture of ${allUsers[i].name}`);
            articleCell.appendChild(articleImage);
            
            // add div for text
            const divTextGroup = document.createElement('div');
            // add class to div
            divTextGroup.className = `fc-text-group`
                // make a for div
                const linkHeadingName = document.createElement('a');
                // add attributes
                linkHeadingName.setAttribute('href', `./templates/viewProfile.html`);
                linkHeadingName.setAttribute('target', '_blank');
                    //make heading for name
                    const headingName = document.createElement('h2');
                    headingName.className = `devName colorGray42 fw500`;
                    headingName.innerText = `${allUsers[i].name}`;
                    // connect heading to link
                    linkHeadingName.appendChild(headingName);
                // connect link to divTextGroup
                divTextGroup.appendChild(linkHeadingName);
                
                // make a hr
                const hr = document.createElement('hr');
                // connect hr to divTextGroup
                divTextGroup.appendChild(hr)
                
                // h3 heading for Job
                const headingTitle = document.createElement('h3');
                // title classes
                headingTitle.className = `devTitle colorGray42 fw300`;
                // title content
                headingTitle.innerText = `${allUsers[i].title}`;
                // connect
                divTextGroup.appendChild(headingTitle);
                
                // h4 heading for Location
                const headingLocation = document.createElement('h4');
                // location classes
                headingLocation.className = `devLocation colorGray42 fw300 ttup`;
                // location content
                headingLocation.innerText = `${allUsers[i].location}`;
                // connect
                divTextGroup.appendChild(headingLocation);
                
                
            articleCell.appendChild(divTextGroup);
            
        div.appendChild(articleCell);
        
        gridContainer.appendChild(div)
    }
    console.log(allUsers);

}