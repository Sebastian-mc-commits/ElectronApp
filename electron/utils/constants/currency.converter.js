
const FROM_USD_TO_COP = 3894.31
const FROM_USD_TO_EURO = 0.92

const USD_to_COP = (USD) => USD * FROM_USD_TO_COP

const USD_to_EURO = (USD) => USD * FROM_USD_TO_EURO

module.exports = {
    FROM_USD_TO_COP,
    FROM_USD_TO_EURO,
    USD_to_COP,
    USD_to_EURO
}