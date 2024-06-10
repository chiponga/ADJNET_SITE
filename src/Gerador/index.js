
monName = new Array("01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12")

let today = new Date()


function getRandomInt(){
    today = new Date()
    return ((today.getHours()) < 10 ? '0' + (today.getHours()) : (today.getHours())) + ":" + (today.getMinutes() < 10 ? '0' + today.getMinutes() : today.getMinutes()) + ":" + (today.getSeconds() < 10 ? '0' + today.getSeconds() : today.getSeconds())
}

function getData(){
    today = new Date()
    return ((today.getFullYear())+"-"+(monName[today.getMonth()])+"-"+(today.getDate() < 10 ? '0' + today.getDate() : today.getDate() ))
}

function getAno(){
    today = new Date()
    return (today.getFullYear())
}


module.exports = { getRandomInt, getData, getAno }