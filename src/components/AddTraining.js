import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import moment from 'moment-with-locales-es6';


export default function AddTraining(props) {

  const [open, setOpen] = React.useState(false);

  const [training, setTraining] = React.useState({ date: '', activity: '', duration: '', customer: props.customerT })
 
  const handleClickOpen = () => {
    setOpen(true);
  }

  const handleClose = () => {

    let timefix = training;
    timefix.date = new Date(training.date);
    props.addTraining(timefix);
    //training.date = moment("", "L HH:mm.sss +0200").toISOString();

    //console.log(training.date);
    //props.addTraining(training);
    //console.log(training);
    
    setOpen(false);
  }

  const handleCancel = () => {
    setOpen(false);
  }

  const inputChanged = (event) => {
    setTraining({ ...training, [event.target.name]: event.target.value });
    console.log(training.date)
  }
  

  return (
    <div>
      <Button style={{ margin: 10 }} variant="outlined" color="primary" size="small" onClick={handleClickOpen}>
        Add training
        </Button>
      <Dialog open={open} disableBackdropClick={true} disableEscapeKeyDown={true} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">New training</DialogTitle>
        <DialogContent>

          <TextField
            autoFocus
            margin="dense"
            id="date"
            name="date"
            value={training.date}
            /*value={
            //  training.date = moment("L HH:mm.sss +0200").toISOString()
            }*/
            onChange={inputChanged}
            label="Date"
            fullWidth
          />
          <TextField
            margin="dense"
            id="activity"
            name="activity"
            value={training.activity}
            onChange={inputChanged}
            label="Activity"
            fullWidth
          />
          <TextField
            margin="dense"
            id="duration"
            name="duration"
            value={training.duration}
            onChange={inputChanged}
            label="Duration"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancel} color="primary">
            Cancel
          </Button>
          <Button onClick={handleClose} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}