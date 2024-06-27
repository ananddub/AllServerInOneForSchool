import { getCurDate, getCurTime, sqlQueryUpdate } from "../../../../services/sqlfunctoin";
import { curSession } from "../../../../services/sqlfunctoin";
import { Request, Response } from "express";
import { LOCATION } from "../../../../services/variables";
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

function formatDate(): string {
    const date = new Date();
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2); // Adding 1 because getMonth() returns 0 for January
    const day = ('0' + date.getDate()).slice(-2);
    return `${year}-${month}-${day}`;
}

