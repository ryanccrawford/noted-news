$(document).ready(function () {


    $.getJSON("/api/articles", function (data) {
        for (var i = 0; i < data.length; i++) {
            var id = data[i]._id
            var image = typeof (data[i].image) != 'undefined' ? data[i].image : ""
            var date = data[i].date
            var title = data[i].title
            var link = data[i].link
            var summary = data[i].summary
            var row = $("<div>").addClass("row")
            var blockCard = $("<div>").addClass("card")
            var block = $("<div>")
            if (image) {
                $(block)
                    .addClass("card-image")
                    .append(
                        $("<img>")
                        .addClass("auto-height")
                        .attr("src", image)
                    )
                $(blockCard)
                    .append(block)
                    .append(
                        $("<div>")
                        .addClass("card-content")
                        .append(
                            $("<span>")
                            .addClass("card-title text-blue lighten-4")
                            .text(title))
                        .append(
                            $("<p>")
                            .text(summary)
                    )
                )

            } else {
                $(block)
                    .addClass("card-content")
                    .append(
                    $("<span>")
                        .addClass("card-title")
                        .text(title))
                    .append(
                    $("<p>")
                        .text(summary)
                    )
                $(blockCard)
                    .append(block)
            }
            
            var blockLink = $("<div>")
                .addClass("card-action")
                .append(
                    $("<a>")
                    .addClass("waves-effect green waves-dark white-text btn-small")
                    .attr("href", link)
                    .text("Read more..."))
                .append(
                    $("<a>")
                    .attr("data-id", id)
                    .addClass("waves-effect yellow waves-dark black-text btn-small add-note right")
                    .text("Make Note")
                        .append(
                        $("<i>")
                            .addClass("material-icons left")
                            .text("note")
                        )
                )

            $(blockCard).append(blockLink)
                
            $("#articles").append($(row)
                .append(blockCard)
                .append(
                    $("<div>")
                        .addClass("card")
                        .addClass("note")
                        .attr("data-id", id)
                        .hide()
                ));

        }
    });

    $(document).on("click", ".add-note", function (event) {
        var articleId = $(event.target).attr("data-id")
        
        const makecall = function (articleId) {
            $.ajax({
                method: "GET",
                url: "/api/articles/" + articleId
            }).then(function (data) {
                    console.log(data);
                    var note = $('.note[data-id=' + articleId + ']')
                    $(note)
                        .append(
                        $("<div>").addClass("card-content").append(
                            $("<p>").text(data.title)
                        )
                            .append("<input class='titleinput' name='title' >")
                            .append("<textarea class='bodyinput' name='body'></textarea>")
                            .append("<a class='waves-effect waves-dark white-text btn-small' data-id='" + data._id + "' id='savenote'>Save Note</a>")
                )
                $(note).show()
                    if (data.note) {
                        $("#titleinput", note).val(data.note.title);
                        $("#bodyinput", note).val(data.note.body);
                    }
                });
        }

        $(".card.note").hide();

        makecall(articleId)
    });

   
    $(document).on("click", "#savenote", function(event) {
        var thisId = $(event.target).parent().parent().attr("data-id")
        var title = $(event.target).sibling(".titleinput")
        $.ajax({
            method: "POST",titleinput
            url: "/api/articles/" + thisId,
            data: {
                title: $("#").val(),
                body: $("#bodyinput").val()
            }
        })
        .then(function (data) {
                console.log(data);
            $("[data-id=" + data._id + ']').empty();
            });
        $("#titleinput").val("");
        $("#bodyinput").val("");
    });
})

