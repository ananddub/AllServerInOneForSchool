import { getCurTime, sqlQueryUpdate } from "../../../../services/sqlfunctoin";
import { curSession } from "../../../../services/sqlfunctoin";
import { Request, Response } from "express";
import { LOCATION } from "../../../../services/variables";
export async function marksAttendance(req: Request, res: Response) {
    const { empid, inout, address } = req.body;
    if (empid === undefined || !empid) return res.status(400).send("Please provide admno");
    else if (inout === undefined || !inout) return res.status(400).send("Please provide inorout");
    else if (address === undefined || !address) return res.status(400).send("Please provide address");
    else {
        const maxla = LOCATION.latitude + LOCATION.range;
        const maxlg = LOCATION.longitude + LOCATION.range;
        const minla = LOCATION.latitude - LOCATION.range;
        const minlg = LOCATION.longitude - LOCATION.range;

        if (
            address.latitude > maxla || address.latitude < minla ||
            address.longitude > maxlg || address.longitude < minlg
        ) {
            return res.status(400).send({ status: "fail" });
        }
        let query = '';
        if (inout == 'in')
            query = `insert into empatt(empid,date,status,intime,longitude,latitude) values(
                "${empid}",
                "${curSession()}",
                "p",
                "${getCurTime()}",
                "${address.longitude}",
                "${address.latitude}")`;
        else
            query = `update empatt set outtime="${getCurTime()}" where empid="${empid}" and date="${curSession()}"`;
        await sqlQueryUpdate(query);
        res.status(200).send({ status: "success" });
    }

}

type EmployeeAttendance = {
    empid: string;      // varchar(20)
    date: string;       // date (in ISO format: yyyy-mm-dd)
    status: string;     // varchar(2)
    intime: string;     // time (in ISO format: HH:MM:SS)
    lateby: string;     // varchar(50)
    outtime: string;    // time (in ISO format: HH:MM:SS)
    earlyby: string;    // varchar(20)
    longitude?: number; // float, optional
    latitude?: number;  // float, optional
};
