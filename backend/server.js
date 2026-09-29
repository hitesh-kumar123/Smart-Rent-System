// Entry point for the application
require("./app");
app.use("/api/properties", require("./routes/propertyRoutes"));
