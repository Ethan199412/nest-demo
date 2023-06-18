const STATUS_CODES = {}
export function resWrapper(){
    console.log('[p3.4] ',this.contentType, this)
    this.send = function (msg) {
        var type = typeof msg;
        if (type === 'string' || Buffer.isBuffer(msg)) {
            this.contentType('text/html').status(200).sendHeader().end(msg);
        } else if (type === 'object') {
            // this.contentType('application/json').sendHeader().end(JSON.stringify(msg));
            this.end(JSON.stringify(msg))
        } else if (type === 'number') {
            this.contentType('text/plain').status(msg).sendHeader().end(STATUS_CODES[msg]);
        }
    };
}