import { Level } from "next-core-logger";
import { ColorConsoleLogger } from "presentation-logger";

const Logger = new ColorConsoleLogger(Level.DEBUG);

export default Logger;
