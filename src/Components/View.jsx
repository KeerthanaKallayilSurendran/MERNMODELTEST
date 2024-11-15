import React from 'react';
import { FormControlLabel, Checkbox } from '@mui/material';
import Edit from './Edit'
import TaskView from './TaskView';
import { deleteTaskAPI } from '../Service/allApi';

const View = ({ tasks, fetchAllTasks }) => {
    const deleteTask = async (id) => {
        const token = sessionStorage.getItem("token")
        if (token) {
            const reqHeader = {
                "Authorization": `Bearer ${token}`
            }
            try {
                await deleteTaskAPI(id, reqHeader)
                fetchAllTasks()
            } catch (error) {
                console.log(error);

            }
        }
    }
    return (
        <div className='w-full flex flex-col justify-center items-center'>
            {tasks?.length > 0 ?
                tasks.map((task) => (
                    <div
                        key={task._id}
                        className='w-3/5 border rounded-md px-10 py-2 shadow-md h-20 flex justify-between items-center mb-3'
                    >
                        <FormControlLabel control={<Checkbox />} label={task.taskName} />
                        <div className='flex'>
                            <div className='pe-5'><TaskView task={task} /></div>
                            <div className='pe-5'><Edit task={task} /></div>
                            <button onClick={() => deleteTask(task?._id)} className='pe-5'>
                                <i className="fa-solid fa-trash text-cyan-700 text-xl"></i>
                            </button>
                        </div>
                    </div>
                ))
                :
                <div className='text-xl font-bold text-center text-cyan-700'>No Tasks Added yet!!!</div>
            }
        </div>
    );
};

export default View;
