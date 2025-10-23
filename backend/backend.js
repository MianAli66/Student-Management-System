import express from 'express'
import bodyParser from "body-parser"
import cors from "cors"
import nodemailer from "nodemailer";
import pg from "pg";
import bcrypt from "bcrypt";
import env from "dotenv"

const app = express()
const port = 3000

env.config();
app.use(cors());
app.use(express.json());

const saltRounds=10;
let optsendtime ="";
let otp2="";
let email="";
let password="";
let name="";
let father="";
let qualification="";
let subject="";

const db = new pg.Client({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});
db.connect()

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));


app.post('/stusignup',async (req, res) => {

name = req.body.name;
father = req.body.father;
email = req.body.email;
password = req.body.password;

try{
     const existingStudent = await db.query("SELECT * FROM students WHERE email=$1", [email]);
    const existingTeacher = await db.query("SELECT * FROM teachers WHERE email=$1", [email]);

    if (existingStudent.rows.length > 0 || existingTeacher.rows.length > 0) {
      return res.json({ success: false, message: "Email already exists in another account!" });
    }
   const result= await db.query("SELECT * FROM students WHERE email=$1",[email])

   if( result.rows.length>0){
   return res.json({ success: false, message: "User already exists" });
   }else{
    otp2 = Math.floor(100000 + Math.random() * 900000);
optsendtime= Date.now()
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: "khanrohaan476@gmail.com",
        pass: "asxulyuvtqhymsze",
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

      const info = await transporter.sendMail({
        to: email,
        subject: "For OTP verification ✔",
        html: `Your OTP is ${otp2}`,
      });
      console.log("Message sent: %s", info.messageId);
        
      return res.json({ success: true, message: "OTP sent successfully" });
      
   }}
 catch(err) {
    console.error(err);
    res.json({ success: false, message: "Server error" });
  }
})


app.post('/teasignup',async (req, res) => {

name = req.body.name;
 qualification=req.body.qualification
 subject=req.body.subject
email = req.body.email;
password = req.body.password;

  try{
    const existingTeacher = await db.query("SELECT * FROM teachers WHERE email=$1", [email]);
    const existingStudent = await db.query("SELECT * FROM students WHERE email=$1", [email]);

    if (existingTeacher.rows.length > 0 || existingStudent.rows.length > 0) {
      return res.json({ success: false, message: "Email already exists in another account!" });}

   const result= await db.query("SELECT * FROM teachers WHERE email=$1",[email])
   
   if( result.rows.length>0){
   return res.json({ success: false, message: "User already exists" });
   }else{
    otp2 = Math.floor(100000 + Math.random() * 900000);
optsendtime= Date.now()
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: "khanrohaan476@gmail.com",
        pass: "asxulyuvtqhymsze",
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

      const info = await transporter.sendMail({
        to: email,
        subject: "For OTP verification ✔",
        html: `Your OTP is ${otp2}`,
      });
      console.log("Message sent: %s", info.messageId);
        
      return res.json({ success: true, message: "OTP sent successfully" });
      
   }}
 catch(err) {
    console.error(err);
    res.json({ success: false, message: "Server error" });
  }
})


app.post('/stulogin',async (req, res) => {
 email= req.body.email;
password= req.body.password

const result= await db.query("SELECT * FROM students WHERE email=$1",[email])

if(result.rows.length>0){
let storedpassword= result.rows[0].password
const match = await bcrypt.compare(password , storedpassword)
if(match){
  const tdata = await db.query("SELECT id, name, qualification, subject FROM teachers")
   const assigned = await db.query(
        `SELECT t.id, t.name, t.subject, t.qualification
         FROM student_teachers st
         JOIN teachers t ON st.teacher_id = t.id
         WHERE st.student_id = $1`,
        [result.rows[0].id]
      );
         console.log("Assigned teachers:", assigned.rows);
         res.json({
        success: true,
        student: result.rows[0],
        teachers: tdata.rows,
        assignedTeachers: assigned.rows,
      });
} else  {
      res.json({ success: false, message: "Invalid password" });
    }
}else{

    res.json({success:false , message: "This Email is not Exist! Registered Your Account First"})
}
})

