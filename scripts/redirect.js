(function() {

    // build a template getter
    var templates = (function() {
        // store the templates we import
        const pages = {
            // e.g.
            // pageA: {
            //     templateA: #document-fragment,
            //     ...
            // },
            // ...
        }
        
        // build out the pages object (seen above)
        document.querySelectorAll('link[type="text/html"][rel="import"]').forEach((file) => {
            pages[file.id] = {}

            // file.import is the #document of a file
            file.import.querySelectorAll('template').forEach((template) => {
                pages[file.id][template.id] = template.content // template.content is the document-fragment of a template
            })
        })

        let path = [] // used for building out an explicit error message

        // so... we're going to use a proxy make sure when someone does pages.page.template they don't remove it
        // basically, this object says "when you do a get, run this function instead of the default"
        const validator = {
            get(target, key) { // target is the object called upon, and key is the property
                var item = target[key] // this is the item in question

                // start building a path so the error message is explicit
                if (target === pages) path = ['pages']
                path.push(key)

                // the template (or path to it) doesn't exist
                if (!item) {
                    throw new Error(`Template ${path.join('.')} does not exist.`)
                }
                // if something does exist there AND it's an object
                // (an object either means we need to go deeper OR it's our template)
                else if (typeof(item) === 'object') {

                    // check if this is our template...
                    if (item.nodeName === '#document-fragment')
                        return document.importNode(item, true) // ... and return a copy of it if so (pages.page.template will hit this)

                    // else, return another layer of (i.e. pages.page will hit this)
                    return new Proxy(item, validator)
                }

                // if the thing return isn't an object, we've probably, but not necessarily, fucked up, so return the item, but warn about it
                else {
                    console.warn(`WARNING: ${path.join('.')} exists but is not a template!`)
                    return item
                }
            }
        }

        return (new Proxy(pages, validator))
    }())

    function appendPage(pageId) {
        const main = document.getElementById('main-content');
        main.innerHTML = '';
        main.appendChild(templates[pageId].page);
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
                appendPage('upcomingLessons');
                setUpUpComingLessons();
                break;
            case 'vote-for-lessons':
                appendPage('voteForLesson');
                break;
            case 'edit-profile':
                appendPage('editProfile');
                break;
            case 'sign-out':
                appendPage('signOut');
                break;
            case 'interview-prep':
                appendPage('interviewPrep');
                break;
            case 'recursive-directory':
                appendPage('recursiveDirectory');
                setUpRecursiveDirectory();
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
