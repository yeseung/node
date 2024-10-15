const axios = require("axios");
const cheerio = require("cheerio");

const getHTML = async (keyword) => {
    try {
        const response = await axios.get(
            "https://search.kyobobook.co.kr/search?gbCode=TOT&target=total&keyword=" + encodeURI(keyword)
        );
        return response.data;
    } catch (err) {
        console.error(err);
        return null;
    }
}

const parsing = async (keyword) => {
    const html = await getHTML(keyword);
    if (!html) return;
    
    const $ = cheerio.load(html);
    const $bookList = $(".prod_item");

    let books = [];
    $bookList.each((idx, element) => {
        const title = $(element).find(".prod_info").text().replace(/\n\s+/g, " ").trim();
        const author = $(element).find(".author").text().trim();
        const price = $(element).find(".price .val").text().trim();
        let img = $(element).find(".prod_img_load").attr("src");
        if (!img) {
            img = $(element).find(".prod_img_load").attr("data-src");
        }

        books.push({
            title,
            author,
            price,
            img
        });
    });

    console.log(books);
}

parsing("자바");
