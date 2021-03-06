module.exports = {
  seed: (connection) => {
    return new Promise((res, rej) => {
      const query = "CREATE TABLE users (id INT(11), name VARCHAR(255))";
      connection.query(query, (err, results, fields) => {
        if (err) {
          rej(err);
        } else {
          res("success");
        }
      });
    });
  },

  insert: (connection, input) => {
    return new Promise((res, rej) => {
      const query = "INSERT INTO users values(?, ?)";
      connection.query(
        query,
        [input.id, input.name],
        (err, results, fields) => {
          if (err) {
            rej(err);
          } else {
            res(input);
          }
        }
      );
    });
  },

  getAllUsers: (connection) => {
    return new Promise((res, rej) => {
      const query = "SELECT * FROM users";
      connection.query(query, (err, results, fields) => {
        if (err) {
          rej(err);
        } else {
          res(results);
        }
      });
    });
  },

  selectOneUser: (connection, id) => {
    return new Promise((res, rej) => {
      const query = `SELECT id, name FROM users WHERE id=${id}`;
      connection.query(query, (err, results, fields) => {
        if (err) {
          rej(err);
        } else {
          res(results[0]);
        }
      });
    });
  },

  deleteUser: (connection, id) => {
    return new Promise((res, rej) => {
      const query = `DELETE FROM users WHERE id=${id}`;
      connection.query(query, (err, results, fields) => {
        if (err) {
          rej(err);
        } else {
          res(results);
        }
      });
    });
  },
};
