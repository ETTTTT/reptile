// const http = require('http');  // node自带模块
const https = require('https');
const cheerio = require('cheerio');  // 将服务器发货的数据处理成JQdom便于操作
const fs = require('fs');

const url = 'https://sports.sina.com.cn/nba/';   // 新浪的某一个页面

const getData = (url,cb) => {
    // 过滤下 如果是http的 直接过变成https
    if(!url.startsWith('https://')) url = url.replace('http', 'https');
    https.get(url, (res) => {
        let html = '';
        res.on('data', (chunk) => {
            html += chunk;
        });
        res.on('end', () =>{
            const $ = cheerio.load(html);
            cb($);
        });
    }).on('error',(err) => {
        console.log(err.message);
    });
};

getData(url, ($) => {
    $('.news-list-b').each((idx, item) => {
        $(item).find('a').each((index, body) =>{
            const url = $(body).attr('href');
            getData(url, (_) => {
                _('#artibody').text();
                fs.writeFile(`./news/${index}.txt`, _('#artibody').text(), (err) => {
                    if(err) {
                        return console.log(err.message);
                    }
                    return console.log('完成新闻写入');
                });
            });
        });
    });
});
