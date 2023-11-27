// dbsetup.js
const mysql = require("mysql");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "minhduc001",
});

// connect db
const connectDB = () => {
  return new Promise((resolve, reject) => {
    connection.connect((err) => {
      if (err) reject(err);
      console.log("Connected to MySQL database");
      resolve();
    });
  });
};
// create query
const queryDB = (query, values) => {
  return new Promise((resolve, reject) => {
    connection.query(query, values, (err, results) => {
      if (err) reject(err);
      resolve(results);
    });
  });
};
// create DB 
const createDB = async () => {
  const createDBQuery = `CREATE DATABASE IF NOT EXISTS wpr2023;`;
  await queryDB(createDBQuery);
  console.log("Create wpr2023 db successfully")
}

// use DB 
const useDB = async () => {
  const useDBQuery = `USE wpr2023;`;
  await queryDB(useDBQuery);
  console.log("Use wpr2023 db successfully")
}

//creat users table
const creatUsersTable = async () => {
  const creatUsersTableQuery = `
    CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL);`;
  await queryDB(creatUsersTableQuery);
  console.log("Create users table successfully")
};
//create emails table
const creatEmailsTable = async () => {
  const creatEmailsTableQuery = `
    CREATE TABLE IF NOT EXISTS emails (
    id INT AUTO_INCREMENT PRIMARY KEY,
    sender_name VARCHAR(255),
    receiver_name VARCHAR(255),
    subject VARCHAR(255),
    body TEXT,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );`;
  await queryDB(creatEmailsTableQuery);
  console.log("Create emails table successfully")
};
// create users
const createUser = async (userData) => {
  const createUserQuery =
    "INSERT IGNORE users (id ,username, email, password) VALUES ?";
  await queryDB(createUserQuery, [userData]);
  console.log("User inserted successfully");
};

// get userIds
// const getUserIds = async (emails) => {
//   const getUserIdsQuery = "SELECT id FROM users WHERE email IN (?, ?, ?)";
//   const userIdResults = await queryDB(getUserIdsQuery, emails);
//   return userIdResults.map((user) => user.id);
// };

// get userName
const getUserName = async (emails) => {
  const getUserNameQuery = "SELECT username FROM users WHERE email IN (?, ?, ?)";
  const userNameResults = await queryDB(getUserNameQuery, emails);
  return userNameResults.map((user) => user.username);
};


// create emails
const createEmails = async (emailsData) => {
  const createEmailsQuery = `
      INSERT IGNORE emails (id , sender_name, receiver_name, subject, body, timestamp)
      VALUES ?`;
  await queryDB(createEmailsQuery, [emailsData]);
  console.log("Emails inserted successfully");
};

// main 
const main = async () => {
  try {
    await connectDB();
    await createDB();
    await useDB();
    await creatUsersTable();
    await creatEmailsTable();

    const usersData = [
      [1, 'user1', 'a@a.com', '12345678'],
      [2, 'user2', 'b@a.com', '12345678'],
      [3, 'user3', 'c@a.com', '12345678'],
    ];
    await createUser(usersData);

    const emails = ['a@a.com', 'b@a.com', 'c@a.com'];
    // const [userId1, userId2, userId3] = await getUserIds(emails);
    const [userName1, userName2, userName3] = await getUserName(emails);
    // console.log(userId1, userId2, userId3);
    const emailsData = [
      [1, userName1, userName2, 'Subject1', 'Message from User1 to User2', '2023-01-01 12:00:00'],
      [2, userName2, userName1, 'Subject2', 'Message from User2 to User1', '2023-01-01 12:00:00'],
      [3, userName1, userName3, 'Subject3', 'Message from User1 to User3', '2023-01-01 12:00:00'],
      [4, userName3, userName1, 'Subject4', 'Message from User3 to User1', '2023-01-01 12:00:00'],
      [5, userName2, userName3, 'Subject5', 'Message from User2 to User3', '2023-01-01 12:00:00'],
      [6, userName3, userName2, 'Subject6', 'Message from User3 to User2', '2023-01-01 12:00:00'],
      [7, userName1, userName2, 'Subject7', 'Another message from User1 to User2', '2023-01-01 12:00:00'],
      [8, userName2, userName3, 'Subject8', 'Another message from User2 to User3', '2023-01-01 12:00:00'],
      [9, userName3, userName1, 'Subject9', 'Another message from User3 to User1', '2023-01-01 12:00:00'],
    ];

    await createEmails(emailsData);
  }
  catch (error) {
    console.error('Error:', error);
  } finally {
    connection.end();
  }
}
main();
