import { List, ListItemButton, Paper, Stack, TextField, Typography } from '@mui/material'
import { useEffect, useRef, useState } from 'react'
import RoundButton from './components/round-button'
import { toTitleCase } from './lib/utils'
import RemoveItem from './components/remove-item'


function App() {
  const [ list, setList ] = useState<string[]>([])
  const [ restored, setRestored ] = useState<string[]>([])
  const [ selected, setSelected ] = useState<string | null>(null)
  const inputRef = useRef<HTMLInputElement>()

  useEffect(() => {
    setList(['Item 1', 'Item 2', 'Item 3'])
  }, [1])


  const restoreHandler = ():void => {
    const restore = restored.pop()
    if(restore){
      setList([
        ...list,
        restore
      ])
    }
  }

  const addHandler = ():void => {
    const {current} = inputRef
    setSelected(null)
    current?.focus()
    
    if(!current || current.value.length === 0) return

    const newItem = toTitleCase(current.value)

    if(list.includes(newItem)){
      const filteredList = list.filter( item =>  item !== newItem)
      setList([newItem, ...filteredList])
    }else{
      setList([newItem, ...list])
    }

    current.value = ""
  }

  const selectedHandler = ( item: string ):void => {
    if(item !== selected)
      setSelected(item)
  }

  const deleteHandler = ():void => {
    if(!selected) return

    if(list.includes(selected)){
      const listRestored = restored.slice()

      setRestored([...listRestored, selected])

      const filteredList = list.filter( item =>  item !== selected)
      setList([...filteredList])
    }

    setSelected(null)
  }

  return (
    <Paper sx={{mx: 'auto', width: '50vw', alignSelf: 'center', p: 4}}>
      <Stack sx={{textAlign: 'center'}} direction={'column'} gap={4}>

        <Typography variant='h4' >This is a technical proof</Typography>

        <Typography variant='subtitle2' color={'GrayText'}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
          Pellentesque lorem sapien, viverra commodo ligula in, mollis iaculis lorem. 
          Aliquam metus purus, lobortis in viverra non, gravida at eros. 
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
          Vestibulum sodales enim consectetur metus vulputate maximus. 
        </Typography>
        
        <TextField
          label="Write a task"
          inputRef={inputRef}
          fullWidth/>
        {
          list.length > 0 
          ? (
            <List 
              sx={{
                flexGrow: 1, 
                borderRadius: '5px', 
                border: '1px solid #ddd'
              }} 
              component="nav">
              {
                list.map( (item: string, index: number) => (
                  <ListItemButton 
                    key={index} 
                    onClick={()=>selectedHandler(item)} 
                    selected={selected === item}>
                      {item}
                    </ListItemButton>
                ))
              }
            </List>
          )
          : null 
        }
        <Stack direction={'row'} alignItems={'center'} gap={1}>
          <RoundButton 
            disabled={restored.length === 0}
            color='secondary'
            onClick={restoreHandler}>Restore</RoundButton>
          <RemoveItem 
            onDelete={deleteHandler} 
            title={selected} />
          <RoundButton 
            onClick={addHandler}
            variant='contained' 
            sx={{ml: 'auto'}}>Add</RoundButton>
        </Stack>
      </Stack>
    </Paper>
  )
}

export default App