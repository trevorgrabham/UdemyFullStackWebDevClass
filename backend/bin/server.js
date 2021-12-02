const app = require("../app/index.js");

const port = 8080 || process.env.port;

app.listen(port, () => {`App is listening at https://localhost:${port}`});