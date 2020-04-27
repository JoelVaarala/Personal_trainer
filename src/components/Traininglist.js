import React, { useState, useEffect} from 'react';
import ReactTable from 'react-table-v6'
import 'react-table-v6/react-table.css'
import moment from 'moment-with-locales-es6';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import DeleteIcon from '@material-ui/icons/Delete';

export default function Traininglist(){

const[trainings, setTrainings] = useState([]);
const[open, setOpen] = useState(false);
const[msg, setMsg] = useState('');

useEffect(() => {
  getTrainings();
},[])

const getTrainings = () => {
    fetch('https://customerrest.herokuapp.com/gettrainings')
    .then(response => response.json())
    .then(res => {
      setTrainings(res)
    })
    .catch(err => console.log(err))
}

const deleteTraining = (original) => {
  if(window.confirm('Are you sure?')) {
  fetch(`https://customerrest.herokuapp.com/api/trainings/${original.id}`,
  {method: 'DELETE'})
  .then(_ => getTrainings())
  .then(_ => {
    setMsg('Training deleted');
    setOpen(true);
  })
  .catch(err => console.error(err))
  //console.log(original);
  //console.log(original.id);
}
}

const handleClose = () => {
  setOpen(false);
}

const columns = [
  {
    sortable: false,
    filterable: false,
    id: '',
    Cell: row => (<Button  color="secondary" startIcon={<DeleteIcon />} onClick={() => deleteTraining(row.original)}></Button>)
  },
  {
    accessor: 'id'
  },
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
    id: 'CustomerID',
    accessor: c => c.customer.firstname + ' ' + c.customer.lastname
  },
] 


return (
    <div>
      <ReactTable data={trainings} defaultPageSize={10}
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