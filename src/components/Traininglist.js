import React, { useState, useEffect } from 'react';
import ReactTable from 'react-table-v6'
import 'react-table-v6/react-table.css'
import moment from 'moment-with-locales-es6';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import DeleteIcon from '@material-ui/icons/Delete';

export default function Traininglist() {

  const [trainings, setTrainings] = useState([]);
  const [open, setOpen] = useState(false);
  const [msg, setMsg] = useState('');

  useEffect(() => {
    getTrainings();
  }, [])

  const getTrainings = () => {
    fetch('https://customerrest.herokuapp.com/gettrainings')
      .then(response => response.json())
      .then(res => {
        setTrainings(res)
      })
      .catch(err => console.log(err))
  }

  const deleteTraining = (original) => {
    if (window.confirm('Are you sure?')) {
      fetch(`https://customerrest.herokuapp.com/api/trainings/${original.id}`,
        { method: 'DELETE' })
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
      Cell: row => (<Button color="secondary" startIcon={<DeleteIcon />} onClick={() => deleteTraining(row.original)}></Button>)
    },
    {
      Header: 'Training id',
      accessor: 'id'
    },
    {
      Header: 'Date',
      // When accessor gets something else than string id value is needed
      id: 'dateID',
      // accessor gets function instead of String and returns wanted value
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
      <h2>Trainings:</h2>
      <ReactTable data={trainings} defaultPageSize={10}
        columns={columns} filterable={true} style={{marginLeft: 50, marginRight: 50, marginTop: 20, marginBottom: 0, backgroundColor: 'whitesmoke', borderColor: 'darkgrey'}}/>
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
      <footer style={{backgroundColor: 'navy', color: 'white', textAlign: 'left'}}> @Personal trainer</footer>
    </div>
  );
}