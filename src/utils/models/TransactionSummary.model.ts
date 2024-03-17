
export type FeeTierType = {
    pricing_tier: number;
    usd_from: number;
    usd_to: number;
    taker_fee_rate: number;
    maker_fee_rate: number;
    aop_from: number;
    aop_to: number;
}

export default interface ITransactionSummary {
    total_volume: number;
    total_fees: number;
    fee_tier: FeeTierType;
    margin_rate: number | null;
    goods_and_services_tax: number | null;
    advanced_trade_only_volume: number;
    advanced_trade_only_fees: number;
}