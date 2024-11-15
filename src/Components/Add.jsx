import React, { useState } from 'react';
import { Box, Button, Modal, TextField } from '@mui/material';
import { addMainTask } from '../Service/allApi';

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

const Add = ({ open, onClose, onTaskAdded }) => {
    const [maintask, setMainTask] = useState({
        taskName: "", taskDescription: "", startDate: "", endDate: "", taskStatus: "", progress: ""
    });

    const handleAddMainTask = async () => {
        if (maintask) {
            const token = sessionStorage.getItem("token");
            if (token) {
                const reqHeader = { Authorization: `Bearer ${token}` };
                try {
                    const result = await addMainTask(maintask, reqHeader);
                    if (result.status === 200) {
                        alert("Task added successfully!");
                        setMainTask("");
                        onTaskAdded();
                        onClose();
                    } else {
                        alert(result.response?.data || "Error adding task");
                        setMainTask("");

                    }
                } catch (err) {
                    console.error("Error adding task:", err);
                }
            } else {
                alert("User not authenticated.");
            }
        } else {
            alert("Task cannot be empty.");
        }
    };

    return (
        <Modal
            open={open}
            onClose={onClose}
            aria-labelledby="add-task-modal"
            aria-describedby="add-task-modal-description"
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
                <button onClick={handleAddMainTask} className='px-5 py-2 mt-2 rounded-md bg-cyan-700 text-white text-md font-bold'>Add</button>
            </Box>
        </Modal>
    );
};

export default Add;
