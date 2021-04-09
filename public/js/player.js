// client js
function readClicked(){
    $.ajax({
      url: "/read", // this is like the get function like $.get("/read",{identifier:$("#identifier").val()},sucess)
      type: "GET",
      data: {identifier:$("#identifier").val()}, // for read you only need the identifier
      success: function(data){
        if (!data)
          alert("bad read");
        else if (data.retVal) {
          $("#name").val(data.retVal.name); // if it's a good read, it stores the name
          $("#age").val(data.retVal.age);
          $("#grade").val(data.retVal.grade);
          alert("good read");
        } else
          alert("bad read");
      } ,
      dataType: "json"
    });
  return false;
}
function createClicked(){
    $.ajax({ // uses an ajax request - could have used $.post
      url: "/create",
      type: "POST", // must sya its post
      data: {identifier:$("#identifier").val(),name:$("#name").val(), age:$("#age").val(),grade:$("#grade").val()},
      success: function(data){ // call back function
        if (!data)
          alert("bad create");
        else if (data.retVal)
          alert("good create");
        else
          alert("bad create");
        } ,
      dataType: "json" // must specify json, js object t
    });
  return false;
}
function updateClicked(){
  //$.put and $.delete dont exist, thats why its done through $.ajax
    $.ajax({
      url: "/update",
      type: "PUT", // http path
      data: {identifier:$("#identifier").val(),name:$("#name").val(),age:$("#age").val(),grade:$("#grade").val()}, // pass in all the info, we'll be changing the name of the student
      success: function(data){ // callback
        if (!data)
          alert("bad update");
        else if (data.retVal)
          alert("good update");
        else
          alert("bad update");
      } ,
      dataType: "json"
    });
  return false;
}
function deleteClicked(){
    $.ajax({ // must use ajax for deletes - doent exist in jquerey
       url: "/delete/" + Number($("#identifier").val()), // passing in identifier as part of the url
      type: "DELETE",
      success: function(data) {
        if (!data)
          alert("bad delete");
        else if (data.retVal)
          alert("good delete");
        else
          alert("bad delete");
      } ,
      dataType: "json"
    });
    return false;
}
$(document).ready(function(){
  $("#readButton").click(readClicked);
  $("#createButton").click(createClicked);
  $("#updateButton").click(updateClicked);
  $("#deleteButton").click(deleteClicked);
});
