var curentTime = moment();
var tasks = {};
let times = ['9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM']

$(document).ready(function () {

    $("#currentDay").text(moment().format('ddd MMM Do, YYYY'));

});

$(".task").on("click", function () {
    var text = $(this).text().trim();
    var textInput = $("<textarea>")
        .addClass("form-control")
        .val(text);
    $(this).replaceWith(textInput);
    textInput.trigger("focus");
});

$(".task").on("blur", "textarea", function () {
    //get the textarea's current value/text
    var text = $(this)
        .val()
        .trim();
    //recreate p element
    var taskP = $("<p>")
        .addClass("taskbox")
        .text(text);

    //replace textarea with p element
    $(this).replaceWith(taskP);
    saveTasks();
});
var saveTasks = function () {
    localStorage.setItem("task", JSON.stringify(tasks))
};

$("saveBtn").on("click", "btn", function () {
    saveTasks();
});

var loadTasks = function () {
    tasks = JSON.parse(localStorage.getItem("task"));
}

var styleRows = function (taskEl) {
    //get date from task element
    var timeSlot = $(timesEl).find("time-block").text().trim();

    //apply new class if slot is near/over due date
    if (moment(timeSlot).isAfter(currentTime)) {
        $(taskEl).addClass("future");
    }
    if (moment(timeSlot).isBefore(currentTime)) {
        $(taskEl).addClass("past");
    }
    if (moment(timeSlot) === currentTime) {
        $(taskEl).addClass("present");
    }
};

loadTasks();