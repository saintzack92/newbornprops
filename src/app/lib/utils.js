import mysql from 'mysql2/promise';

async function createDbConnection() {
    return await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'P@ssw0rd009!', // Ensure to keep your passwords secure
        database: 'adminpanel',
        port: 3306,
    });
}

export async function query({ query, values = [] }) {
    const dbConnection = await createDbConnection();
    try {
        const [results] = await dbConnection.execute(query, values);
        return results;
    } catch (error) {
        console.error("Error executing query", error.message);
        throw error;
    } finally {
        await dbConnection.end();
    }
}

async function initializeDatabase() {
    const dbConnection = await createDbConnection();

    const createArticlesTableSQL = `
    CREATE TABLE IF NOT EXISTS articles (
        id INT AUTO_INCREMENT PRIMARY KEY,
        description TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        title VARCHAR(255),
        slug VARCHAR(255) UNIQUE,
        category VARCHAR(255),
        active BOOLEAN DEFAULT FALSE,
        highlights BOOLEAN DEFAULT FALSE,
        amountClicking INT DEFAULT 0,
        createBy VARCHAR(255),
        updated_at TIMESTAMP NULL,
        deleted_at TIMESTAMP NULL,
    );
`; // Your SQL for creating the table

    try {
        await dbConnection.execute(createArticlesTableSQL);
        console.log("Articles table created or already exists.");
    } catch (error) {
        console.error("Failed to create articles table:", error.message);
    } finally {
        await dbConnection.end();
    }
}

initializeDatabase().catch(error => console.error("Database initialization failed:", error));
    
// const AppDataSource = await DataSource({
//     type: "mysql",
//     host: 'localhost', // This should be 'localhost' or your MySQL server's IP
//     username: 'root',
//     password: 'UINw580i!', // Replace with your real password
//     database: 'adminpanel',
//     port: 3306,
//     entities: [Article], // Register your entity here
//     synchronize: true, // Be cautious with this in production!
// });



// // Export the function for use elsewhere in your application
// async function connectToDb() {
//     try {
//         await AppDataSource.initialize(); // Correctly initialize the data source
//         console.log('Successfully connected to the database');
//     } catch (error) {
//         console.error('Failed to connect to the database', error);
//         throw error;
//     }
// }

// export async function fetchArticle() {
//     try {
//         // Assuming Article is a valid TypeORM entity
//         const article = new Article();
//         article.title = 'test';
//         article.description = 'test description';

//         // Use the data source to get the repository and then save the article
//         await AppDataSource.getRepository(Article).save(article);
//         console.log('Article saved:', article);
//     } catch (error) {
//         console.error('Failed to save the article', error);
//         throw error;
//     }
// }
// fetchArticle()

// // Export the connection and the function to use elsewhere in your application
// export { AppDataSource, connectToDb };