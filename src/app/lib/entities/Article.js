// entity/Article.js
const { EntitySchema } = require("typeorm");

module.exports = new EntitySchema({
    name: "Article", // Entity name
    tableName: "articles", // Table name
    columns: {
        id: {
            primary: true,
            type: "int",
            generated: true
        },
        description: {
            type: "text"
        },
        createDate: {
            type: "timestamp",
            default: () => "CURRENT_TIMESTAMP"
        },
        title: {
            type: "varchar"

        },
        slug: {
            type: "varchar",
            unique: true
        },
        category:{
          type:"varchar"
        },
        active:{
          type: 'boolean'
        },
        highlights:{
          type: 'boolean'
        },
        amountClicking: {
            type: "int",
            default: 0
        },
        createBy: {
            type: "varchar"
        },
        updateDate: {
            type: "timestamp",
            nullable: true
        },
        delete: {
            type: "boolean",
            default: false
        }
    }
});
