const { MarketTradesService, TransactionSummaryService } = require("../services/index.js")
const { convertToUseFetchObject } = require("../utils/functions/useFetch.js")
const CacheHandler = require("../.cache/index.js")

const marketTradesService = new MarketTradesService()
const transactionSummaryService = new TransactionSummaryService()
const cacheHandler = new CacheHandler()

module.exports = (ipcMain) => {

    //Data from specific date
    ipcMain.on(marketTradesService.marketTrades, async (event, { unixDate, unixDateEnd }) => {

        const data = await cacheHandler.setupCacheStorage({
            file: unixDate.toString(),
            callback: () => marketTradesService.getMarketTrades(unixDate, unixDateEnd),
            condition: (data) => !data.hasError
        }, marketTradesService.fetchName, marketTradesService.marketTrades)

        event.reply(marketTradesService.marketTrades, data)
    })

    //END

    //Current Bitcoin data
    ipcMain.on(marketTradesService.marketTradesAndCalculateClosingPrice, async (event, { unixDate, unixDateEnd, limit, formattedDate, ...otherParams }) => {

        const data = await cacheHandler.reducer(otherParams, {
            file: formattedDate.concat(limit?.toString() || "10"),
            callback: () => marketTradesService.getMarketTrades(unixDate, unixDateEnd, limit),
            condition: (data) => !data.hasError
        }, marketTradesService.fetchName, marketTradesService.marketTrades)

        event.reply(marketTradesService.marketTrades, data)

        if (!data.hasError) {

            const calculatedClosingPrice = await cacheHandler.reducer(otherParams, {
                file: marketTradesService.marketTradesAndCalculateClosingPrice.concat(formattedDate).concat(limit?.toString() || "10"),
                callback: () => convertToUseFetchObject({
                    response: marketTradesService.calculateClosingPrice(data.response?.trades || [])
                }),
                condition: (data) => !data.hasError
            }, marketTradesService.fetchName, marketTradesService.marketTrades)


            event.reply(marketTradesService.marketTradesAndCalculateClosingPrice, calculatedClosingPrice)
        }
    })

    //END

    ipcMain.on(transactionSummaryService.currentTransactionsSummaries, async (event, { formattedDate }) => {


        const data = await cacheHandler.setupCacheStorage({
            file: formattedDate,
            callback: () => transactionSummaryService.getCurrentTransactionsSummaries(),
            condition: (data) => !data.hasError,
            replaceCache: true
        }, transactionSummaryService.fetchName, transactionSummaryService.currentTransactionsSummaries)

        event.reply(transactionSummaryService.currentTransactionsSummaries, data)
    })

    ipcMain.on(transactionSummaryService.transactionsSummariesByDate, async (event, { isoDate, isoDateEnd, formattedDate }) => {

        const data = await cacheHandler.setupCacheStorage({
            file: formattedDate,
            callback: () => transactionSummaryService.getTransactionsSummariesByDate(isoDate, isoDateEnd),
            condition: (data) => !data.hasError,
            replaceCache: true
        }, transactionSummaryService.fetchName, transactionSummaryService.transactionsSummariesByDate)

        event.reply(transactionSummaryService.transactionsSummariesByDate, data)
    })
}