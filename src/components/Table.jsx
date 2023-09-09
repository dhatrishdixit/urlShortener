import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';



const Table = ({longUrl,shortUrl,count,deleteHandler}) => {
  const combinedUrl = `https://bt-99ux.onrender.com/${shortUrl}`
  return (

    <tr>
    <td>{longUrl}</td>
    <td><a href={combinedUrl}>{combinedUrl}</a></td>
    <td>{count}</td>
    <td>
    <IconButton aria-label="delete" size="small" onClick={()=>deleteHandler(shortUrl)}>
        <DeleteIcon fontSize="small" />
      </IconButton>
      </td>
    </tr>
  
  )
}

export default Table