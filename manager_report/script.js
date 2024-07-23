// document.addEventListener('DOMContentLoaded', function() {
//     // Find all elements by their IDs
//     var elementsById = [];
//     document.querySelectorAll('[id]').forEach(function(element) {
//         elementsById.push(element);
//     });

//     console.log("Elements by ID:", elementsById);

//     // Find all elements by class name that are children to the first element
//     if (elementsById.length > 0) {
//         var firstElement = elementsById[0];
//         var childElementsByClassName = firstElement.getElementsByClassName('circle');

//         console.log("Child elements by class name of the first element:", childElementsByClassName);
//     } else {
//         console.log("No elements with IDs found.");
//     }
// });


function showTab(tabId) {
    var tabs = document.getElementsByClassName("tab-content");
    for (var i = 0; i < tabs.length; i++) {
        tabs[i].classList.remove("active");
    }
    document.getElementById(tabId).classList.add("active");

    var buttons = document.getElementsByClassName("circle");
    for (var i = 0; i < buttons.length; i++) {
        buttons[i].classList.remove("active-circle");
    }
    document.getElementById("button-" + tabId).classList.add("active-circle");
}