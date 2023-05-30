import { createLogger, transports, format } from 'winston';
const { combine, printf, label, timestamp, colorize } = format;

const printFormat = printf(({ level, message, timestamp }) => {
    return `${timestamp} ${level}: ${message}`;
});

const infoLogger = createLogger({
    level: 'info',
    format: combine(label({ label: 'LOG', message: true }), colorize(), timestamp(), printFormat),
    transports: [new transports.Console()],
});

export default infoLogger.info
