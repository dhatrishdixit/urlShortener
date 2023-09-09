import Form from './components/Form';
import Table from './components/Table';
import Top from './components/Navbar.jsx';
import './App.scss';
import { Box } from '@mui/material';

function App() {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column',alignItems:'center',justifyContent:'center', minHeight: '100vh' }}>
      <Top />
      <Box sx={{ flex: 1, padding: '20px' }}>
        <Form />
      </Box>
    </Box>
  );
}

export default App;
