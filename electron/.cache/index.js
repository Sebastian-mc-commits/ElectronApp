const { createWriteStream, createReadStream, existsSync, mkdirSync } = require("node:fs")
const { Transform } = require("node:stream")
const { join } = require("node:path")
const { isJson } = require("../utils/functions/index.js")

module.exports = class {

    _existsInCache = (path) => {
        return existsSync(path)
    }

    _fullPath = (...folders) => {
        return join(__dirname, ...folders)
    }

    _createFolders = (path) => {
        if (this._existsInCache(path)) return
        mkdirSync(path, { recursive: true });
    }

    writeToCache = (path, data) => {

        const stream = createWriteStream(path, { flags: "w" })

        if (Array.isArray(data)) {
            for (const d of data) {
                stream.write(JSON.stringify(d) + "\n")
            }
        }
        else {
            stream.write(JSON.stringify(data) + "\n")
        }

        stream.on("error", (error) => console.log("Error; ", error.message))

        stream.end()
    }

    readFromCache = async (path) => {

        return await new Promise((resolve, reject) => {
            const stream = createReadStream(path)

            const transformStream = new Transform({
                objectMode: true,
                transform(chunk, _d, cb) {

                    if (isJson(chunk)) {
                        cb(null, JSON.parse(chunk))
                    }
                }
            })

            stream.pipe(transformStream)
            const data = []

            transformStream.on("data", (chunk) => {
                data.push(chunk)
            })

            transformStream.on("end", () => {
                resolve(data.length === 1 ? data[0] : data)
            })

        })
    }

    setupCacheStorage = async ({ file, callback, condition, replaceCache = false, setOnce = false }, ...folders) => {
        const path = this._fullPath(...[...folders, file.concat(".json")])

        let finalData = {}

        if (!this._existsInCache(path) || replaceCache || setOnce) {
            this._createFolders(this._fullPath(...folders))

            finalData = await Promise.resolve(callback())
            const isOk = condition(finalData)
            if (setOnce && this._existsInCache(path) && isOk) {
                return finalData
            }

            else if (isOk) {
                this.writeToCache(path, finalData)
                return finalData
            }

        }

        if (replaceCache || this._existsInCache(path)) {
            finalData = await this.readFromCache(path)
        }

        return finalData
    }

    reducer = async ({ isSet, ...initialParams }, { file, callback, condition }, ...folders) => {

        const { replaceCache = false, setOnce = false, removeCache = false } = initialParams

        if (isSet === "YES") {

            if (removeCache) {
                this.clearCache([{
                    file,
                    folders: folders
                }])
            }
        }
        return await this.setupCacheStorage(
            {
                callback,
                condition,
                file,
                replaceCache,
                setOnce
            },
            ...folders
        )
    }

    clearCache(files) {
        console.log("Clearing Cache")
    }
}