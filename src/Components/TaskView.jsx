import { Box, Modal } from '@mui/material';
import React from 'react'

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

const TaskView = ({ task }) => {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const getColorBasedOnPercentage = (percentage) => {
        if (percentage <= 25) {
            return "#ff4d4d";
        } else if (percentage <= 50) {
            return "#ffcc00";
        } else {
            return "#33cc33";
        }
    }

    return (
        <div>
            <button onClick={handleOpen} className='pe-5'>
                <i className="fa-solid fa-eye text-cyan-700 text-xl"></i>
            </button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <h1 className='text-2xl text-cyan-700 font-bold text-center mb-3'>{task.taskName}</h1>
                    <div className='flex justify-cente items-start flex-col gap-4'>
                        <p className='text-md font-semibold'>{task.taskDescription}</p>
                        <p><span className='font-bold'>Start Date: </span>{task.startDate}</p>
                        <p><span className='font-bold'>End Date: </span>{task.endDate}</p>
                        <p><span className='font-bold'>Status: </span>{task.taskStatus}</p>
                        <p className='font-bold'>Progress</p>
                        <div className="w-full flex flex-col items-start gap-1">
                            <div className="w-full bg-gray-300 rounded-full h-6 relative">
                                <div
                                    className="h-6 rounded-full"
                                    style={{
                                        width: `${task.progress}`,
                                        backgroundColor: getColorBasedOnPercentage(task.progress),
                                    }}
                                ></div>
                                {/* Display percentage inside the bar */}
                                <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-xs font-bold text-white">
                                    {task.progress}
                                </span>
                            </div>
                        </div>
                    </div>

                </Box>
            </Modal>

        </div>
    )
}

export default TaskView