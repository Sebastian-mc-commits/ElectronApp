const Fetch = require("./Fetch.js")

module.exports = class extends Fetch {

    currentTransactionsSummaries = "getCurrentTransactionsSummaries"
    transactionsSummariesByDate = "getTransactionsSummariesByDate"

    constructor() {
        super("transactionsSummaryService")
    }

    #endpoint = (param = "") => `brokerage/transaction_summary${param}`

    getCurrentTransactionsSummaries = async () => await this.coinbaseFetcher(this.#endpoint(), "brokerage/transaction_summary")

    getTransactionsSummariesByDate = async (isoDate, isoDateEnd) => await this.coinbaseFetcher(
        this.#endpoint(`?start_date=${isoDate + (isoDateEnd !== null ? "&end_date=" + isoDateEnd : "")}`),
        this.#endpoint()
    )
}