const got = require('@/utils/got');
const { JSDOM } = require('jsdom');

module.exports = async(ctx) => {
    const response = await got({
        method: 'get',
        url: 'https://alltheflightdeals.com/',
    });
    const dom = new JSDOM(response.data, {
        runScripts: 'dangerously',
    });
    const data = dom.window.__REDUX_STATE__.deals.deals;

    ctx.state.data = {
        title: 'All The Flight Deals',
        link: 'https://alltheflightdeals.com/',
        description: 'alltheflightdeals new tickets',
        item: data.map((item) => ({
            title: `票价：${item.price}/${item.currency}
            航班信息：${item.title}`,
            description: `${item.title}`,
            link: item.url,
        })),
    };
};
