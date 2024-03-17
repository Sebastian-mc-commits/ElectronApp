const { MarketTradesService, TransactionSummaryService } = require("../services/index.js")
const { convertToUseFetchObject } = require("../utils/functions/useFetch.js")
const CacheHandler = require("../.cache/index.js")

const marketTradesService = new MarketTradesService()
const transactionSummaryService = new TransactionSummaryService()
const cacheHandler = new CacheHandler()

module.exports = (ipcMain) => {

    ipcMain.on(marketTradesService.marketTrades, async (event, { unixDate, unixDateEnd }) => {

        const data = await cacheHandler.setupCacheStorage({
            file: unixDate.toString(),
            callback: () => marketTradesService.getMarketTrades(unixDate, unixDateEnd),
            condition: (data) => !data.hasError
        }, marketTradesService.fetchName, marketTradesService.marketTrades)

        event.reply(marketTradesService.marketTrades, data)
    })

    ipcMain.on(marketTradesService.marketTradesAndCalculateClosingPrice, async (event, { unixDate, unixDateEnd, limit }) => {

        const data = await cacheHandler.setupCacheStorage({
            file: unixDate.toString().concat(unixDateEnd?.toString() || "").concat(limit?.toString() || ""),
            callback: () => marketTradesService.getMarketTrades(unixDate, unixDateEnd, limit),
            condition: (data) => !data.hasError
        }, marketTradesService.fetchName, marketTradesService.marketTrades)

        event.reply(marketTradesService.marketTrades, data)

        if (!data.hasError) {

            const calculatedClosingPrice = await cacheHandler.setupCacheStorage({
                file: marketTradesService.marketTradesAndCalculateClosingPrice.concat(unixDate.toString()).concat(unixDateEnd?.toString() || "").concat(limit?.toString() || ""),
                callback: () => marketTradesService.calculateClosingPrice(data.response.trades),
                condition: (data) => !data.hasError
            }, marketTradesService.fetchName, marketTradesService.marketTrades)

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