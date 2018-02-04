var allUsers = [
    {
        name: "Porg Dev1",
        title: 'Dev1 Title',
        location: 'Dev1 Location'
    },
    {
        name: "Porg Dev2",
        title: 'Dev2 Title',
        location: 'Dev2 Location'
    },
    {
        name: "Porg Dev3",
        title: 'Dev3 Title',
        location: 'Dev3 Location'
    },
    {
        name: "Porg Dev4",
        title: 'Dev4 Title',
        location: 'Dev4 Location'
    },
    {
        name: "Porg Dev5",
        title: 'Dev5 Title',
        location: 'Dev5 Location'
    },
    {
        name: "Porg Dev6",
        title: 'Dev6 Title',
        location: 'Dev6 Location'
    },
    {
        name: "Porg Dev7",
        title: 'Dev4 Title',
        location: 'Dev4 Location'
    },
    {
        name: "Porg Dev8",
        title: 'Dev5 Title',
        location: 'Dev5 Location'
    },
    {
        name: "Porg Dev9",
        title: 'Dev6 Title',
        location: 'Dev6 Location'
    }
]

localStorage.setItem('allUsers', JSON.stringify(allUsers));

var allLessons = [
    {
        title: "Designing with A-Frame VR",
        date: "11/25/2017",
        description: "Words, words, words and more words go right here in this space. Words, words, words and more words go right here in this space. Words, words, words and more words go right here in this space. Words, words, words and more words go right here in this space. Words, words, words and more words go right here in this space."
    },
    {
        title: "Building a city with HTML & CSS",
        date: "12/02/2017"
    },
    {
        title: "Building a calculator with HTML, CSS & JavaScript",
        date: "12/09/2017"
    },
    {
        title: "Building a timer with HTML, CSS & JavaScript",
        date: "12/16/2017"
    },
    {
        title: "Building a website with HTML, CSS & JavaScript",
        date: "12/23/2017"
    },
    {
        title: "Building a web application with HTML, CSS & JavaScript",
        date: "12/30/2017"
    }
]

localStorage.setItem('allLessons', JSON.stringify(allLessons));

var arrayOfAvatars = [ 'avatar1.png', 'avatar2.png', 'avatar3.png', 'avatar4.png', 'avatar5.png', 'avatar6.png' ]

localStorage.setItem('arrayOfAvatars', JSON.stringify(arrayOfAvatars))