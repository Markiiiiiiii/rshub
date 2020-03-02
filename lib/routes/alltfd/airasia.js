const got = require('@/utils/got');
module.exports = async (ctx) =>{
    const response = await got({
        method: 'get',
        url: 'https://www.airasia.com/flights/zh/cn/wp-json/aa0144/v1/routes/1/continent?get_price=true&max=20&currency_code=CNY&context=destination&page=1',
    });
    const data = response.data.items;
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
// const got = require('@/utils/got');
// const cheerio = require('cheerio');

// module.exports = async (ctx) => {
//     const response = await got({
//         method: 'get',
//         url: 'https://www.airasia.com/flights/zh/cn/',
//     });
//     const data = response.data;
//     const $ = cheerio.load(data);
//     const list = $('.card.card--flight-deal');
//     ctx.state.data = {
//         title: '亚航折扣机票',
//         link: 'https://www.airasia.com/flights/zh/cn/',
//         item:
//             list &&
//             list
//                 .map((index, item) => {
//                     item = $(item);
//                     return {
//                         title: `${item
//                             .find('.card__link')
//                             .attr('aria-label')
//                             } `,
//                         description: `票价:${item
//                             .find('.card__rate-price')
//                             .text()
//                         }`,
//                         link: `${item
//                             .find('.card__link')
//                             .attr('herf')}`,
//                     };
//                 })
//                 .get(),
//     };
// };

