(function() {
"use-strict"

document.querySelector("#testButton").addEventListener("click", handleClick);

function handleClick(){
    console.log("You've been quacked");
}

}());