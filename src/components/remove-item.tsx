import { FC, useState } from "react"
import RoundButton from "./round-button"
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Snackbar } from "@mui/material"

interface PropsTye {
  onDelete: () => void
  title: string | null
}

interface StateType {
  showMessage: boolean
  confirmDialog: boolean
}

const RemoveItem: FC<PropsTye> = ({ onDelete, title }) => {
  const [ state, setState ] = useState<StateType>({
    showMessage: false,
    confirmDialog: false
  }) 

  const removeHandler = ():void => {
    if(!title) return
    
    setState({ showMessage: true, confirmDialog: false})
    onDelete()
  }

  const confirmDeleteHandler = ():void =>  {
    if(!title) return
    setState({ ...state, confirmDialog: true})
  }

  const cancelHandler = ():void =>  setState({ ...state, confirmDialog: false})

  const handleCloseMassage = (event: React.SyntheticEvent | Event, reason?: string):void => {
    if(event)
      event.preventDefault()
    if (reason === 'clickaway') {
      return
    }

    setState({showMessage: false, confirmDialog: false})
  }

  return (
    <>
      <RoundButton
        disabled={!title}
        onClick={confirmDeleteHandler} 
        variant='outlined'>
          Delete</RoundButton>

      <Dialog
        open={state.confirmDialog}
        onClose={cancelHandler}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {title}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Do you realy want to remove this item?
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{justifyContent: 'space-between'}}>
          <Button onClick={cancelHandler}>Cancel</Button>
          <Button 
            color="error"
            onClick={removeHandler} autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>


      <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        open={state.showMessage}
        autoHideDuration={1000}
        onClose={handleCloseMassage}
        message="Removed"
        action={
          <Button color="secondary" size="small" onClick={handleCloseMassage}>
            Close
          </Button>
        }
      />
    </>
  )
}

export default RemoveItem