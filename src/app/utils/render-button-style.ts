export function renderButtonStyle(type: string) {
  switch (type) {
    case "primary":
      return "px-8 py-3 text-lg font-semibold rounded-md bg-secondary-light border border-2 border-secondary-light hover:border-secondary hover:bg-secondary text-white";
    case "secondary":
      return "px-8 py-3 text-lg font-semibold border border-2 border-secondary-light hover:border-secondary rounded-md text-secondary-light hover:text-secondary";
    default:
      return "px-8 py-3 text-lg font-semibold rounded-md";
  }
}
