import {environment} from '../../environments/environment';

/**
 * Utils class for logging purposes
 */
export class Logger {

    // Logs enabled variable according production/development environment
    static logsEnabled = !environment.production;

    /**
     * Add info logs
     * @param message to display
     * @param obj to display in console
     */
    static info(message: string, obj: any) {
        if (Logger.logsEnabled) {
            console.log(message, obj);
        }
    }

    /**
     * Add error logs
     * @param message to display
     * @param obj to display in console
     */
    static error(message: string, obj: any) {
        if (Logger.logsEnabled) {
            console.error(message, obj);
        }
    }
}
