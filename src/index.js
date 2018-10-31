import newRegExp from 'newregexp';

export default function ignoreWarnings(type, ignoreMessages) {
  if (!ignoreMessages) {
    ignoreMessages = type;
    type = 'warn';
  }
  if (!Array.isArray(ignoreMessages)) ignoreMessages = [ignoreMessages];
  const overloadedConsole = {
    log: console.log,
    info: console.info,
    warn: console.warn,
    error: console.error
  };
  console[type] = (...args) => {
    let log = true;
    ignoreMessages.forEach(ignoreMessage => {
      const message = args.join(' ').slice(0, -1);
      if (/^\/.*\/[a-z]*$/.test(ignoreMessage)) {
        const regex = newRegExp(ignoreMessage);
        if (regex.test(message)) log = false;
      } else if (message.indexOf(ignoreMessage) > -1) {
        log = false;
      }
      if (!log) return false;
      return true;
    });
    if (log) overloadedConsole[type](...args);
  };
}
