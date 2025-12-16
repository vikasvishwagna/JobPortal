import express from 'express'
import cookieParser from 'cookie-parser';
import cors from 'cors';
import userRoute from './routes/user.route.js'
import dotenv from "dotenv";
import connectDB from './utils/db.js'
import companyRoute from './routes/company.route.js'
import jobRoute from './routes/job.route.js'
import applicationRout from './routes/application.route.js'
import path from 'path';

dotenv.config({})
const app = express();

const _dirname = path.resolve();//gives the directary path.

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());

const corsOptions = {
  origin:'https://nexthire-o2t4.onrender.com',
  credentials:true
}

app.use(cors(corsOptions));

const PORT =process.env.PORT || 3000;

//api's
app.use('/api/v1/user', userRoute);
app.use('/api/v1/company', companyRoute);
app.use('/api/v1/job', jobRoute);
app.use('/api/v1/application', applicationRout);

app.use(express.static(path.join(_dirname, "/Frountend/dist")));
// app.get('*', (_,res)=>{
//   res.sendFile(path.resolve(_dirname, "Frountend", "dist", "index.html"));
// })
app.use((req, res) => {
  res.sendFile(path.resolve(_dirname, "Frountend", "dist", "index.html"));
});


connectDB().then(()=>{
  app.listen(PORT,()=>{
  console.log(`server is running at port ${PORT}`);
})
}).catch((error)=>{
  console.log("mongo db connection error: ", error)
})
