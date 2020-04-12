import React from 'react';
import MaterialTable from 'material-table';


export default function Customerlist(){

const[customers, setCustomers] = React.useState([]);

const getCustomers = () => {
    fetch('https://customerrest.herokuapp.com/api/customers')
    .then(response => response.json())
    .then(data => setCustomers(data.content))
    .catch(err => console.log(err))
}


return (
    <div>hei</div>
  );
}