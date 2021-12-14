export default function useLogger() {
  return {
    log: console.log,
    debug: console.debug,
    error: console.error,
  };
}
