export default function ignoreWarnings(type, ignoreMessages) {
  if (!ignoreMessages) {
    ignoreMessages = type;
    type = 'warn';
  }
  if (!Array.isArray(ignoreMessages)) ignoreMessages = [ignoreMessages];
  if (type === 'warn') {
    try {
      // eslint-disable-next-line global-require, import/no-extraneous-dependencies, no-eval
      const { YellowBox } = eval("require('react-native')");
      YellowBox.ignoreWarnings(ignoreMessages);
      // eslint-disable-next-line no-empty
    } catch (err) {}
  }
  const overloadedConsole = { ...console };
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
