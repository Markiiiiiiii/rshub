const got = require('@/utils/got');
const fs = require('fs');
const urlencode = require('urlencode');

module.exports = async (ctx) =>{
    const response = await got({
        method: 'get',
        url: 'https://www.airasia.com/flights/zh/cn/wp-json/aa0144/v1/routes/1/continent?get_price=true&max=100&currency_code=CNY&context=destination&page=1',
    });
    const data = response.data.items;
    const file = fs.createWriteStream('./airinfo/airasia.md');
    file.write('>### 亚洲航空\n\n');
    for (let i = 0; i < data.length; i++) {
        var imgurl = '[![亚洲航空](https://img.shields.io/static/v1?label=%e4%ba%9a%e6%b4%b2%e8%88%aa%e7%a9%ba&message='+urlencode(data[i].origin_city)+'-'+urlencode(data[i].destination_city)+'%20'+urlencode(data[i].price)+'&color=brightgreen)]('+data[i].url+')\n';
        file.write(imgurl);
    }
    file.end();

    ctx.state.data = {
        title: `亚航折扣机票`,
        link: `https://www.airasia.com`,
        description: `亚航折扣机票中文版`,
        item:data.map((item) => ({
                title: `${item.origin_city} -> ${item.destination_city} 票价 ${item.price}`,
                description: `日期: ${item.date_start},出发机场:${item.origin.name},到达机场:${item.destination.name}`,
                link: `${item.url}`,
        })),

    };

};
