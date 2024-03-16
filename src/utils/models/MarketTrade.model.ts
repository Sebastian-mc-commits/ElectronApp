export type Trades = {
    trade_id: string;
    product_id: string;
    price: string;
    size: string;
    time: string;
    side: string;
    bid: string;
    ask: string;
}

export type MarketSummaryType = {
    closingPrice: number,
    totalSize: number
}

export type CurrencyType = {
    COP: number;
    EURO: number;
}

export type MarketSummaryTypeAndCurrency = CurrencyType & MarketSummaryType

export default interface IMarketTrade {
    best_ask: string;
    best_bid: string;
    trades: Trades[];
}