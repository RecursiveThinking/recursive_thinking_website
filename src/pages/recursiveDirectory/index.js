import {
    importTemplate,
    templates,
    fill
} from '../scripts/templater'
import {
    utils,
    data
} from '../scripts/global';

import recursiveDirectoryHtml from './recursiveDirectory.html'
importTemplate("recursiveDirectory", recursiveDirectoryHtml)

export function setup(renderFunction) {
    renderFunction(
        fill(templates.recursiveDirectory.page, getRecursiveDirectoryModel())
    );
    let developerLinks = document.getElementsByClassName("directory-card");
    console.log(developerLinks);

    for(let i = 0; i < developerLinks.length; i++){
        developerLinks[i].onclick = () => {
            utils.navigateToPage("view-profile");
        }
    }
    
};

export const getRecursiveDirectoryModel = () => {

    // #TODO: API Call goes here
    const allUsers = JSON.parse(localStorage.getItem('allUsers'));

    return {
        recursiveDirectory: allUsers.map((user) => fill(templates.recursiveDirectory.developer, {
            // name, title and location are slots where you can insert text (or HTML) or DOM Elements
            name: user.name,
            title: user.title,
            // location: user.location,
            location: utils.getConcatenatedLocationString(user.city, user.state),
            // picture is attribute insertion (find slot="picture")
            picture: {
                // insert these attributes into the element tagged as a slot
                // src: `./public/images/${randomAvatar()}`,
                src: `${user.image}`,
                alt: `Profile picture for ${user.name}`
            }
        }))
    }
}