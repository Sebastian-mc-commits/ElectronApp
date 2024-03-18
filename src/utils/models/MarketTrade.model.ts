export type Trades = {
    trade_id: string;
    product_id: string;
    price: string | number;
    size: string;
    time: string;
    side: string;
    bid: string;
    ask: string;
}

export type MarketSummaryType = {
    closingPrice: number;
    totalSize: number;
    finalPrice: Trades;
}

export type CurrencyType = {
    COP: number;
    EURO: number;
    finalPrice: Trades
}

export type MarketSummaryTypeAndCurrency = CurrencyType & MarketSummaryType

export default interface IMarketTrade {
    best_ask: string;
    best_bid: string;
    trades: Trades[];
}