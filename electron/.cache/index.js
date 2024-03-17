const { createWriteStream, createReadStream, existsSync, mkdirSync } = require("node:fs")
const { Transform } = require("node:stream")
const { join } = require("node:path")

module.exports = class {

    _existsInCache = (path) => {
        return existsSync(path)
    }

    _fullPath = (...folders) => {
        return join(__dirname, ...folders)
    }

    _createFolders = (path) => {
        mkdirSync(path, { recursive: true });
    }

    writeToCache = (path, data) => {

        const stream = createWriteStream(path, { flags: "a" })

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

    readFromCache = (path) => {

        return new Promise((resolve, reject) => {
            const stream = createReadStream(path)

            const transformStream = new Transform({
                objectMode: true,
                transform(chunk, _d, cb) {
                    cb(null, JSON.parse(chunk))
                }
            })

            stream.pipe(transformStream)
            const data = []

            transformStream.on("data", (chunk) => {
                data.push(chunk)
            })

            transformStream.on("end", () => {
                resolve(data.length === 0 ? data[0] : data)
            })
        })
    }

    setupCacheStorage = async ({ file, callback, condition }, ...folders) => {
        const path = this._fullPath(...[...folders, file.concat(".json")])

        if (!this._existsInCache(path)) {
            this._createFolders(this._fullPath(...folders))

            const data = await Promise.resolve(callback())

            console.log("Should create Cache: ", data)
            if (condition(data)) {
                this.writeToCache(path, data)
            }
            return data
        }

        console.log("Should'nt create Cache: ", path)
        return await this.readFromCache(path)
    }
}