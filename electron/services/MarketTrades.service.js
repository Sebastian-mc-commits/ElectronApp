const Fetch = require('./Fetch.js');

module.exports = class extends Fetch {

    marketTrades = "getMarketTrades"

    constructor() {
        super("marketTradesService")
    }
    #endpoint = (param = "") => `brokerage/products/BTC-USD/ticker${param}`

    getMarketTrades = async (unixDate, unixDateEnd, limit) => this.coinbaseFetcher(
        this.#endpoint(
            `?start=${unixDate}&${limit !== 0 ? "limit=" + limit : ""}&end=${unixDateEnd}`
        ),
        this.#endpoint()
    )
}