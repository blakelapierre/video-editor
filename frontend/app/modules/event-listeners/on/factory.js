module.exports = () => {
  return (el, listeners) => {
    for (let name in listeners) {
      el.addEventListener(name, listeners[name]);
    }
  };
};