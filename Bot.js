
const script = document.createElement('script');

var org = document.getElementById("helper").getAttribute("organisation");
var library = document.getElementById("helper").getAttribute("library");
var category = document.getElementById("helper").getAttribute("category");
var colour = document.getElementById("helper").getAttribute("colour");
var website = document.getElementById("helper").getAttribute("website");


script.src = website;
script.async = true;

var eventMethod = window.addEventListener ? "addEventListener" : "attachEvent";
var eventer = window[eventMethod];
var messageEvent = eventMethod == "attachEvent" ? "onmessage" : "message";

// Listen to message from child window
eventer(messageEvent, function (e) {
    var key = e.message ? "message" : "data";
    var data = e[key];

    var iframe = document.getElementById('my-iframe');
    iframe.style.width = data.substring(0, 5);
    iframe.style.height = data.substring(5);

}, false);

script.onload = () => {
    var existingFrame = document.getElementById('my-iframe');

    if (existingFrame == null) {
        const iframe = document.createElement("iframe");
        iframe.style.position = 'fixed'
        iframe.style.bottom = '0px'
        iframe.style.right = '0px'
        iframe.id = 'my-iframe';
        iframe.style.width = '100px';
        iframe.style.height = '100px';
        iframe.style.maxWidth = '100vw';
        iframe.style.border = 'none'
        
        //iframe.style.marginRight = '10px';

        iframe.src = `https://localhost:52329/helpbot/${org}/${library}/${category}/${colour}`;
        document.body.appendChild(iframe);
        iframe.contentWindow.location.reload();
    }
};
script.onerror = () => {
    console.log('Error occurred while loading script');
};
document.body.appendChild(script);