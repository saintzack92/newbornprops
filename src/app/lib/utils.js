
import { DataSource } from 'typeorm';
// Import your entity
import Article from "./entities/Article";

// This function establishes a connection to the database using TypeORM.

const AppDataSource = await DataSource({
    type: "mysql",
    host: 'localhost', // This should be 'localhost' or your MySQL server's IP
    username: 'root',
    password: 'UINw580i!', // Replace with your real password
    database: 'adminpanel',
    port: 3306,
    entities: [Article], // Register your entity here
    synchronize: true, // Be cautious with this in production!
});



// Export the function for use elsewhere in your application
async function connectToDb() {
    try {
        await AppDataSource.initialize(); // Correctly initialize the data source
        console.log('Successfully connected to the database');
    } catch (error) {
        console.error('Failed to connect to the database', error);
        throw error;
    }
}

export async function fetchArticle() {
    try {
        // Assuming Article is a valid TypeORM entity
        const article = new Article();
        article.title = 'test';
        article.description = 'test description';

        // Use the data source to get the repository and then save the article
        await AppDataSource.getRepository(Article).save(article);
        console.log('Article saved:', article);
    } catch (error) {
        console.error('Failed to save the article', error);
        throw error;
    }
}
fetchArticle()

// Export the connection and the function to use elsewhere in your application
export { AppDataSource, connectToDb };