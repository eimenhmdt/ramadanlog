import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import { useHabits } from '../hooks';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import {useState, useEffect} from 'react'
// import Checkbox from './Checkbox'





const columns = [
  // { id: 'habit', label: 'Habit', minWidth: 140},
  { id: '1', label: '1st', minWidth: 10 },
  { id: '2', label: '2nd', minWidth: 10 },
  { id: '3', label: '3rd', minWidth: 10 },
  { id: '4', label: '4th', minWidth: 10 },
  { id: '5', label: '5th', minWidth: 10 },
  { id: '6', label: '6th', minWidth: 10 },
  { id: '7', label: '7th', minWidth: 10 },
  { id: '8', label: '8th', minWidth: 10 },
  { id: '9', label: '9th', minWidth: 10 },
  { id: '10', label: '10th', minWidth: 10 },
  { id: '11', label: '11th', minWidth: 10 },
  { id: '12', label: '12th', minWidth: 10 },
  { id: '13', label: '13th', minWidth: 10 },
  { id: '14', label: '14th', minWidth: 10 },
  { id: '15', label: '15th', minWidth: 10 },
  { id: '16', label: '16th', minWidth: 10 },
  { id: '17', label: '17th', minWidth: 10 },
  { id: '18', label: '18th', minWidth: 10 },
  { id: '19', label: '19th', minWidth: 10 },
  { id: '20', label: '20th', minWidth: 10 },
  { id: '21', label: '21st', minWidth: 10 },
  { id: '22', label: '22nd', minWidth: 10 },
  { id: '23', label: '23rd', minWidth: 10 },
  { id: '24', label: '24th', minWidth: 10 },
  { id: '25', label: '25th', minWidth: 10 },
  { id: '26', label: '26th', minWidth: 10 },
  { id: '27', label: '27th', minWidth: 10 },
  { id: '28', label: '28th', minWidth: 10 },
  { id: '29', label: '29th', minWidth: 10 },
  { id: '30', label: '30th', minWidth: 10 },


];

const rows = [
  <Checkbox />
];







export default function StickyHeadTable() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };


  

  

  const { habits } = useHabits();

  const [checked, setChecked] = useState(false); 
  const handleChange = (id) => { 
    
    setChecked(!checked) ; 
    
  }; 

  React.useEffect(() => {

    const data = localStorage.getItem('checkboxes');
    if (data) {
      setChecked(JSON.parse(data))

    }
  })

  React.useEffect(() => {
    localStorage.setItem('checkboxes', JSON.stringify(checked))


  })

  const alio = habits.map((habit) => habit.columns)

  const qolumns = alio.map((qolumn) => qolumn)

                



 
 

  return (
    
    <Paper sx={{ml: 50, mt: 15, width: '100%', maxWidth: '800px', overflow: 'hidden' }}>
     
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            
          
            <TableRow >
            <TableCell
                  style={{ minWidth: 200, position: 'sticky', left: 0, zIndex: 10000000000000, }}
                >
                  
                  Habit
                </TableCell>

                
               
             
              {console.log(qolumns)}
              {console.log(alio)}
              {columns.map((column) => (
                <TableCell
                
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth}}
                >
                  {column.label}


                 
                  
                </TableCell>
              ))}
               


            </TableRow>

            {habits
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((habit) => {
                return (
                  <TableRow hover tabIndex={-1} >
                        <TableCell style={{ minWidth: 200, position: 'sticky', left: 0, zIndex: 10000000000000, }} >
                          {habit.habit}
                          
                          
                        </TableCell>

                        {columns.map((column) => {
                      const value = habit[column.id];
                      
                      return (
                        <TableCell   >
                        
                          <Checkbox color="success"
                          checked={checked}
                          
                          onChange={handleChange}/>

                          

                                
                        </TableCell>
                      );
                    })}
                        
                      
                  </TableRow>
                );
              })}

            


            
          </TableHead>
          <TableBody>

          {/* {habits
              .map((habit) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={habit.id}>
                    {columns.map((column) => {
                      const value = habit[column.id];
                      return (
                        <TableCell key={column.id} >
                          <Checkbox/>
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })} */}

            
           
        </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={habits.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}