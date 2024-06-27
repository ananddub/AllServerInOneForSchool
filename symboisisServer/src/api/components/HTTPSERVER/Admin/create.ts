import { Request, Response } from "express";
import {
    curSession,
    getCurTime,
    getDate,
    getDifTime,
    sqlQueryUpdate,
    sqlQuerys,
} from "../../../../services/sqlfunctoin";
import { getEmpImage } from "../../../../services/ImageSaveRetrive";

export const createAdmin = async (req: Request, res: Response) => {
    const { username, password } = req.body;
    console.log("created admin :", [username, password]);
    if (username === undefined || !username) {
        return res.status(400).send({ status: "fail" });
    }
    const check = `select * userlogin where username = '${username}';`;
    if ((await sqlQuerys(check)).length > 0)
        return res.status(400).send({ status: "user already exist" });
    const query = `INSERT INTO userlogin ( username, pass) VALUES ('${username}', ${password === undefined || !password ? "12345678" : password
        });`;
    sqlQueryUpdate(query);
    console.log(username, password);
    res.status(200).send({ status: "success" });
};

export const Adminupdate = async (req: Request, res: Response) => {
    const { username, password } = req.body;
    if (
        username === undefined ||
        !username ||
        password === undefined ||
        !password
    ) {
        return res.status(400).send({ status: "fail" });
    }

    const query = `UPDATE userlogin SET pass = '${password}' WHERE username = '${username}';`;
    const data: any = await sqlQuerys(query);
    if (data.changedRows == 0)
        return res.status(400).send({ status: "inavalid user" });
    console.log(data);
    console.log(username, password);
    res.status(200).send({ status: "success" });
};

export const Adminlogin = async (req: Request, res: Response) => {
    const { username, password } = req.body;
    console.log(req.body, typeof req.body, [username, password]);
    if (
        username === undefined ||
        !username ||
        password === undefined ||
        !password
    ) {
        return res.status(400).send({ status: "fail" });
    }
    console.log("login ", [username, password]);
    const query = `SELECT * FROM userlogin WHERE username = '${username}' and pass = '${password}';`;

    const data: any = await sqlQuerys(query);
    if (data.length == 0)
        return res.status(400).send({ status: "username unable to verify" });

    const datas: any = await sqlQuerys(
        `select name from tbl_employeesetting where mob = '${username}' and active = 1;`
    );
    const sr: any = await sqlQuerys(`select max(sr) from tbl_userlog ;`);
    if (datas.length == 0)
        return res.status(400).send({ status: "mob unable to verify" });
    const insert = `insert into tbl_userlog (sr,uid, date,logintime,duration,logouttime) 
        values (${sr[0]["max(sr)"] + 1},'${datas[0].name
        }', '${getDate()}','${getCurTime()}','','');`;
    const values: any = await sqlQuerys(`select * from tbl_employeesetting where mob=${username}`)
    await sqlQueryUpdate(insert);
    res.status(200).send({ status: "success", value: values, image: getEmpImage(`${values[0].empid}.jpg`) });
};

export const Adminlogout = async (req: Request, res: Response) => {
    const { username } = req.body;
    if (username === undefined || !username) {
        return res.status(400).send({ status: "fail" });
    }
    const datas: any = await sqlQuerys(
        `select name from tbl_employeesetting where mob = '${username}' and active = 1;`
    );
    const id: any = await sqlQuerys(
        `select * from tbl_userlog where uid = '${datas[0].name}' order by sr desc limit 1;`
    );
    if (datas.length == 0 || id.length == 0)
        return res.status(400).send({ status: "fail" });
    const t1 = getCurTime();
    const dif = getDifTime(t1, id[0].logintime);
    const update = `UPDATE tbl_userlog 
                        SET duration = '${dif}', logouttime = '${t1}'
                        WHERE sr = ${id[0].sr};`;
    await sqlQueryUpdate(update);
    res.status(200).send({ status: "success" });
};

export const Admindeltete = async (req: Request, res: Response) => {
    const { username, password, mob } = req.body;
    console.log("delete user  :", [username, password]);
    if (username === undefined || !username) {
        return res.status(400).send({ status: "fail" });
    }
    const query = `delete from userlogin where username = '${username}';`;
    await sqlQueryUpdate(query);
    res.status(200).send({ status: "success" });
};

export const listadmin = async (req: Request, res: Response) => {
    try {
        const query = `SELECT * FROM tbl_employeesetting WHERE mob in (select username from userlogin) and active = 1;`;

        const data: any = await sqlQuerys(query);
        for (let x of data) {
            const last = data.length - 1;
            const value = { ...x, imagepath: getEmpImage(`${x.empid}.jpg`) };
            const str: String = `${JSON.stringify(value)}${x == data[last] ? "" : ","
                }\n`;
            res.write(str);
        }
        res.status(200).end();
    } catch (err) {
        console.log(err);
        res.status(400).end();
    }
};

export const listnotadmin = async (req: Request, res: Response) => {
    try {
        const query = `SELECT * FROM tbl_employeesetting WHERE mob not in (select username from userlogin) and active = 1;`;
        const data: any = await sqlQuerys(query);
        for (let x of data) {
            const last = data.length - 1;
            const value = { ...x, imagepath: getEmpImage(`${x.empid}.jpg`) };
            res.write(
                `${JSON.stringify(value)}${x == data[last] ? "" : ","}\n`
            );
        }
        res.status(200).end();
    } catch (err) {
        console.log(err);
        res.status(400).end();
    }
};
