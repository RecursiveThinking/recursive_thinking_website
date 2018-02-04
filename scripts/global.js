const allUsers = [
    {
        name: "Dev1 Name",
        title: 'Dev1 Title',
        location: 'Dev1 Location'
    },
    {
        name: "Dev2 Name",
        title: 'Dev2 Title',
        location: 'Dev2 Location'
    },
    {
        name: "Dev3 Name",
        title: 'Dev3 Title',
        location: 'Dev3 Location'
    },
    {
        name: "Dev4 Name",
        title: 'Dev4 Title',
        location: 'Dev4 Location'
    },
    {
        name: "Dev5 Name",
        title: 'Dev5 Title',
        location: 'Dev5 Location'
    },
    {
        name: "Dev6 Name",
        title: 'Dev6 Title',
        location: 'Dev6 Location'
    }
]

localStorage.setItem('allUsers', JSON.stringify(allUsers));
