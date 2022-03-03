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
        connection.when = newConnection.when;
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