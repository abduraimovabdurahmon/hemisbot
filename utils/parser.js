const cheerio = require('cheerio');

module.exports = function HTMLparseToObject(text) {
    const $ = cheerio.load(text);
    const data = [];

    const hafta = $(".box, .box-success, .sh");

    if (hafta.length < 1) {
        console.log("Dars qo'yilmagan");
    }

    for (let i = 0; i < hafta.length; i++) {
        let temp = {};
        const kun = $(hafta[i]).find(".box-title").text().replace(/\s+/g, ' ').trim();
        temp.kun = kun;

        const fanlar = $(hafta[i]).find("li");
        temp.fanlar = [];

        for (let j = 0; j < fanlar.length; j++) {
            let temp2 = {};
            const nomi = $(fanlar[j]).text().split("\n")[1].trim();
            const xona = $(fanlar[j]).find("span").eq(0).text().trim();
            const turi = $(fanlar[j]).find("span").eq(2).text().trim();
            const domla = $(fanlar[j]).find("span").eq(4).text().trim();
            const soat = $(fanlar[j]).find("span").eq(5).text().trim();
            temp2.nomi = nomi;
            temp2.xona = xona;
            temp2.turi = turi;
            temp2.domla = domla;
            temp2.soat = soat;
            temp.fanlar.push(temp2);
        }

        data.push(temp);
    }

    return data;
}
