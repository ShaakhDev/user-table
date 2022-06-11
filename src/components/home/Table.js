import {useEffect, useMemo} from 'react'
import {useTable} from 'react-table';
import {GetDate} from '../../lib/getDate'
import {COLUMNS} from "./columns";
import "./Table.css"

function Table(props) {
   let checkedUsers = useMemo(()=>[],[])
   const columns = useMemo(() => COLUMNS, []);
   const data = useMemo(() => props?.data, [props?.data])
   const values = [...document.getElementsByName('select')];
   const tableInstance = useTable({
      columns,
      data
   });




   const handleCheckByOne = e => {
      const {value} = e.target
      let index = checkedUsers.indexOf(value);
      if (index === -1) {
         e.target.checked = true
         checkedUsers.push(value)
      } else {
         checkedUsers.splice(index, 1)
         e.target.checked = false
      }
      console.log(checkedUsers)
      props.callback(checkedUsers)
   }


   const handleCheckAll = (e) => {
      const {checked}=e.target
         if(checked){
            checkedUsers.length = 0;
             values.forEach(input=>{
               checkedUsers.push(input.value);
               input.checked = true
            })
         }else{
            checkedUsers.length = 0;
            values.forEach(input=>input.checked=false)
         }

      props.callback(checkedUsers)
   }

   const renderColumns = (column, index) => {
      if (column.Header === 'Select') {
         return <th key={index}><input  onClick={handleCheckAll}  type="checkbox" id="selectAll"/></th>
      } else {
         return <th key={index} {...column.getHeaderProps()}>{column.render('Header')}</th>
      }
   }

   const renderCells = (cell, index) => {
      if (cell.column.Header === 'Select') {
         return <td key={cell.toString(10)}>
            <input onClick={handleCheckByOne} value={cell.row.original.id} type="checkbox"
                   name="select"/></td>
      } else if (cell.column.id === 'last_login' || cell.column.id === 'register_date') {
         let date = GetDate(cell.value)
         return <td key={cell.toString(10)} {...cell.getCellProps()}>{date}</td>
      } else if (cell.value === 'active') {
         return <td key={cell.toString(10)}
                    className=" text-green-600  font-bold" {...cell.getCellProps()}>{cell.render('Cell')}</td>
      } else if (cell.value === 'blocked') {
         return <td key={cell.toString(10)}
                    className=" text-red-600  font-bold" {...cell.getCellProps()}>{cell.render('Cell')}</td>
      } else {
         return <td key={cell.toString(10)} {...cell.getCellProps()}>{cell.render('Cell')}</td>
      }
   }

   const {getTableProps, getTableBodyProps, headerGroups, rows, prepareRow} = tableInstance
   return (
      <div className="xss:overflow-x-scroll md:overflow-hidden">
      <table  {...getTableProps()}>
         <thead>
         {
            headerGroups.map(headerGroup => (
               <tr {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map((column, index) => {
                     return renderColumns(column, index)
                  })}
               </tr>
            ))
         }
         </thead>
         <tbody {...getTableBodyProps}>
         {
            rows.map(row => {
               prepareRow(row)
               return (
                  <tr {...row.getRowProps()}>
                     {row.cells.map(cell => {
                        return renderCells(cell)
                     })}
                  </tr>
               )
            })
         }
         </tbody>
      </table>
      </div>
   );
}

export default Table;