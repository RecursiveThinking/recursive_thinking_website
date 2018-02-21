import { templates, fill } from '../scripts/templater';

export const getRecursiveDirectoryModel = () => {

    // #TODO: API Call goes here
    const allUsers = JSON.parse(localStorage.getItem('allUsers'));
    
    return {
        recursiveDirectory: allUsers.map((user) => fill(templates.recursiveDirectory.developer, {
            // name, title and location are slots where you can insert text (or HTML) or DOM Elements
            name: user.name,
            title: user.title,
            location: user.location,
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