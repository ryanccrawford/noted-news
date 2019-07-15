var category = ""
$(document).ready(function () {
    
    $('select').formSelect();
    $("select").change(function (event) {

        var value = $(this).val()
        if (value) {
            $(".scrape").removeClass("disabled").attr("data-val", value)
        } else {
            $(".scrape").addClass("disabled").attr("data-val", "-1")
        }

    })
    $(".scrape").on("click", function (event) {
        var cat = $("select").val()
        var cat2 = $(".scrape").attr("data-id")

        $.ajax({
            url: "/api/scrape/" + cat,
            method: "GET"
        }).then(function (data) {
            console.log(data)
            window.location.reload()
         })

    })

    $.getJSON("/api/articles", function (data) {
        for (var i = 0; i < data.length; i++) {
            var id = data[i]._id
            var image = typeof (data[i].image) != 'undefined' ? data[i].image : ""
            var date = data[i].date
            var title = data[i].title
            var link = data[i].link
            var summary = data[i].summary
            var row = $("<div>").addClass("row")
            var blockCard = $("<div>").addClass("card col m12").attr("data-cardid", id)
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
                        .addClass("waves-effect yellow waves-dark black-text btn-small notes right")
                        .text("Notes")
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
                        .addClass("card col right m3 yellow lighten-3")
                        .addClass("note")
                        .attr("data-noteid", id)
                        .hide()
                ));
           
        }
    });

    $(document).on("click", ".notes", function (event) {
        let articleId = $(this).attr("data-id")
        $('.note[data-noteid=' + articleId + ']').empty()
        $(this).addClass("disabled")
            $.ajax({
                method: "GET",
                url: "/api/articles/" + articleId
            }).then(function (data) {
                console.log(data[0]);
                var note = $('.note[data-noteid=' + articleId + ']')
                $(note)
                    .append(
                        $("<div>").addClass("card-content").append(
                            $("<p>Title</p>")).append($("<p>"))
                            .append("<input class='titleinput' name='title' >")
                            .append("<textarea class='bodyinput' name='body'></textarea>")
                            .append("<a class='save-note waves-effect waves-dark white-text btn-small' data-id='" + articleId + "'>Save Note</a>")
                )
                $("div[data-cardid=" + articleId + "]").removeClass("m12").addClass("m8")
                $(note).show()
                if (data[0].note) {
                    $(".titleinput", note).val(data[0].note.title);
                    $(".bodyinput", note).val(data[0].note.body);
                }
            });
    });


    $(document).on("click", ".save-note", function (event) {
        var thisId = $(this).attr("data-id")
        var title = $(event.target).parent().find(".titleinput").val()
        var body = $(event.target).parent().find(".bodyinput").val()
        $.ajax({
            method: "POST",
            url: "/api/articles/" + thisId,
            data: {
                title: title,
                body: body
            }
        })
            .then(function (data) {
                console.log(data);
                
              
            });
        $(event.target).parent().find(".titleinput").val("")
        $(event.target).parent().find(".bodyinput").val("")
        $('.note[data-noteid=' + thisId + ']').empty().hide()
        $("div[data-cardid=" + thisId + "]").removeClass("m8").addClass("m12")
        $("a[data-id=" + thisId + "]").removeClass("disabled")
    });
})

