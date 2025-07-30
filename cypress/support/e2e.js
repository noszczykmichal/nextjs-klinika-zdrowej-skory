Cypress.on("uncaught:exception", (err, _runnable) => {
  console.error("Uncaught exception in this spec:", err);
  console.error("Stack trace:", err.stack);
  return true;
});
