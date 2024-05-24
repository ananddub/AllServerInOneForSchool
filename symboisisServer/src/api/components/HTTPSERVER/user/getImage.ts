import { Request, Response } from "express";
import { curSession, sqlQueryStatus, sqlQuerys } from "../../../../services/sqlfunctoin";
import { getEmpImage, getImage } from "../../../../services/ImageSaveRetrive";
export const getImagewithDetail = async (req: any, res: Response) => {
  try {
    const clas = req.query.class;
    const query = `SELECT admno,name,class,section,roll,fname,ptown,fmob FROM tbl_admission WHERE class='${clas}' AND session='${curSession()}' AND active=1  ORDER BY roll  ASC;`;
    const data: any = (await sqlQueryStatus(query)).data;
    for (let x of data) {
      // imagepath: getImage(`${x.admno}.jpg`);
      const last = data.length - 1;
      const value = { ...x, imagepath: getImage(`${x.admno}.jpg`) };
      res.write(`${JSON.stringify(value)}${x == data[last] ? "" : ","}\n`);
    }
    res.status(200).end();
  } catch (err) {
    res.status(500).end();
  }
};

export const getEmpImageDetail = async (req: any, res: Response) => {
  try {
    const clas = req.query.class;
    const query = `select empid,name,mob,fname,gender,designation,town from tbl_employeesetting Where active=1 ORDER BY name`;
    const data: any = await sqlQuerys(query);
    for (let x of data) {
      const last = data.length - 1;
      const value = { ...x, imagepath: getEmpImage(`${x.empid}.jpg`)};
      res.write(`${JSON.stringify(value)}${x == data[last] ? "" : ","}\n`);
    }
    res.status(200).end();
  } catch (err) {
    res.status(500).end();
  }
};
