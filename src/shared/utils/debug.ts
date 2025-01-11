import isEmpty from "lodash/isEmpty";
import toString from "lodash/toString";

interface LogOptionProps {
  origin: string;
  reason: any;
  code: any;
  label: string;
  hideLine: boolean;
}

type ConsoleLogger = (
  message?: any,
  options?: Partial<LogOptionProps>,
  ...optionalParams: any[]
) => void;
const isProduction = process.env.NODE_ENV === "production";
export const logger: ConsoleLogger = (message, options, ...params) => {
  if (isProduction) return;

  const origin = options?.origin ?? null;
  const separator = options?.label
    ? `-----------[ ${options.label} ]-----------`
    : options?.hideLine
      ? ""
      : "------------------------------------------";

  if (!options?.hideLine) {
    console.debug(separator);
  }
  if (origin && typeof message === "string") {
    console.debug(`[${origin}]: ${toString(message)}`, ...params);
    delete options?.origin;
  } else if (origin) {
    console.debug(message, ...params);
  } else {
    console.debug(message, ...params);
  }

  delete options?.label;
  delete options?.hideLine;

  if (!isEmpty(options)) {
    console.debug(options);
  }
  console.debug(separator);
};

export const logV1 = (
  message: any,
  options?: Partial<Omit<LogOptionProps, "hideLine">>,
  ...params: any[]
) => {
  if (isProduction) return;

  const origin = options?.origin ?? null;

  if (origin && typeof message === "string") {
    console.debug(`[${origin}]: ${toString(message)}`, ...params);
    delete options?.origin;
  } else if (origin) {
    console.debug(message, ...params);
  } else {
    console.debug(message, ...params);
  }

  delete options?.label;

  if (!isEmpty(options)) {
    console.debug(options);
  }
};
