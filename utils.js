function parseCsv(req, res, next) {
    const lines = req.body.toString().split('\n');
    return lines.map((l) => {
        return l.split(',').reduce((o, v) => Object.apply(o, { [v]: v }), {});
    });
}

async function dbTransaction(cb) {
    return cb({});
}

const analyticsClient = {
    async send(customer) {
        // ...
    }
}

module.exports = { parseCsv, analyticsClient, dbTransaction};
