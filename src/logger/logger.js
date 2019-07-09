import { Level } from "next-core-logger";
import { ConsoleLogger } from "presentation-logger";

const Logger = new ConsoleLogger(Level.DEBUG);

export default Logger;
