const logger = (req, res, next) => {
    let current_datetime = new Date();
    let formatted_date =
        current_datetime.getFullYear() +
        "-" +
        (current_datetime.getMonth() + 1) +
        "-" +
        current_datetime.getDate() +
        " " +
        current_datetime.getHours() +
        ":" +
        current_datetime.getMinutes() +
        ":" +
        current_datetime.getSeconds();

    let log = `[${formatted_date}] ${req.method}: ${req.url} ${req.status} ${JSON.stringify(req.body)}`;
    console.log(log);
    next();
}

module.exports = logger;