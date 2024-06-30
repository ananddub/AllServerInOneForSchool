import { phoneVerfication } from "./components/HTTPSERVER/auth/phoneVerficatoin";
import {
    getDetailNotUploadedImage,
    imageUpload,
    profileUpdate,
} from "./components/HTTPSERVER/image/imageupload";
import { paymentDetails } from "./components/HTTPSERVER/payment/paymentDetail";
import { dueslist } from "./components/HTTPSERVER/user/dues";
import { searchStd } from "./components/HTTPSERVER/user/finduser";
import {
    getEmpImageDetail,
    getImagewithDetail,
} from "./components/HTTPSERVER/user/getImage";
import { getTotalPhoto } from "./components/HTTPSERVER/user/totalphoto";
import { basicDetail } from "./components/HTTPSERVER/user/userDetail";
import { socketRoutes } from "./components/Socket/routes";
import {
    multerEmpimageupload,
    multerImageupload,
} from "./middleware/multerImageupload";
import { multerDocumentupload } from "./middleware/multerImageupload";
import { app, io } from "./server";
import {
    createAdmin,
    Adminlogin,
    Adminlogout,
    Adminupdate,
    Admindeltete,
    listadmin,
    listnotadmin,
} from "./components/HTTPSERVER/Admin/create";
import { getAdminTeacherDetail, getTeacherAttendance, marksAttendance } from "./components/HTTPSERVER/Attendance/attendance";
const path = require("path");

app.put("/imageupload", multerImageupload.single("image"), imageUpload);
app.post("/empimageupload", multerEmpimageupload.single("image"), imageUpload);
app.put("/profileupdate", multerImageupload.single("image"), profileUpdate);
app.get("/getstdnotuploaded", getDetailNotUploadedImage);
app.get("/phoneVerfication", phoneVerfication);
app.get("/paymentDetails", paymentDetails);
app.get("/BasicDetails", basicDetail);
app.get("/searchstd", searchStd);
app.get("/dues", dueslist);
app.get("/getStdImage", getImagewithDetail);
app.get("/getEmpImage", getEmpImageDetail);
app.get("/totalphoto", getTotalPhoto);
app.post("/admin/create", createAdmin);
app.post("/admin/login", Adminlogin);
app.put("/admin/logout", Adminlogout);
app.put("/admin/update", Adminupdate);
app.delete("/admin/delete", Admindeltete);
app.get("/admin/Auser", listadmin);
app.get("/admin/Nuser", listnotadmin);
app.post("/admin/getTeacherAttendance", getAdminTeacherDetail);
app.post("/teacher/attendance", marksAttendance);
app.post("/teacher/getAttendance", getTeacherAttendance);
app.post(
    "/documents",
    multerDocumentupload.single("document"),
    (req: any, res: any) => {
        console.log("called", req.param);
        console.log("saved : ", req.file);
        res.status(200).send("success");
    }
);
app.get("/", (req: any, res: any) => {
    res.sendFile("../../dist/index.html");
});

io.on("connection", socketRoutes);

export const server = () => {
    console.log("server started");
};
