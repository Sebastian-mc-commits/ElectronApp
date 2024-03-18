import {
    get
} from 'node:http'
import {
    Transform,
    Writable
} from 'node:stream'
import {
    createWriteStream
} from 'node:fs'

const url = "http://localhost:3000"

const getHttpStream = () => new Promise(resolve => get(url, response => resolve(response)))

const stream = await getHttpStream()

stream
    .pipe(
        // it could've been a .map function
        Transform({

            // this will force the stream to use strings instead of buffers
            objectMode: true,
            transform(chunk, enc, cb) {
                const item = JSON.parse(chunk)

                const myNumber = /\d+/.exec(item.name)[0]
                const isEven = myNumber % 2 === 0
                item.name = item.name.concat(isEven ? ' is even' : ' is odd')

                cb(null, JSON.stringify(item))
            }
        })
    )
    .filter(chunk => chunk.includes('even'))
    .map(chunk => chunk.toUpperCase() + "\n")
    .pipe(
        // flag A => append data if existent
        createWriteStream('response.log', { flags: 'a' })
    )

//

import http from 'node:http'
import {
    Readable
} from 'node:stream'
import {
    randomUUID
} from 'node:crypto'
function* run() {
    for (let index = 0; index <= 99; index++) {
        const data = {
            id: randomUUID(),
            name: `Erick-${index}`,
            at: Date.now()
        }
        yield data
    }
}

function handler(request, response) {
    // const readableStream = Readable({
    //   read() {
    //     this.push('Hello')
    //     this.push('World')
    //     this.push(null)
    //   }
    // })

    const readableStream = Readable({
        read() {
            for (const data of run()) {
                this.push(JSON.stringify(data).concat("\n"))
            }
            // just saying that the stream has finished!
            this.push(null)
        }
    })

    readableStream
        .pipe(response)

}

http.createServer(handler)
    .listen(3000)
    .on('listening', () => console.log('server is running at 3000'))