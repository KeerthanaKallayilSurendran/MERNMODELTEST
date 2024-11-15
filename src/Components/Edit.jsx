import { Box, Modal } from '@mui/material'
import React, { useState } from 'react'
import { taskUpdateAPI } from '../Service/allApi';
const modalStyle = {
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

const Edit = ({ task }) => {
    // console.log(task);

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [maintask, setMainTask] = useState({
        id: task._id, taskName: task.taskName, taskDescription: task.taskDescription, startDate: task.startDate, endDate: task.endDate, taskStatus: task.taskStatus, progress: task.progress
    });

    const handleUpdateTask = async () => {
        const { id, taskName, taskDescription, startDate, endDate, taskStatus, progress } = maintask
        if (taskName && taskDescription && startDate && endDate && taskStatus && progress) {
            const token = sessionStorage.getItem("token")
            if (token) {
                const reqHeader = {
                    "Authorization": `Bearer ${token}`
                }
                try {
                    const result = await taskUpdateAPI(id,maintask, reqHeader)
                    if(result.status==200){
                        alert("Project updated sucessfully")
                        handleClose()
                    }
            } catch (error) {

                }
            }
        } else {
            alert("Please fill the form completely")
        }
    }

    return (
        <div>
            <button onClick={handleOpen}><i class="fa-solid fa-pen-to-square text-xl text-cyan-700"></i></button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={modalStyle} className="flex justify-center items-center flex-col">
                    <h1 className='text-2xl font-bold text-cyan-700 pb-2'>Add Task Details</h1>
                    <input className='rounded-md border border-zinc-700 p-2 mb-2' value={maintask.taskName} onChange={e => setMainTask({ ...maintask, taskName: e.target.value })} type="text" placeholder='Task Heading' />
                    <input className='rounded-md border border-zinc-700 p-2 mb-2' value={maintask.taskDescription} onChange={e => setMainTask({ ...maintask, taskDescription: e.target.value })} type="text" placeholder='Task Description' />
                    <input className='rounded-md border border-zinc-700 p-2 mb-2' value={maintask.startDate} onChange={e => setMainTask({ ...maintask, startDate: e.target.value })} type="date" placeholder='Task Start Date' />
                    <input className='rounded-md border border-zinc-700 p-2 mb-2' value={maintask.endDate} onChange={e => setMainTask({ ...maintask, endDate: e.target.value })} type="date" placeholder='Task End Date' />
                    <select
                        className='rounded-md border border-zinc-700 p-2 w-full'
                        value={maintask.taskStatus}
                        onChange={e => setMainTask({ ...maintask, taskStatus: e.target.value })}
                    >
                        <option value="" disabled>Select Task Status</option>
                        <option value="Not Started">Not Started</option>
                        <option value="Started">Started</option>
                        <option value="Half Completed">Half Completed</option>
                        <option value="Completed">Completed</option>
                    </select>
                    <button onClick={handleUpdateTask} className='px-5 py-2 mt-2 rounded-md bg-cyan-700 text-white text-md font-bold'>Update</button>
                </Box>
            </Modal>
        </div>
    )
}

export default Edit