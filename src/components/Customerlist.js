import React, { useState, useEffect} from 'react';
import ReactTable from 'react-table-v6'
import 'react-table-v6/react-table.css'
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import DeleteIcon from '@material-ui/icons/Delete';
import EditCustomer from './EditCustomer';
import AddCustomer from './AddCustomer';


export default function Customerlist(){

const[customers, setCustomers] = useState([]);
const[msg, SetMsg] = useState('');
const[open, setOpen] = useState(false);

useEffect(() => {
  getCustomers();
},[])

const getCustomers = () => {
    fetch('https://customerrest.herokuapp.com/api/customers')
    .then(response => response.json())
    .then(res => setCustomers(res.content))
    .catch(err => console.log(err))
}

const addCustomer = (customer) => {
  fetch('https://customerrest.herokuapp.com/api/customers',
  {
    method: 'POST',
    headers: {
      'Content-type' : 'application/json'
    },
    body: JSON.stringify(customer)
  }
  )
  .then(_ => getCustomers())
  .then(_ => {
    SetMsg('New customer added.');
    setOpen(true);
  })
  .catch(err => console.error(err))
}

const updateCustomer = (link, customer) => {
  fetch(link, {
    method: 'PUT',
    headers: {
      'Content-type' : 'application/json'
    },
    body: JSON.stringify(customer)
  })
  .then(_ => getCustomers())
  .then(_ => {
    SetMsg('Customer info updated.');
    setOpen(true);
  })
  .catch(err => console.error(err))
}

const deleteCustomer = (link) => {
  if(window.confirm('Would you like to delete this customer?')){
    fetch(link, {method: 'DELETE'})
    .then(_ => getCustomers())
    .then(_ => {
      SetMsg('Customer deleted.');
      setOpen(true);
    })
    .catch(err => console.log(err))
  }
}

const handleClose = () => {
  setOpen(false);
}

const columns = [
  {
    Header: 'First name',
    accessor: 'firstname'
  },
  {
    Header: 'Last name',
    accessor: 'lastname'
  },
  {
    Header: 'Email',
    accessor: 'email'
  },
  {
    Header: 'Phone',
    accessor: 'phone'
  },
  {
    Header: 'Address',
    accessor: 'streetaddress'
  },
  {
    Header: 'Postcode',
    accessor: 'postcode'
  },
  {
    Header: 'City',
    accessor: 'city'
  },
  {
    sortable: false,
    filterable: false,
    Cell: row => (<EditCustomer customer={row.original} updateCustomer={updateCustomer} />)
  },
  {
    sortable: false,
    filterable: false,
    Cell: row => (<Button  color="secondary" startIcon={<DeleteIcon />} onClick={() => deleteCustomer(row.original.links[0].href)}></Button>)
  },
] 


return (
    <div>
      <AddCustomer addCustomer={addCustomer}/>
      <ReactTable data={customers} defaultPageSize={10}
        columns={columns} filterable={true}/>

      <Snackbar
            open={open}
            autoHideDuration={3000}
            onClose={handleClose}
            message={msg}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left'
            }}
      />
    </div>
  );
}