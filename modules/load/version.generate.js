function rand(min, max) {
    let randomNum = Math.random() * (max - min) + min;
    return Math.round(randomNum);
}

function makeid() {
    var text = ""; 
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"; 
    for (var i = 0; i < 5; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text; 
} 

function generatePath () {
    return `?${makeid()}?.${rand(1,200)}-${makeid()}-${rand(10,2000)};`
};

function isAsync () {
    return `async`;
}

var loadScripts = (array,async = false) => array.forEach(script =>  {
    if (async)
        document.write('<script src='+ script + generatePath() +' async=' + isAsync() + '></script>');
    else
        document.write('<script src='+ script + generatePath() +'></script>');
});


function disableIE() {
    if (document.all) {
        return false;
    }
}
function disableNS(e) {
    if (document.layers || (document.getElementById && !document.all)) {
        if (e.which==2 || e.which==3) {
            return false;
        }
    }
}
/*
if (document.layers) {
    document.captureEvents(Event.MOUSEDOWN);
    document.onmousedown = disableNS;
} 
else {
    document.onmouseup = disableNS;
    document.oncontextmenu = disableIE;
}
document.oncontextmenu=new Function("return false");

*/