const got = require('@/utils/got');
const cheerio = require('cheerio');

module.exports = async (ctx) => {
    const response = await got({
        method: 'get',
        url: 'https://pages.ch.com/act/tiantianjingxipc',
    });
    const data = response.data;
    const $ = cheerio.load(data);
    const list = $('.m-route-item', 'div[id=84110]');
    ctx.state.data = {
        title: '春秋航空折扣机票',
        link: 'https://pages.ch.com/act/tiantianjingxipc',
        item:
            list &&
            list
                .map((index, item) => {
                    item = $(item);
                    return {
                        title: `${item
                            .find('.m-route-item-header')
                            .children()
                            .first()
                            .text()}->${item
                            .find('.m-route-item-header')
                            .children()
                            .last()
                            .text()
                            } 票价：&#165;${item
                                .find('.price-content-price', '.flight')
                                .first()
                                .text()}起`,
                        description: `票价:${item
                            .find('.price-content-price', '.flight')
                            .first()
                            .text()
                        }`,
                        link: `https://pages.ch.com/AirFlights/ActivityTickets?OriCityCode=${item
                        .find('.price-btn a')
                        .attr('data-dep')}&DestCityCode=${item
                        .find('.price-btn a')
                        .attr('data-arr')}&ActivityCode=AtyModule_84039&intcmp=tiantianjingxipc&IsIJ=0`,
                    };
                })
                .get(),
    };
};

