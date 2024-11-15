import React, { useState } from 'react'
import Nav from '../Components/Nav'
import { Box, Button, Modal, TextField } from '@mui/material'
import { addMainTask } from '../Service/allApi';
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};



const Home = () => {
    const [open, setOpen] = useState(false);
    const [maintask, setMainTask] = useState("")
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    console.log(maintask);


    const handleAddMainTask = async () => {
        if (maintask) {
            const token = sessionStorage.getItem("token")
            if (token) {
                const reqHeader = {
                    "Authorization": `Bearer ${token}`
                }
                try {
                    const result = await addMainTask(maintask, reqHeader)
                    if (result.status == 200) {
                        alert("Project added successfully!!!")
                        handleClose()
                    } else {
                        alert(result.response.data)
                    }
                } catch (err) {
                    console.log(err);

                }
            }
        }
    }

    return (
        <div>
            <Nav />
            <div className='min-h-screen'>
                <div className='flex justify-center items-center'>
                    <h1 className='text-2xl p-5'>Add Task</h1>
                    <button className='h-11 w-11 rounded-full flex justify-center items-center bg-cyan-700' onClick={handleOpen}>+</button>
                </div>
            </div>

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style} className="flex justify-center items-center flex-col">
                    <TextField id="maintask" label="Main Task" variant="outlined" onChange={e => setMainTask({ maintask: e.target.value })} />
                    <Button onClick={handleAddMainTask} sx={{ mt: 2 }} variant="contained">Add</Button>
                </Box>
            </Modal>
        </div>
    )
}

export default Home