app.post('/tealogin', async(req, res) => {
 email= req.body.email;
password= req.body.password

const result= await db.query("SELECT * FROM teachers WHERE email=$1",[email])

if(result.rows.length>0){
  const teacherid =result.rows[0].id
let storedpassword= result.rows[0].password
const match = await bcrypt.compare(password , storedpassword)
if(match){
 const sdata = await db.query(
  `SELECT s.*
FROM students s
JOIN student_teachers st
 ON s.id = st.student_id
WHERE st.teacher_id = $1;
`,
  [teacherid]
);

    res.json({success:true , message: "password is matched" , sdata:sdata.rows , tprofile:result.rows[0]})
}else{
    res.json({success:false , message: "password is not matched"})
}
}else{

    res.json({success:false , message: "This Email is not Exist! Registered Your Account First"})
}
})


app.post('/stuotp',async (req, res) => {
const { otp } = req.body;

if (otp2 == otp && (Date.now() - optsendtime) <= 60000 ){
      const hashpassword= await bcrypt.hash( password , saltRounds )
 let result=  await db.query("INSERT INTO students (name, father, email, password) VALUES ($1 , $2 ,$3 ,$4) RETURNING *",[name, father, email, hashpassword])


  const tdata = await db.query("SELECT id, name, qualification, subject FROM teachers")
     const assigned = await db.query(
        `SELECT t.id, t.name, t.subject, t.qualification
         FROM student_teachers st
         JOIN teachers t ON st.teacher_id = t.id
         WHERE st.student_id = $1`,
        [result.rows[0].id]
      );
    res.json({success:true ,
      message: "password is matched" ,
       student: result.rows[0],
        teachers: tdata.rows,
      assignedTeachers: assigned.rows})

    }else {
    res.json({success:false , message: "Try Again!"});
  }
})


app.post('/teaotp',async (req, res) => {
const { otp } = req.body;
if (otp2 == otp && (Date.now() - optsendtime) <= 60000 ){
      const hashpassword= await bcrypt.hash( password , saltRounds )
     
 let result=  await db.query("INSERT INTO teachers (name, qualification,subject, email, password) VALUES ($1 , $2 ,$3 ,$4,$5) RETURNING *",[name, qualification,subject, email, hashpassword])

  res.json({success:true , message: "Data Insert Successfully!" ,  tprofile:result.rows[0]});

    }else {
    res.json({success:false , message: "Try Again!"});
  }
})


app.get('/stuResendcode',async (req, res) => {

   try{  otp2 = Math.floor(100000 + Math.random() * 900000);
optsendtime= Date.now()
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: "khanrohaan476@gmail.com",
        pass: "asxulyuvtqhymsze",
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

      const info = await transporter.sendMail({
        to: email,
        subject: "For OTP verification ✔",
        html: `Your OTP is ${otp2}`,
      });
      console.log("Message sent: %s", info.messageId);
        
      return res.json({ success: true, message: "OTP sent successfully" });
   }
 catch(err) {
    console.error(err);
    res.json({ success: false, message: "Server error" });
  }
})


app.get('/teaResendcode',async (req, res) => {

   try{  otp2 = Math.floor(100000 + Math.random() * 900000);
optsendtime= Date.now()
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: "khanrohaan476@gmail.com",
        pass: "asxulyuvtqhymsze",
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

      const info = await transporter.sendMail({
        to: email,
        subject: "For OTP verification ✔",
        html: `Your OTP is ${otp2}`,
      });
      console.log("Message sent: %s", info.messageId);
        
      return res.json({ success: true, message: "OTP sent successfully" });
   }
 catch(err) {
    console.error(err);
    res.json({ success: false, message: "Server error" });
  }

})


app.post("/updateteacher", async (req, res) => {
  const { studentId, teacherId } = req.body;
  await db.query(
    "INSERT INTO student_teachers (student_id, teacher_id) VALUES ($1, $2)",
    [studentId, teacherId]
  );
  res.json({ success: true, message: "Teacher linked successfully!" });
});


app.post("/getAssignedTeachers", async (req, res) => {
  const { studentId } = req.body;

  try {
    const assigned = await db.query(
      `SELECT t.id, t.name, t.subject, t.qualification
       FROM student_teachers st
       JOIN teachers t ON st.teacher_id = t.id
       WHERE st.student_id = $1`,
      [studentId]
    );
    res.json({ success: true, assignedTeachers: assigned.rows });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: "Server error" });
  }
});


app.post("/removeteacher", async (req, res) => {
  const { studentId, teacherId } = req.body;
  try {
    await db.query(
      "DELETE FROM student_teachers WHERE student_id = $1 AND teacher_id = $2",
      [studentId, teacherId]
    );
    res.json({ success: true, message: "Teacher removed successfully" });
  } catch (err) {
    console.error(err);
    res.json({ success: false, message: "Error removing teacher" });
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
