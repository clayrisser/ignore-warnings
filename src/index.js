export default function ignoreWarnings(type, ignoreMessages) {
  if (!ignoreMessages) {
    ignoreMessages = type;
    type = 'warn';
  }
  if (!Array.isArray(ignoreMessages)) ignoreMessages = [ignoreMessages];
  const overloadedConsole = {
    // eslint-disable-next-line no-console
    log: console.log,
    // eslint-disable-next-line no-console
    info: console.info,
    // eslint-disable-next-line no-console
    warn: console.warn,
    // eslint-disable-next-line no-console
    error: console.error
  };
  // eslint-disable-next-line no-console
  console[type] = (...args) => {
    let log = true;
    ignoreMessages.forEach(ignoreMessage => {
      const message = args.join(' ').slice(0, -1);
      if (message.indexOf(ignoreMessage) > -1) {
        log = false;
        return false;
      }
      return true;
    });
    if (log) overloadedConsole[type](...args);
  };
}
