Cypress.on("uncaught:exception", (err, _runnable) => {
  console.error("Uncaught exception in this spec:", err);
  console.error("Stack trace:", err.stack);
  return true;
});

Cypress.on("fail", (error, _runnable) => {
  debugger;

  // we now have access to the err instance
  // and the mocha runnable this failed on

  throw error; // throw error to have test still fail
});
