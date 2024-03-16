const Fetch = require('./Fetch.js');

module.exports = class extends Fetch {

    marketTrades = "getMarketTrades"
    marketTradesAndCalculateClosingPrice = "getMarketTradesAndCalculateClosingPrice"

    constructor() {
        super("marketTradesService")
    }
    #endpoint = (param = "") => `brokerage/products/BTC-USD/ticker${param}`

    getMarketTrades = async (unixDate, unixDateEnd, limit = 10) => {

        console.log("Url: ", this.#endpoint(
            `?start=${unixDate}${limit !== 0 ? "&limit=" + limit : ""}${unixDateEnd ? '&end=' + unixDateEnd : ''}`
        ))
        return await this.coinbaseFetcher(
            this.#endpoint(
                `?start=${unixDate}${limit !== 0 ? "&limit=" + limit : ""}${unixDateEnd ? '&end=' + unixDateEnd : ''}`
            ),
            this.#endpoint()
        )
    }

    calculateClosingPrice = (trades) => trades.reduce((acc, trade) => {

        return {
            ...acc,
            closingPrice: acc.closingPrice + parseFloat(trade.price),
            totalSize: acc.totalSize + parseFloat(trade.size),
        }
    }, {
        closingPrice: 0,
        totalSize: 0,
    })
}