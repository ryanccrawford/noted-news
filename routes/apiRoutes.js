const mongoose = require("mongoose")
const dburl = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines"
mongoose.connect(dburl, { useNewUrlParser: true });
const db = require("../models");
const axios = require("axios")
const cheerio = require("cheerio")
const regexDate = /(^.+\s[\d]+\,\s[\d]{4})/;
const regexSummary = /\s.\s(.*)/;

module.exports = function (app) {

    app.get("/api/scrape/:type", function (req, res) {
        let type = 0
        let categories = ["technology", "science","world"]
        if (req.params.type) {
            type = parseInt(req.params.type) - 1
        }
        
        let category = categories[type]
        let newCollection = []
        let url = `https://www.npr.org/sections/${category}/`
        axios.get(url).then(function (response) {
            var $ = cheerio.load(response.data);
            $("article.item").each(function (i, element) {
                
                var image = $(".respArchListImg", element).attr("src")
                var title = $(element).find(".item-info").find("h2.title").text()
                var link = $(".item-info h2.title", element).find("a").attr("href")
                var date = $(element).find(".item-info").find("p.teaser").text().split(regexDate)[1]
                var summary = $(element).find(".item-info").find("p.teaser").text().split(regexSummary)[1]
                
                var result = {
                    title: title,
                    link: link,
                    summary: summary,
                    image: image,
                    date: date,
                    category: type.toString()
                };
                newCollection.push(result);
                console.log(result || "No data")


                var write = function (result) {
                    if (result.title) {
                        db.Article.create(result)
                            .then(function (dbArticle) {

                                console.log(dbArticle);
                            })
                            .catch(function (err) {

                                console.log(err);
                            });
                    }
                }

                write(result)
            });
            res.send(newCollection);
        });
    });

    app.get("/api/articles", function (req, res) {

        db.Article.find({}).then(function (data) {
            res.json(data)
        }).catch(function (err) {
            res.json(err)
        })
    });

    app.get("/api/articles/:id", function (req, res) {
        db.Article.find({
            _id: req.params.id
        })
            .populate("note")
            .then(function (data) {
                console.log(data)
                res.json(data);
            })
            .catch(function (err) {
                res.json(err);
            });
    });

    app.post("/api/articles/:id", function (req, res) {

        db.Note.create(req.body)
            .then(function (dbNote) {
                console.log(dbNote)
                return db.Article.findOneAndUpdate({ _id: req.params.id }, { note: dbNote._id }, { new: true });
            })
            .then(function (dbArticle) {
                console.log(dbArticle)
                res.json(dbArticle);
            })
            .catch(function (err) {
                res.json(err);
            });
    });
}