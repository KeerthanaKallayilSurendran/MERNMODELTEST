import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import View from '../Components/View';
import Add from '../Components/Add';
import { userTaskAPI } from '../Service/allApi';


const Home = () => {
    const [allTasks, setAllTasks] = useState([]);
    const [openAddModal, setOpenAddModal] = useState(false);
    const navigate = useNavigate();

    const fetchAllTasks = async () => {
        const token = sessionStorage.getItem('token')
        if (token) {
            const reqHeader = {
                "Authorization": `Bearer ${token}`
            }
            try {
                const result = await userTaskAPI(reqHeader);
                if (result.status == 200) {
                    setAllTasks(result.data)
                }
            } catch (error) {
                console.log(error);

            }
        }
    };

    const handleOpenAdd = () => {
        const token = sessionStorage.getItem("token");
        if (token) {
            setOpenAddModal(true);
        } else {
            alert("You are not logged in! Please log in to access this feature.");
            navigate('/login');
        }
    };

    const handleCloseAdd = () => setOpenAddModal(false);

    const handleTaskAdded = () => {
        fetchAllTasks();
    };

    useEffect(() => {
        fetchAllTasks();
    }, []);

    return (
        <div>
            <div className='min-h-screen'>
                <div className='flex justify-center items-center'>
                    <h1 className='text-2xl p-5'>Add Task</h1>
                    <button
                        className='h-11 w-11 rounded-full flex justify-center items-center bg-cyan-700'
                        onClick={handleOpenAdd}
                    >
                        +
                    </button>
                </div>
                <View tasks={allTasks} fetchAllTasks={fetchAllTasks} />
            </div>

            <Add
                open={openAddModal}
                onClose={handleCloseAdd}
                onTaskAdded={handleTaskAdded}
            />
        </div>
    );
};

export default Home;
