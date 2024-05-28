import { localDatabase } from "./variables";

const mysql = require("mysql");
const fs = require("fs");
const path = require("path");
const { databaseID } = require("./variables");
export const nextSession = (): string => {
    const date = new Date();
    const year = date.getFullYear() + 1;
    return `${year}-${new Date().getFullYear() + 2}`;
};
export const curSession = (): string => {
    const date = new Date();
    const year = date.getFullYear() + 1;
    return `${new Date().getFullYear()}-${year}`;
};

export const getDate = () =>
    `${new Date().getFullYear()}-${new Date().getMonth()}-${new Date().getDate()} `;

export const getCurTime = () =>
    `${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`;
export const getDifTime = (t1: string, t2: string) => {
    const [h1, m1, s1] = t1.split(":");
    const [h2, m2, s2] = t2.split(":");
    let hr = parseInt(h2) - parseInt(h1);
    let min = parseInt(m2) - parseInt(m1);
    let sec = parseInt(s2) - parseInt(s1);
    if (hr < 0) hr *= -1;
    if (min < 0) min *= -1;
    if (sec < 0) sec *= -1;
    return `${hr}Hr ${min}Min ${sec}Sec`;
};

export async function sqlQuerys(query: string) {
    const db = mysql.createConnection(localDatabase);

    try {
        await new Promise((resolve, reject) => {
            db.connect((err: any) => {
                if (err) reject(err);
                resolve("done");
                console.log("Connected to database");
            });
        });

        const value: [] = await new Promise((resolve, reject) => {
            db.query(query, (err: any, result: any) => {
                if (err) reject(err);
                resolve(result);
            });
        });
        console.log("conection end");
        return value;
    } catch (err) {
        console.error("Error:", err);
        console.log("conection end");
        return [];
    } finally {
        db.end();
    }
}

export async function sqlQueryp(query: string) {
    const db = mysql.createConnection(databaseID);

    try {
        await new Promise((resolve, reject) => {
            db.connect((err: any) => {
                if (err) reject(err);
                resolve("done");
                console.log("Connected to database");
            });
        });

        const value: [] = await new Promise((resolve, reject) => {
            db.query(query, (err: any, result: any) => {
                if (err) reject(err);
                resolve(result);
            });
        });
        console.log("conection end");
        return value;
    } catch (err) {
        console.error("Error:", err);
        console.log("conection end");
        return [];
    } finally {
        db.end();
    }
}
export async function sqlQuery(query: string) {
    const db = mysql.createConnection(databaseID);

    try {
        await new Promise((resolve, reject) => {
            db.connect((err: any) => {
                if (err) reject(err);
                resolve("done");
                console.log("Connected to database");
            });
        });

        const value: [] = await new Promise((resolve, reject) => {
            db.query(query, (err: any, result: any) => {
                if (err) reject(err);
                resolve(result);
            });
        });
        db.end();
        console.log("conection end");
        return value;
    } catch (err) {
        console.error("Error:", err);
        db.end();
        console.log("conection end");
        return { status: "error" };
    }
}
export async function sqlQueryStatus(query: string) {
    const db = mysql.createConnection(databaseID);

    try {
        await new Promise((resolve, reject) => {
            db.connect((err: any) => {
                if (err) {
                    console.log(err);
                    reject(err);
                }
                resolve("done");
                console.log("Connected to database");
            });
        });
        const value = await new Promise((resolve, reject) => {
            db.query(query, (err: any, result: any) => {
                try {
                    if (err) {
                        console.log(err);
                        reject(false);
                    }
                    // console.log(result);
                    if (result.length > 0) resolve(result);
                    else {
                        // console.log(result);
                        resolve(false);
                    }
                } catch (err) {
                    console.log(err);
                    resolve(false);
                }
            });
        });
        db.end();
        console.log("conection end");
        // console.log("result of sql :", value);
        if (value == false) return { status: false, data: value };
        else return { status: true, data: value };
    } catch (err) {
        console.error("Error:", err);
        db.end();
        console.log("conection end");
        return { status: false, data: [] };
    }
}

export async function sqlQueryUpdate(query: string) {
    const db = mysql.createConnection(databaseID);
    console.log("updated process :", query);
    try {
        await new Promise((resolve, reject) => {
            db.connect((err: any) => {
                if (err) {
                    console.log(err);
                    reject(err);
                }
                resolve("done");
                console.log("Connected to database");
            });
        });
        const value = await new Promise((resolve, reject) => {
            db.query(query, (err: any, result: any) => {
                try {
                    if (err) {
                        console.log(err);
                        reject(false);
                    }
                    resolve(true);
                } catch (err) {
                    console.log(err);
                    resolve(false);
                }
            });
        });
        db.end();
        // console.log("conection end");
        // console.log("result of sql :", value);
        return { status: value };
    } catch (err) {
        console.error("Error:", err);
        db.end();
        console.log("conection end");
        return { status: false };
    }
}
