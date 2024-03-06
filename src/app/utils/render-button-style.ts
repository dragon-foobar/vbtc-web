export function renderButtonStyle(type: string) {
  switch (type) {
    case "primary":
      return "px-8 py-3 text-lg font-semibold rounded-md bg-secondary-light hover:bg-secondary text-white";
    case "secondary":
      return "px-8 py-3 text-lg font-semibold border border-2 border-cool-gray rounded-md text-charcoal hover:text-black dark:text-anti-flash-white dark:hover:text-white";
    default:
      return "px-8 py-3 text-lg font-semibold rounded-md dark:bg-violet-400 dark:text-gray-900 ";
  }
}
