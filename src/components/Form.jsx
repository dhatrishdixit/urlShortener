import React, { useEffect } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import {  createSvgIcon, setRef } from '@mui/material';
import { IconButton } from '@mui/material';
import { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import Table from './Table';

const PlusIcon = createSvgIcon(
  
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="#212121"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
    </svg>,
    'Plus',
  );
  
function Form (){
  
  const [url, setUrl] = useState('');
  const [urls,setUrls] = useState([]);
  const [refresh,setRefresh] = useState(false);
  const [loading,setLoading] = useState(false);
  const URL = "https://bt-99ux.onrender.com";
  useEffect(() => {
      axios.get(`${URL}/all`,{withCredentials:true}).then((res)=>{
        console.log(res.data)
        setUrls(res.data.url)
      }).catch(err=> toast.error(err))
  }, [refresh])

  console.log("url",urls)
  const submitHandler =async  (e) =>{

    try {
      console.log('working ')
           e.preventDefault();
          // console.log(url);
          setLoading(true)
          const response = await axios.post(URL,{
            longUrl: url
          },{
            headers:{
              'Content-Type':'application/json'
          },

          });
      
          const data = response.data;
          console.log(data);
          setRefresh((prev) => !prev);
          setLoading(false);
          toast.success('url added');
    } catch (error) {
      console.log(error);
      toast.error(error)
    }
    
  }

  const deleteHandler = async (shortUrl) => {
    try {
      const {data} = await axios.delete(`${URL}/${shortUrl}`,{
        withCredentials:true,
      });
      toast.success(data.message);
      setRefresh((prev) => !prev);

    } catch (error) {
      toast.error(error.response.data.message);
      setRefresh((prev) => !prev);
    }

  }

  return (
<>
    <form onSubmit={submitHandler}>
    <Box
    sx={{
      width: 600,
      maxWidth: '100%',
      display:'flex',
      gap:2,
      marginBottom:'10vh'
    }}
  >
    <TextField fullWidth label="Enter Url" id="fullWidth" value={url} onChange={(e)=>setUrl(e.target.value)} required/>
    <IconButton color="primary" aria-label="add to shopping cart" type='submit'>
    <PlusIcon />
</IconButton>
  </Box>
  </form>

<table>
<tbody>
<tr>
  <th>Old Url</th>
  <th>New Url</th>
  <th>View Count</th>
  <th>Delete</th>
</tr>
   {
    urls.map((url,index)=> <Table key={index} longUrl={url.longUrl} shortUrl={url.shortUrl} count={url.count} deleteHandler={deleteHandler}/>)
   }
</tbody>
</table>
</>
  )
}


export default Form