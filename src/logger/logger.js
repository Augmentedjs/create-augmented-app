import { Level, ConsoleLogger } from "presentation-logger";
const level = (IS_PROD === "production") ? Level.INFO : Level.DEBUG;
const Logger = new ConsoleLogger(level);
export default Logger;
