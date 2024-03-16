const { config } = require("dotenv")
config()

const {
    KEY_NAME,
    KEY_SECRET,
    URL,
    SERVICE_NAME,
    ALGORITHM,
} = process.env

const configValues = {
    KEY_NAME,
    KEY_SECRET: "-----BEGIN EC PRIVATE KEY-----\nMHcCAQEEICJBg68X2NKQGE1jRJlTwvcUTfRWjzsDYE6QsmpLFxEHoAoGCCqGSM49\nAwEHoUQDQgAEvBeV4TXumlFTvKDhpjJXuft4bClQJOQelIF5vh531AfR2i+uvNwh\nm3hsOntDhUdFKMbCgEZY0VHZTGNomcYK5g==\n-----END EC PRIVATE KEY-----\n",
    URL,
    SERVICE_NAME,
    ALGORITHM
}

module.exports = configValues