import axios from "axios";

const obj = `
[
        { "name": "RAVI KANT GUPTA" },
        { "name": "GULSHAN KUMAR" },
        { "name": "NEHA KUMARI" },
        { "name": "NAGENDRA MISHRA" },
        { "name": "DHANANJAY PANDAY" },
        { "name": "PRATIMA DEVI" },
        { "name": "MADHWEE KESHARI" },
        { "name": "SACCHIDANAND JHA" },
        { "name": "ABC" },
        { "name": "ANJUM ARA" },
        { "name": "RAKHI KUMARI" },
        { "name": "RAVI PRAKASH" },
        { "name": "SHAHNAJ PARVEEN" },
        { "name": "BIJYENDRA KUMAR" },
        { "name": "MRITYUNJAY PANDEY" },
        { "name": "RIZWANA KHATUM" },
        { "name": "PRIYESH CHOUBEY" },
        { "name": "KIRAN SINGH" },
        { "name": "SIVESH PATHAK" },
        { "name": "MAMTA SHARMA" },
        { "name": "RINA KUMARI" },
        { "name": "NIDHI SINGH" },
        { "name": "ANJALI KUMARI" },
        { "name": "RAHUL SHARMA" },
        { "name": "PINTU SINGH" },
        { "name": "JANNAT HUSHAN" },
        { "name": "RAVI PRAKASH" },
        { "name": "TAIYAB HUSSEN" },
        { "name": "BABLU KUMAR" }
    ]
`

async function jsonfix() {
    const value = await axios.post('http://localhost:4000/admin/getTeacherAttendance')
        .then(res => {
            console.log(res.data[0])
            console.log(typeof res.data[0])
        });
}
jsonfix()

