import React, { useState, useEffect} from 'react';
import ReactTable from 'react-table-v6'
import 'react-table-v6/react-table.css'


export default function Customerlist(){

const[customers, setCustomers] = useState([]);

useEffect(() => {
  getCustomers();
},[])

const getCustomers = () => {
    fetch('https://customerrest.herokuapp.com/api/customers')
    .then(response => response.json())
    .then(res => setCustomers(res.content))
    .catch(err => console.log(err))
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
] 


return (
    <div>
      <ReactTable data={customers} defaultPageSize={10}
        columns={columns} filterable={true}/>

    </div>
  );
}