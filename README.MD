# node 爬虫小demo

> 是用node自带的3个包`http`、`https`、`fs`,和一个主要用在服务器端需要对DOM进行操作的地方`cheerio`

* http使用get方法
* cheerio使用load方法将服务器返回的数据变成JS对象，然后获取页面数据
* fs使用writeFile方法写入