import express from 'express';
import cors from 'cors';
import { nanoid } from 'nanoid';
import Url from './models/urls.models.js';
import connectDB from './data/database.js';
import { config } from 'dotenv';
import os from 'os';

config({
    path:'./data/config.env',
})

const app = express() ;
app.use(cors());
app.use(express.json());
connectDB();


// const uniqueId =async (shortUrl) => {
//      if(await Url.findOne({shortUrl})){
//         shortUrl = await nanoid(5);
     
//         uniqueId(shortUrl);
//      }
//      return shortUrl;
// }

const uniqueId = async(shortUrl) =>{
     while(await Url.findOne({shortUrl})){
        shortUrl = await nanoid(5);
     }
     return shortUrl ;
}

app.get('/',(req,res)=>{
    res.json({
        status:'ok',
        message:'server is working'
    })
})


app.post('/',async (req,res)=>{
    try{
        
        const baseUrl = `${req.protocol}://${req.get('host')}`;

        //dikkat jo aa raha hai woh ye hai ki jab url exist nhi karta hai tab toh ek hi response hai res.send('server is working) lekin jab ,url database mei pehle se exist karta hai tab dikkat hoti hai kyunki tab 2 response ban jate hai , ek server is working aur ek res.json(duplicate) , aur jab ek hi url se 2 response ate hai tab hamei milta hai ----- Error [ERR_HTTP_HEADERS_SENT]: Cannot set headers after they are sent to the client
        // res.send('server is working');
        const longUrl = req.body.longUrl;
        const url = await Url.findOne({longUrl:longUrl});
        if(url){
            return res.json({
                status:'ok',
                message:'url already there',
                url:`${HOST}/${url.shortUrl}`
            }).status(200) 
        }
        const shortUrl = await nanoid(5);
        const unique = await uniqueId(shortUrl);
        await Url.create({
            longUrl:longUrl,
            shortUrl:unique
        })
        res.json({
            status:'ok',
            message:'url converted',
            url:`${baseUrl}/${unique}`
        })
    }
    catch(err){
        console.log(err);
        res.json({
            status:'err',
            message:err
        })
    }



})



app.get('/:shortUrl',async (req,res)=>{
    try{
        console.log(req.params.shortUrl)
        const shortUrl=req.params.shortUrl;
        const url = await Url.findOne({shortUrl});
        console.log(url.longUrl)
        if(url.longUrl){
            url.count += 1;
            await url.save();
            return res.redirect(url.longUrl);
        }
        else{
            return res.json({
                status:404,
                message:"error"
            })
        }
    }
    catch(err){
        console.log(err);
        res.json({
            status:'error',
            message: err
        })
    }

})

app.listen(process.env.PORT,()=>{
    console.log(`server is working on machine ${os.hostname()} in port ${process.env.PORT}`)
})