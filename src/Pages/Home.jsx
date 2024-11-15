import React, { useEffect, useState } from 'react';
import Nav from '../Components/Nav';
import { Box, Button, Checkbox, FormControlLabel, Modal, TextField } from '@mui/material';
import { addMainTask, getAllTaskAPI } from '../Service/allApi';

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

const Home = () => {
    const [open, setOpen] = useState(false);
    const [maintask, setMainTask] = useState("");
    const [allTasks, setAllTasks] = useState([]);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    useEffect(() => {
        fetchAllTasks();
    }, []);

    const fetchAllTasks = async () => {
        try {
            const result = await getAllTaskAPI();
            if (result.status == 200) {
                setAllTasks(result.data);
            }
        } catch (error) {
            console.error("Error fetching tasks:", error);
        }
    };

    const handleAddMainTask = async () => {
        if (maintask) {
            const token = sessionStorage.getItem("token");
            if (token) {
                const reqHeader = { Authorization: `Bearer ${token}` };
                try {
                    const result = await addMainTask(maintask, reqHeader);
                    if (result.status === 200) {
                        alert("Task added successfully!");
                        handleClose();
                        fetchAllTasks();
                    } else {
                        alert(result.response?.data || "Error adding task");
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
        <div>
            <Nav />

            <div className='min-h-screen'>
                <div className='flex justify-center items-center'>
                    <h1 className='text-2xl p-5'>Add Task</h1>
                    <button
                        className='h-11 w-11 rounded-full flex justify-center items-center bg-cyan-700'
                        onClick={handleOpen}
                    >
                        +
                    </button>
                </div>

                <div className='w-full flex flex-col justify-center items-center'>
                    {allTasks.map((task) => (
                        <div
                            key={task.id}
                            className='w-3/5 border rounded-md px-10 py-2 shadow-md h-20 flex justify-between items-center mb-3'
                        >
                            <FormControlLabel control={<Checkbox />} label={task.maintask} />
                            <div>
                                <button className='pe-5'>
                                    <i className="fa-solid fa-eye text-cyan-700 text-xl"></i>
                                </button>
                                <button className='pe-5'>
                                    <i className="fa-solid fa-pen-to-square text-cyan-700 text-xl"></i>
                                </button>
                                <button className='pe-5'>
                                    <i className="fa-solid fa-trash text-cyan-700 text-xl"></i>
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={modalStyle} className="flex justify-center items-center flex-col">
                    <TextField
                        id="maintask"
                        label="Main Task"
                        variant="outlined"
                        value={maintask}
                        onChange={(e) => setMainTask(e.target.value)}
                    />
                    <Button
                        onClick={handleAddMainTask}
                        sx={{ mt: 2 }}
                        variant="contained"
                    >
                        Add
                    </Button>
                </Box>
            </Modal>
        </div>
    );
};

export default Home;
