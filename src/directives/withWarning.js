export default {
  bind(el, binding) {
    const message = binding.value || "Are you sure you want to continue?";
    const color = binding.arg || "blue";
    const { prevent } = binding.modifiers;

    el.style.color = color;
    el.style.borderColor = color;

    el.__WithWarning__ = () => {
      if (!prevent) {
        alert(message);
      }
    };
    el.addEventListener("click", el.__WithWarning__);
  },
  unbind(el) {
    el.removeEventListener("click", el.__WithWarning__);
  }
};
