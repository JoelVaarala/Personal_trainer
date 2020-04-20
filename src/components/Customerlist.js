import React, { useState, useEffect} from 'react';
import ReactTable from 'react-table-v6'
import 'react-table-v6/react-table.css'
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import DeleteIcon from '@material-ui/icons/Delete';


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
    Cell: row => (<Button  color="secondary" startIcon={<DeleteIcon />}  onClick={() => deleteCustomer(row.original.links[0].href)}></Button>)
  },
] 


return (
    <div>
      <ReactTable data={customers} defaultPageSize={20}
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