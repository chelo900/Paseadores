/*
                        ░░░░░░▄█▄█░░░░░▄░░░░░░
                        ░░░░██████░░░░░░█░░░░░
                        ░░░░░░███████████░░░░░
                        ▒▒▒▒▒▒█▀▀█▀▀██▀██▒▒▒▒▒
                        ▒▒▒▒▒▄█▒▄█▒▒▄█▒▄█▒▒▒▒▒
 */

const server = require("./src/app.js");
const { conn } = require("./src/db.js");

//asdasdas

// Syncing all the models at once.
<<<<<<< HEAD
conn.sync({ force: false }).then(() => {
  server.listen({ port : process.env.PORT || 3001}, () => {
=======
conn.sync({ force: true }).then(() => {
  server.listen(3001, () => {
>>>>>>> 5478c30 (cambios)
    console.log('%s listening at 3001'); // eslint-disable-line no-console
  });
});
