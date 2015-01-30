module.exports = () => {
  return (el, listeners) => {
    for (let name in listeners) {
      el.removeEventListener(name, listeners[name]);
    }
  };
};