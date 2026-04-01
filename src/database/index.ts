import "reflect-metadata";
import { DataSource } from "typeorm";
import path from "path";
import { User } from "../entities/User";

export const AppDataSource = new DataSource({
    type: "sqlite",

    // caminho absoluto evita bugs
    database: path.resolve(__dirname, "db.sqlite"),

    entities: [User],

    migrations: [
        path.resolve(__dirname, "./migrations/*.{ts,js}")
    ],

    synchronize: true,
});

export const initDB = async () => {
    try {
        await AppDataSource.initialize();
        console.log("Data Source inicializado");
    } catch (error) {
        console.error(error);
    }}