var currentTime = moment();
var tasks = {};
let times = ['9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM']

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
        .addClass("m-1")
        .text(text);

    //replace textarea with p element
    $(this).replaceWith(taskP);
    localStorage.setItem("tasks", JSON.stringify(tasks))
});

$("saveBtn").on("click", function () {
    localStorage.setItem("tasks", JSON.stringify(tasks))
})

var loadTasks = function () {
    tasks = JSON.parse(localStorage.getItem("tasks")); 
}

var styleTask = function (taskEl) {
    //get date from task element
    var date = $(taskEl).find("time-block").text().trim();

    //apply new class if task is near/over due date
    if (moment().isAfter(currentTime)) {
        $(taskEl).addClass("bg-success");
    }
    if (moment().isBefore(currentTime)) {
        $(taskEl).addClass("bg-secondary");
    }
    if (moment() === currentTime) {
        $(taskEl).addClass("bg-danger");
    }
};
