import { useState } from 'react'
import { Link } from 'react-router-dom'
import Box from '@mui/material/Box'
import {
  DataGrid,
  GridToolbar,
  GridColDef,
  GridRowsProp,
} from '@mui/x-data-grid'
import dayjs from 'dayjs'
import { Employee } from '../../type/Type'

function EmployeeList() {
  const employees: Employee[] = JSON.parse(
    localStorage.getItem('employees') || '[]'
  )

  const rows: GridRowsProp = employees.map((employee, index) => ({
    id: index,
    ...employee,
  }))

  const columns: GridColDef[] = [
    { field: 'firstName', headerName: 'First Name', width: 120 },
    { field: 'lastName', headerName: 'Last Name', width: 120 },
    {
      field: 'startDate',
      headerName: 'Start Date',
      width: 120,
      valueFormatter: (date) => dayjs(date).format('MM/DD/YYYY'),
    },
    { field: 'department', headerName: 'Department', width: 150 },
    {
      field: 'dateOfBirth',
      headerName: 'Date of Birth',
      width: 120,
      valueFormatter: (date) => dayjs(date).format('MM/DD/YYYY'),
    },
    { field: 'street', headerName: 'Street', width: 150 },
    { field: 'city', headerName: 'City', width: 100 },
    { field: 'state', headerName: 'State', width: 80 },
    { field: 'zipCode', headerName: 'Zip Code', width: 100 },
  ]

  const [paginationModel, setPaginationModel] = useState({
    pageSize: 10,
    page: 0,
  })

  return (
    <main>
      <div id="employee-div" className="container">
        <h1>Current Employees</h1>
        <Box
          sx={{
            width: '90%',
            height: 400,
          }}
        >
          <DataGrid
            disableColumnFilter
            disableColumnSelector
            disableDensitySelector
            rows={rows}
            columns={columns}
            slots={{ toolbar: GridToolbar }}
            slotProps={{
              toolbar: {
                showQuickFilter: true,
                csvOptions: { disableToolbarButton: true },
                printOptions: { disableToolbarButton: true },
              },
            }}
            pagination
            pageSizeOptions={[10, 25, 50, 100]}
            paginationModel={paginationModel}
            onPaginationModelChange={setPaginationModel}
          />
        </Box>
        <Link to="/">Home</Link>
      </div>
    </main>
  )
}

export default EmployeeList
