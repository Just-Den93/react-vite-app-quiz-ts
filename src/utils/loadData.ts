export function loadFileCount(): number {
  // Убедимся, что require.context поддерживается с типизацией
  const context = require.context('../data', false, /\.json$/);
  return context.keys().length;
}