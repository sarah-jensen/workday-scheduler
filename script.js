// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
// makes the code wait to execute until everything is loaded and ready
$(document).ready(function () {
  let currentDay = dayjs().format("dddd, MMMM D, YYYY");
  $("#currentDay").text(currentDay);

  $(".saveBtn").on("click", function () {
    let calendarEvent = $(this).parent().attr("id"); //this gets button-->parent.attr gets id
    let eventText = $(this).siblings("textarea").val();
    localStorage.setItem(calendarEvent, eventText);
  });

  $(".row").each(function () {
    let anything = $(this).attr("id");
    let eventText = localStorage.getItem(anything);
    $(this).children("textarea").val(eventText);

    // get just the number from the id string for each appointment time
    let appointmentTime = parseInt($(this).attr("id").replace("hour-", ""));
    console.log(appointmentTime);
    let currentHour = parseInt(dayjs().format("H"));
    console.log(dayjs().format("H"));
    console.log(currentHour);
    // compare appointment time to current time in 24H format
    // change class to "past" if current hour is greater than appointment time
    if (appointmentTime < currentHour) {
      $(this).removeClass("future").addClass("past");
      console.log("past");
      // change class to "present" if current hour is same as appointment time
    } else if (appointmentTime === currentHour) {
      $(this).removeClass("future").addClass("present");
      console.log("present");
    }
  });


});
