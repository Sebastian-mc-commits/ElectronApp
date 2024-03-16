const { MarketTradesService, TransactionSummaryService } = require("../services/index.js")
const { convertToUseFetchObject } = require("../utils/functions/useFetch.js")

module.exports = (ipcMain) => {
    const marketTradesService = new MarketTradesService()
    const transactionSummaryService = new TransactionSummaryService()

    ipcMain.on(marketTradesService.marketTrades, async (event, { unixDate, unixDateEnd }) => {

        const data = await marketTradesService.getMarketTrades(unixDate, unixDateEnd)

        event.reply(marketTradesService.marketTrades, data)
    })

    ipcMain.on(marketTradesService.marketTradesAndCalculateClosingPrice, async (event, { unixDate, unixDateEnd }) => {

        const data = await marketTradesService.getMarketTrades(unixDate, unixDateEnd)

        event.reply(marketTradesService.marketTrades, data)

        if (!data.hasError) {
            const calculatedClosingPrice = marketTradesService.calculateClosingPrice(data.response.trades)

            event.reply(marketTradesService.marketTradesAndCalculateClosingPrice, convertToUseFetchObject({
                response: calculatedClosingPrice
            }))
        }
    })

    ipcMain.on(transactionSummaryService.currentTransactionsSummaries, async (event) => {

        const data = await transactionSummaryService.getCurrentTransactionsSummaries()

        event.reply(transactionSummaryService.currentTransactionsSummaries, data)
    })

    ipcMain.on(transactionSummaryService.transactionsSummariesByDate, async (event, { isoDate, isoDateEnd }) => {

        const data = await transactionSummaryService.getTransactionsSummariesByDate(isoDate, isoDateEnd)

        event.reply(transactionSummaryService.transactionsSummariesByDate, data)
    })
}