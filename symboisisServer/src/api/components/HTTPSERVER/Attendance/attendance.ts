import { getCurDate, getCurTime, sqlQueryUpdate, sqlQuerys } from "../../../../services/sqlfunctoin";
import { curSession } from "../../../../services/sqlfunctoin";
import { Request, Response } from "express";
import { LOCATION } from "../../../../services/variables";
import { getEmpImageDetail } from "../user/getImage";
import { getEmpImage } from "../../../../services/ImageSaveRetrive";
export async function marksAttendance(req: Request, res: Response) {
    const { empid, inout, address } = await JSON.parse(req.body);
    if (empid === undefined || !empid) return res.status(400).send({ error: `Please provide empid ${empid} \n ${req.body}` });
    else if (inout === undefined || !inout) return res.status(400).send({ error: `Please provide inorout ${inout}` });
    else if (address === undefined || !address) return res.status(400).send({ error: `Please provide address ${address}` });
    else {
        const maxla = LOCATION.latitude + LOCATION.range;
        const maxlg = LOCATION.longitude + LOCATION.range;
        const minla = LOCATION.latitude - LOCATION.range;
        const minlg = LOCATION.longitude - LOCATION.range;

        // if (
        //     address.latitude > maxla || address.latitude < minla ||
        //     address.longitude > maxlg || address.longitude < minlg
        // ) {
        //     return res.status(402).send({ status: "Out Of Range" });
        // }
        let query = '';
        if (inout == 'IN')
            query = `INSERT INTO tbl_empatt (empid, date, status, intime, longitude, latitude,lateby,outtime,earlyby)
SELECT '${empid}', '${formatDate()}', 'p', '${getCurTime()}', '${address.longitude}', '${address.latitude}','${getCurTime()}','00:00:00','NO'
WHERE NOT EXISTS (
SELECT 1 FROM tbl_empatt WHERE empid = '${empid}' AND date = '${formatDate()}'
);

`
        else
            query = `update tbl_empatt set outtime="${getCurTime()}" where empid="${empid}" and date="${formatDate()}"`;
        await sqlQueryUpdate(query);
        res.status(200).send({ status: "success" });
    }

}
export async function getTeacherAttendance(req: Request, res: Response) {
    const { empid } = await JSON.parse(req.body);
    console.log("empid :", empid)
    const query = `SELECT * FROM tbl_empatt where empid="${empid}"`
    const queryall = `SELECT * FROM tbl_employeesetting where empid="${empid}" `
    const queryResult = await sqlQuerys(query);
    const queryResultall: any = await sqlQuerys(queryall);
    const img = getEmpImage(`${empid}.jpg`)
    res.status(200).send({ attendance: queryResult, detail: queryResultall, ...queryResultall[0], image: img });
}
export async function getAdminTeacherDetail(req: Request, res: Response) {
    try {
        const queryall = `SELECT * FROM tbl_employeesetting`
        const queryResultAll: any = await sqlQuerys(queryall);
        res.write('[')
        let i = 0;

        for (let x of queryResultAll) {
            const query = `SELECT * FROM tbl_empatt WHERE empid='${x.empid}';`
            const queryResult = await sqlQuerys(query);
            const image = getEmpImage(`${x.empid}.jpg`)
            const obj = {
                empid: x.empid,
                attendance: queryResult,
                detail: x,
                ...x,
            }
            const json = JSON.stringify(obj)

            res.write(`${json}`)
            if (i < queryResultAll.length - 1)
                res.write(',')
            i += 1;
        }
        res.write(']')
        res.status(200).end();
    } catch (err) {
        console.log(err)
        res.status(500).end();
    }
}
function formatDate(): string {
    const date = new Date();
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);
    return `${year}-${month}-${day}`;
}

