const express = require('express')
const bodyParser = require('body-parser')
const app = express()
var cors = require('cors')
let Parser = require('rss-parser');
let parser = new Parser();
var request = require('request');
extractor = require('unfluff');
const cheerio = require('cheerio');
const port = 5000

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(cors());

app.get('/api/v1/', function(req,res) {
    res.send({status: 200, data: "Hello World!"});
});

function callback (response, res) {
    res.send({status: true, success: true, data: response});
}

app.get('/api/v1/searchGN', function(req,res) {
    var toSend = {};
    var itemsProcessed = 0;
    /*//Temp Script Testing
    toSend["Gucci gang"] = {
        date: "oct 2016",
        publisher: "ignores",
        text: "In 20012 alone, we see how puerto rican children suffer from obesity. 22% compared to just 15% on the mainland. The lack of access to a refridgerator would be crucial in mitigating the crisis. KEEP THEIR POWER OFF!"
    };
    toSend["ywe gang"] = {
        date: "oct 20q216",
        publisher: "ignores",
        text: "In IGNORE ME 20012 alone, we see how puerto rican children suffer from obesity. 22% compared to just 15% on the mainland. The lack of access to a refridgerator would be crucial in mitigating the crisis. KEEP THEIR POWER OFF!"
    };
    callback(toSend, res)*/
    (async () => {
            
        let feed = await parser.parseURL('https://news.google.com/rss/search?q=' + req.query.q + '&hl=en-US&gl=US&ceid=US:en');
        console.log(feed.title);

        await feed.items.forEach(item => {
            request(item.link, function (error, response, body) {
                
                try {
                    data = extractor(body, 'en');
                    console.log(data.title);
                    var result = "";
                    let $ = cheerio.load(body);
                    $('p').each(function (i, e) {
                            result = result + $(this).text();
                    });

                    toSend[data.title] = {
                        date: data.date,
                        publisher: data.publisher,
                        text: result.length > data.text.length ? result : data.text,
                        link: item.link
                    };

                    console.log("Hello" + itemsProcessed + "/" + feed.items.length);

                } catch (e) {
                    console.log("Error: " + e);
                    itemsProcessed++;
                    return;
                }

                itemsProcessed++;
                if(itemsProcessed === feed.items.length) {
                    console.log("Done.");
                    callback(toSend, res);
                }
            });

        });

    })();
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`))