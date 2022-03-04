const e = require('express');
const {v4: uuid} = require('uuid');

const connections = [
{
    id: '1', 
    type: 'Meeting',
    title: 'Introduction Meeting',
    host: 'Autumn Horrell',
    content: 'Join us on Zoom to meet our team members and learn about our semester goals! Meeting ID: 353 213 3011', 
    where: 'Zoom',
    date: 'February 3, 2022', 
    start: '1:00 pm',
    end: '2:00 pm',
    img: 'https://sites.uml.edu/vtr/files/2020/05/Zoom-Pro-Annually-2-1024x1024-1.jpg', 
    imgAlt: 'Zoom logo'
},
{
    id: '2', 
    type: 'Workshop',
    title: 'HTML Fundamentals Course', 
    host: 'Stephanie Davis',
    content: 'Join us to learn the fundamentals of HTML! This is the first step towards learning how to build your own website! Join on campus: Woodward 232.',
    where: 'On campus',
    date: 'February 16, 2022', 
    start: '5:00 pm',
    end: '6:00 pm',
    img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/00/HTML5_logo_black.svg/2048px-HTML5_logo_black.svg.png', 
    imgAlt: 'HTML logo'
},
{
    id: '3', 
    type: 'Workshop', 
    title: 'CSS Fundamentals Course', 
    host: 'Tyler Collins', 
    content: 'During this workshop we will continue learning how to create a website by building our HTML skills and integrating CSS! Join us on campus: Colvard 211.', 
    where: 'On campus',
    date: 'February 27, 2022', 
    start: '6:00 pm', 
    end: '7:00 pm',
    img: 'https://cdn.pixabay.com/photo/2017/08/05/11/16/logo-2582747_1280.png', 
    imgAlt: 'CSS logo'
},
{
    id: '4',
    type: 'Other',
    title: 'Coffee Date and Studying',
    host: 'Vivian Rose',
    content: 'Meet us at Optomist Hall to drink coffee and study!',
    where: 'Other',
    date: 'March 2, 2022',
    start: '2:00 pm',
    end: '4:00 pm',
    img: 'https://www.freepnglogos.com/uploads/coffee-logo-png/coffee-logo-design-creative-idea-logo-elements-2.png',
    imgAlt: 'Coffee image'
},
{
    id: '5',
    type: 'Meeting',
    title: 'Web Team Check In',
    host: 'Autumn Horrell',
    content: 'Join for our weekly web team check in to learn how we created our website and how we plan on progressing! Meeting ID: 353 213 3011',
    where: 'Zoom',
    date: 'February 24, 2022', 
    start: '5:30 pm',
    end: '6:30 pm',
    img: 'https://sites.uml.edu/vtr/files/2020/05/Zoom-Pro-Annually-2-1024x1024-1.jpg', 
    imgAlt: 'Zoom logo'
},
{
    id: '6',
    type: 'Other',
    title: 'Coding Lounge',
    host: 'Tyler Collins',
    content: 'Join us on campus to chat, work out bugs, or ask technical coding questions in building Woodward 135!',
    where: 'On campus',
    date: 'March 4, 2022',
    start: '3:30 pm', 
    end: '5:30 pm',
    img: 'https://andcoffee.io/wp-content/uploads/2019/07/Logo-text-300x300.png',
    imgAlt: 'Coffee code'
},
{
    id: '7',
    type: 'Other',
    title: 'Spring Retreat',
    host: 'Britany Taylor',
    content: 'Join us and relax as we go to Gatlinburg! Unplug and hangout with us in the mountains during spring break! For more details, email WomenInCS@uncc.edu.',
    where: 'Other',
    date: 'March 11, 2022',
    start: '2:00 pm',
    end: '6:00 pm',
    img: 'https://p.kindpng.com/picc/s/106-1068761_mountain-valley-homes-png-images-of-mountains-animated.png',
    imgAlt: 'Mountain image'
},
{
    id: '8',
    type: 'Workshop',
    title: 'JavaScript Fundamentals Course',
    host: 'Devon Thomas',
    content: 'During this workshop we will build upon our HTML and CSS skills to learn JavaScript. Meeting ID: 353 213 3011',
    where: 'Zoom',
    date: 'March 8, 2022',
    start: '4:30 pm',
    end: '5:30 pm',
    img: 'https://www.kindpng.com/picc/m/78-788134_javascript-logo-hd-png-download.png',
    imgAlt: 'Javascript Logo'
}
];

exports.find = function() {
    return connections;
};

exports.findById = function(id) {
    return connections.find(connection => connection.id === id);
};

exports.save = function (connection) {
    connection.id = uuid();
    connections.push(connection);
};

exports.updateById = function(id, newConnection) {
    let connection = connections.find(connection=>connection.id === id);
    if (connection) {
        connection.type = newConnection.type;
        connection.title = newConnection.title;
        connection.host = newConnection.host;
        connection.content = newConnection.content;
        connection.where = newConnection.where;
        connection.date = newConnection.date;
        connection.start = newConnection.start;
        connection.end = newConnection.end;
        connection.img = newConnection.img;
        return true;
    } else {
        return false;
    }
}

exports.deleteById = function(id) {
    let index = connections.findIndex(connection => connection.id === id);
    if (index !== -1) {
        connections.splice(index, 1);
        return true;
    } else {
        return false;
    }
}