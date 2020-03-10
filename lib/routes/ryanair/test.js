const got = require('@/utils/got');
module.exports = async (ctx) =>{
    // const airPortCode = new Array("AMM","AYT","AQJ","BNX","BEY","TXL","BJV","BOJ","CMN","CLJ","DLM","DRS","DBV","DUS","ETM","ERF","EXT","GVA","LWN","HAJ","HEL","HER","KVA","HRK","KSC","KUT","SEN","LWO","SVO","RMU","ODS","OZZ","PVK","JSI","SPU","LED","STR","TBS","TUN","TTU","VIE","EVN","ZRH","BRE","EMA","TNG","OUD","SZZ","IBZ","STN","LGW","LTN","BOH","BTS","BHX","PSR","PGF","PEG","OSR","KLU","KRK","CRV","CFE","KIR","ACE","EFL","LBA","LIG","LPL","CWL","TFN","WMI","NTE","BLQ","CAG","CTA","CCF","FKB","KTW","KLX","CDT","LDE","LUZ","LUX","GOT","CPH","TLS","TUF","SCQ","JTR","TMP","EIN","VDA","KBP","TLL","SVQ","SKG","DLE","DTM","LPA","SZY","AAL","OMR","OSL","AAR","TSF","VCE","AOI","FUE","INI","FNI","NCE","VLC","VLL","PMO","BSL","BCN","GRO","REU","BRI","BVA","XCR","OTP","BRQ","PRG","BDS","BUD","BVE","BRS","BES","BRU","CRL","PLQ","PED","PMF","PFO","CHQ","CUF","WRO","BZG","LDY","MUC","ZAD","ZTH","RBA","LPP","SUF","LCA","LRH","NYO","VST","SXB","FMO","PUY","PIS","PDV","MAN","NRN","SXF","GDN","GNB","GLA","PIK","SDR","TRF","FMM","MAH","BIQ","PSA","BLL","BIO","HAM","FRA","HHN","FAO","POZ","OPO","BOD","TGD","HAU","RZE","GOA","EDI","TFS","TER","TPS","TLV","VAR","TRS","ORK","CFU","KGS","CIY","CGN","MJV","JMK","BGY","MXP","ESU","SOF","NDR","NUE","NCL","NQY","VIT","VNO","VRN","LCJ","RHO","RDZ","RLG","FCO","CIA","KUN","FDH","FSC","SZG","ZAZ","TSR","PDL","NOC","BFS","EGC","BZR","KHE","XRY","DNR","NAP","DUB","TRN","RIX","LIL","LIS","LYS","RMI","RJK","ABZ","ALC","AGA","AMS","LEI","AHO","ATH","FEZ","VXO","SNN","MMX","MAD","AGP","RAK","MST","PMI","MLA","MRS");
    const response = await got({
        method: 'get',
        url: 'https://www.ryanair.com/api/farfnd/3/oneWayFares?departureAirportIataCode=AQJ&language=zh&limit=100&market=zh-cn&offset=0&outboundDepartureDateFrom=2020-03-01&outboundDepartureDateTo=2020-03-31',
    });
    const data = response.data.fares;
    ctx.state.data = {
        title: `瑞安折扣机票`,
        link: `https://www.airasia.com`,
        description: `瑞安折扣机票中文版`,
        item:data.map((item) => ({
                title: `https://img.shields.io/static/v1?label=瑞安航空&message=${item.outbound.departureAirport.name} - ${item.outbound.arrivalAirport.name} ${item.outbound.price.value} ${item.outbound.price.currencySymbol} &color=red`,
                description: `航班信息: ${item.outbound.flightKey}`,
                link: `https://www.ryanair.com/cn/zh/cheap-flights/${item.outbound.departureAirport.seoName}-to-${item.outbound.arrivalAirport.seoName}?out-from-date=${item.outbound.departureDate[0,4]}&out-to-date=${item.outbound.arrivalDate}&budget=150`,
        })),

    };

};