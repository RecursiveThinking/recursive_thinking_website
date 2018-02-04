var allUsers = JSON.parse(localStorage.getItem('allUsers'));
var allLessons = JSON.parse(localStorage.getItem('allLessons'));

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
        div.appendChild(articleCell);
        
        
        gridContainer.appendChild(div)
    }
    console.log(allUsers);

}