var codes = {
    "100": "continue",
    "101": "switching protocol",
    "102": "processing",

    "200": "ok",
    "201": "created",
    "202": "accepted",
    "205": "reset content",
    "206": "partial content",
    "207": "multi-status",
    "208": "multi-status",
    "226": "im used",

    "300": "multiple choice",
    "301": "moved permanently",
    "302": "found",
    "303": "see other",
    "304": "not modified",
    "305": "use proxy",
    "307": "temporary redirect",
    "308": "permanent redirect",

    "400": "bad request",
    "401": "unauthorized",
    "402": "payment required",
    "403": "forbidden",
    "404": "not found",
    "405": "method not allowed",
    "406": "not acceptable",
    "407": "proxy authentication required",
    "408": "request timeout",
    "409": "conflict",
    "410": "gone",
    "411": "length required",
    "412": "precondition failed",
    "413": "payload too large",
    "414": "uri too long",
    "415": "unsupported media type",
    "416": "requested range not satisfiable",
    "417": "expectation failed",
    "421": "misdirected request",
    "422": "unprocessable entity",
    "423": "locked'",
    "424": "failed dependency",
    "426": "upgrade required",
    "428": "precondition required",
    "429": "too many request",
    "431": "request header fields to large",
    "451": "unavailable for legal reasons",

    "500": "internal server error",
    "501": "not implemented",
    "502": "bad gateway",
    "503": "service unavailable",
    "504": "gateway timeout",
    "505": "http version not supported",
    "506": "variant also negotiates",
    "507": "insufficient storage",
    "508": "loop detected",
    "510": "not extended",
    "511": "network authentication require"
}


module.exports = {
    /**
     * Función para centralizar la genericón respuestas 
     * 
     * req : express request object
     * status: HTTP response status code
     * data: data array
     * options: string or data array
     * 
     */
    format: function (req, status, data, options) {
        var output = {};
        output.status = status;
        output.statusText = this.getStatusText(status);
        output.method = req.method;
        output.apiVersion = '1.0';
        data = data ? data : {};
        //Successful responses
        if (status >= 200 && status < 300) {
            output.data = {};
            if (Array.isArray(data)) output.data.items = data;
            else output.data = data;
            if (options) output.data.generalDetails = options;
        } else { // Failure responses
            output.error = {};
            if (Array.isArray(data)) output.error.errors = data;
            else output.error = data;
            if (options) {
                output.error.generalDetails = options;
            }
        }
        console.log(`Sending  ${output.status} ( ${output.statusText} ) response`);
        return output;
    },

    /**
  * Obtiene el texto representativo del estaus
  * code: integer que represente el código
  */
    getStatusText: function (status) {
        return codes[status] || status;
    }
};