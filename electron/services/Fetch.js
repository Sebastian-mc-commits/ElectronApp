const { useFetchWithAuthorizationToken } = require("../utils/functions/index.js")
const { URL } = require("../config/index.js")

module.exports = class {

    fetchName = ""

    coinbaseFetcher = async (API, TRADE_API) => await useFetchWithAuthorizationToken(
        {
            url: `https://${URL}/api/v3/${API}`,
            tokenUrl: `/api/v3/${TRADE_API || API}`
        }, {
        method: "GET"
    }
    )

    constructor(fetchName) {
        this.fetchName = fetchName
    }
}