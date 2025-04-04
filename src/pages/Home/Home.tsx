import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useForm, Controller } from 'react-hook-form'
import { TextField, Button, MenuItem } from '@mui/material'
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import dayjs from 'dayjs'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import './Home.css'
import { Employee, StateType } from '../../type/Type'
import { states } from '../../data/States.ts'
import Modal from 'openclassrooms_p14_modale_alexandre_perreau'
import 'openclassrooms_p14_modale_alexandre_perreau/dist/openclassrooms_p14_modale_alexandre_perreau.css'

const eighteenYearsAgo = new Date()
eighteenYearsAgo.setFullYear(eighteenYearsAgo.getFullYear() - 18)

const employeeSchema = yup.object().shape({
  firstName: yup.string().required('First Name is required'),
  lastName: yup.string().required('Last Name is required'),
  dateOfBirth: yup
    .date()
    .nullable()
    .required('Date of Birth is required')
    .transform((value) =>
      value instanceof Date || value === null ? value : value.toDate()
    )
    .max(eighteenYearsAgo, 'All employees must be at least 18 years old'),
  startDate: yup
    .date()
    .typeError('Invalid date')
    .required('Start Date is required'),
  street: yup.string().required('Street is required'),
  city: yup.string().required('City is required'),
  state: yup.string().required('State is required'),
  zipCode: yup
    .number()
    .typeError('Zip Code must be a number')
    .required('Zip Code is required'),
  department: yup.string().required('Department is required'),
})

function Home() {
  const [modalOpen, setModalOpen] = useState(false)

  const openModal = () => setModalOpen(true)
  const closeModal = () => setModalOpen(false)

  const {
    control,
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<Employee>({
    resolver: yupResolver(employeeSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      dateOfBirth: undefined,
      startDate: undefined,
      street: '',
      city: '',
      state: '',
      zipCode: undefined,
      department: '',
    },
  })

  const onSubmit = (data: Employee) => {
    const employees: Employee[] = JSON.parse(
      localStorage.getItem('employees') || '[]'
    )
    employees.push(data)
    localStorage.setItem('employees', JSON.stringify(employees))

    openModal()
    reset()
  }

  return (
    <main>
      <div className="title">
        <h1>HRnet</h1>
      </div>
      <div className="container">
        <Link to="/employee-list">View Current Employees</Link>
        <h2>Create Employee</h2>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <form
            id="create-employee"
            className="form-container"
            onSubmit={handleSubmit(onSubmit)}
          >
            <TextField
              label="First Name"
              {...register('firstName')}
              error={!!errors.firstName}
              helperText={errors.firstName?.message}
              fullWidth
            />
            <TextField
              label="Last Name"
              {...register('lastName')}
              error={!!errors.lastName}
              helperText={errors.lastName?.message}
              fullWidth
            />
            <Controller
              name="dateOfBirth"
              control={control}
              render={({ field }) => (
                <DatePicker
                  label="Date of Birth"
                  value={field.value ? dayjs(field.value) : null}
                  onChange={(date) =>
                    field.onChange(date ? dayjs(date).toISOString() : null)
                  }
                  slotProps={{
                    textField: {
                      error: !!errors.dateOfBirth,
                      helperText: errors.dateOfBirth?.message,
                    },
                  }}
                />
              )}
            />
            <Controller
              name="startDate"
              control={control}
              render={({ field }) => (
                <DatePicker
                  label="Start Date"
                  value={field.value ? dayjs(field.value) : null}
                  onChange={(date) =>
                    field.onChange(date ? dayjs(date).toISOString() : null)
                  }
                  slotProps={{
                    textField: {
                      error: !!errors.startDate,
                      helperText: errors.startDate?.message,
                    },
                  }}
                />
              )}
            />

            <fieldset className="form-container">
              <legend>Address</legend>
              <TextField
                label="Street"
                {...register('street')}
                error={!!errors.street}
                helperText={errors.street?.message}
                fullWidth
              />
              <TextField
                label="City"
                {...register('city')}
                error={!!errors.city}
                helperText={errors.city?.message}
                fullWidth
              />
              <Controller
                name="state"
                control={control}
                render={({ field }) => (
                  <TextField
                    select
                    label="State"
                    {...field}
                    {...register('state')}
                    error={!!errors.state}
                    helperText={errors.state?.message}
                    fullWidth
                  >
                    <MenuItem value="">Select a state</MenuItem>
                    {states.map((state: StateType) => (
                      <MenuItem
                        key={state.abbreviation}
                        value={state.abbreviation}
                      >
                        {state.name}
                      </MenuItem>
                    ))}
                  </TextField>
                )}
              />
              <TextField
                label="Zip Code"
                type="number"
                {...register('zipCode')}
                error={!!errors.zipCode}
                helperText={errors.zipCode?.message}
                fullWidth
              />
            </fieldset>
            <Controller
              name="department"
              control={control}
              render={({ field }) => (
                <TextField
                  select
                  label="Department"
                  {...field}
                  {...register('department')}
                  error={!!errors.department}
                  helperText={errors.department?.message}
                  fullWidth
                >
                  <MenuItem value="">Select a department</MenuItem>
                  <MenuItem value="Sales">Sales</MenuItem>
                  <MenuItem value="Marketing">Marketing</MenuItem>
                  <MenuItem value="Engineering">Engineering</MenuItem>
                  <MenuItem value="Human Resources">Human Resources</MenuItem>
                  <MenuItem value="Legal">Legal</MenuItem>
                </TextField>
              )}
            />
            <Button type="submit" variant="contained" color="primary">
              Save
            </Button>
          </form>
        </LocalizationProvider>
      </div>
      <Modal
        content="Employee Created!"
        isOpen={modalOpen}
        closeModal={closeModal}
      />
    </main>
  )
}

export default Home
