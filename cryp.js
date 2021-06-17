const fs = require("fs");
const cheerio = require("cheerio");
const request = require("request");

request ("https://coinmarketcap.com/most-viewed-pages/",callback);
let finaldata=[];
function callback (err,res,html){
if(!err){
let $ = cheerio.load(html);
let divs = $(".sc-16r8icm-0.sc-1teo54s-1.lgwUsc")
for(let i=0; i<20; i++){
let coin = $($(divs[i]).find("p")[0]).text();
let url = "https://coinmarketcap.com/currencies/" + $($(divs[i]).find("p")[0]).text().split(" ").join("-");
finaldata.push({
"Coin": coin,
"URL": url,
"About": []
});
request(url,abtcoin.bind(this,i));
}
}
}
function abtcoin(finaldataIdx,err,res,html){
    if(!err){
        let $ = cheerio.load(html);
        let curl = $(".sc-1q9q90x-0.iYFMbU.h1___3QSYG")
        let Pricecurrent = $(".priceValue___11gHJ");
        let Pricelow = $(".highLowValue___GfyK7")[0];
        let Pricehigh = $(".highLowValue___GfyK7")[1];
        let acoin = $(".sc-16r8icm-0.kXPxnI.contentClosed___j-OB6.hasShadow___jrTed");
        let price = $(Pricecurrent).text();
        let nurl = $($(curl).find("h2")).text();
        let low = $(Pricelow).text();
        let high = $(Pricehigh).text();
        let aboutcoin = $(acoin).text();
        finaldata[finaldataIdx]["About"].push({
            "Pricecurrent": price,
            "Pricelow": low,
            "Pricehigh": high,
            "TheCoin": aboutcoin,
            "News":[]
             
        });
            request("https://coinmarketcap.com/currencies/" + nurl+ "/news",getnews.bind(this,finaldataIdx));
        }
}
function getnews(finaldataIdx,getnewsIdx,err,res,html){
    if(!err){
        let $ = cheerio.load(html);
        let curl = $(".sc-1q9q90x-0.iYFMbU.h1___3QSYG")
        let gnew = $(".dgjl35-2.BxhOj");
        let nurl = $($(curl).find("h2")).text();
        for(let i=0;i>=gnew.length && i>=3; i++){
            let news = $($(gnew).find("h3")).text();
            finaldata[finaldataIdx]["About"][getnewsIdx]["News"].push({
                "News": news,
                "Rating" : []
            })
            request("https://coinmarketcap.com/currencies/" +nurl+ "/ratings/",getratings.bind(this,finaldataIdx,getnewsIdx,i));

        }

// }
// function getratings(finaldataIdx,getnewsIdx,getratingsIdx,err,res,html){
//     if(!err){
//         let $ = cheerio.load(html);
//         let crate = $(".sc-16po6fj-0.EejSL.cmc-tab-ratings");
//         let ratin = $(crate).text();
//         finaldata[finaldataIdx]["About"][getnewsIdx]["News"][getratingsIdx]["Rating"].push({
//             "Rating": ratin
//         })
    
}
fs.writeFileSync("cryptotrack.json", JSON.stringify(finaldata));
}