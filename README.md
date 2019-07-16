# NODE JS NPR News Scraper with Headline Custom Notes 

You can see a demo of this site here https://news.ryancrawford.me

NPR News Scraper lets users comment on news stories that have been scraped from the NPR website using a custom web scraper.
The app uses a Mongo DB database to store the scraped data. The data that is collected is:
- The Title or Headline
- The Image if there is one
- The Link to the actual article
- The Summary and Date (Which are then separated in to 2 separate fields)
- Then a Note Collection is used to store the Notes / Comments along with a reference to the id of the article

This could be easily modified to get data from a different site. 

Written in Node JS
Has these Packages / Dependencies 
- Express
- Handlebars
- Mongoose
- Axios
- Cheerio

to run locally on your own server simply clone the repository
Bash
```
$ git clone https://github.com/ryanccrawford/noted-news
```

Then run npm install
bash
```
$ npm i
```

Make sure you have mongod installed and running
bash
```
$ mongod
```

and last cd into the folder and run with node
bash
```
$ cd noted-news
$ node server.js
```

