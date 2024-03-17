
export type ElectronServices = "getMarketTrades"
    | "marketTradesService"
    | "getCurrentTransactionsSummaries"
    | "getTransactionsSummariesByDate"
    | "transactionsSummaryService"
    | "open-new-window"
    | "open-new-window:args"
    | "on-open-window"
    | "getMarketTradesAndCalculateClosingPrice"
    | "USD-converter"

export type WindowNamesTypes = "" | "/marketTradeViewer"
export type WindowParamsEvent<T> = {
    windowName: string;
} & T