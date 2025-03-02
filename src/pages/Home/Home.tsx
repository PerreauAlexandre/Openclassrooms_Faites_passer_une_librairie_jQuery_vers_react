import { Link } from 'react-router-dom'
import { Employee } from '../../type/Type'

function Home() {
  function saveEmployee(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const employees: Employee[] = JSON.parse(
      localStorage.getItem('employees') || '[]'
    )

    const form = new FormData(e.target as HTMLFormElement)

    const employee: Employee = {
      firstName: form.get('first-name') as string,
      lastName: form.get('last-name') as string,
      dateOfBirth: form.get('date-of-birth') as string,
      startDate: form.get('start-date') as string,
      department: form.get('department') as string,
      street: form.get('street') as string,
      city: form.get('city') as string,
      state: form.get('state') as string,
      zipCode: form.get('zip-code') as string,
    }
    employees.push(employee)
    localStorage.setItem('employees', JSON.stringify(employees))
    alert('Mettre modale de validation')
  }

  return (
    <main>
      <div className="title">
        <h1>HRnet</h1>
      </div>
      <div className="container">
        <Link to="/employee-list">View Current Employees</Link>
        <h2>Create Employee</h2>
        <form id="create-employee" onSubmit={saveEmployee}>
          <label htmlFor="first-name">First Name</label>
          <input type="text" id="first-name" />

          <label htmlFor="last-name">Last Name</label>
          <input type="text" id="last-name" />

          <label htmlFor="date-of-birth">Date of Birth</label>
          <input id="date-of-birth" type="date" />

          <label htmlFor="start-date">Start Date</label>
          <input id="start-date" type="date" />

          <fieldset className="address">
            <legend>Address</legend>

            <label htmlFor="street">Street</label>
            <input id="street" type="text" />

            <label htmlFor="city">City</label>
            <input id="city" type="text" />

            <label htmlFor="state">State</label>
            <select name="state" id="state"></select>

            <label htmlFor="zip-code">Zip Code</label>
            <input id="zip-code" type="number" />
          </fieldset>

          <label htmlFor="department">Department</label>
          <select name="department" id="department">
            <option>Sales</option>
            <option>Marketing</option>
            <option>Engineering</option>
            <option>Human Resources</option>
            <option>Legal</option>
          </select>
          <button type="submit">Save</button>
        </form>
      </div>
      <div id="confirmation" className="modal">
        Employee Created!
      </div>
    </main>
  )
}

export default Home
