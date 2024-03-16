const { MarketTradesService, TransactionSummaryService } = require("../services/index.js")

module.exports = (ipcMain) => {
    const marketTradesService = new MarketTradesService()
    const transactionSummaryService = new TransactionSummaryService()

    ipcMain.on(marketTradesService.marketTrades, async (event, args) => {

        const data = await marketTradesService.getMarketTrades(...args)

        event.reply(marketTradesService.marketTrades, data)
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