import React, { useState, useEffect} from 'react';
import ReactTable from 'react-table-v6'
import 'react-table-v6/react-table.css'
import moment from 'moment-with-locales-es6';


export default function Traininglist(){

const[trainings, setTrainings] = useState([]);

useEffect(() => {
  getTrainings();
},[])

const getTrainings = () => {
    fetch('https://customerrest.herokuapp.com/gettrainings')
    .then(response => response.json())
    .then(res => {setTrainings(res)})
    .catch(err => console.log(err))
}


const columns = [
  {
    Header: 'Date',
    id: 'date',
    accessor: d => {
      return moment(d.date).locale('fi').format('L LT');
    }
  },
  {
    Header: 'Duration(min)',
    accessor: 'duration'
  },
  {
    Header: 'Activity',
    accessor: 'activity'
  },
  {
    Header: 'Customer',
    id: 'customerID',
    accessor: c => c.customer.firstname + ' ' + c.customer.lastname
  },
] 


return (
    <div>
      <ReactTable data={trainings} defaultPageSize={20}
        columns={columns} filterable={true}/>

    </div>
  );
}