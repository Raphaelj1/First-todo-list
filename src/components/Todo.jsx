import React, { useEffect, useReducer, useRef } from 'react';
import TodoItem from './TodoItem';

function Todo() {
    // const [taskInput, setTaskInput] = useState('');
    const taskInput = useRef('');

    function reducer(state, action) { // { type: 'setField', field: 'email', value: 'unknownboss123' }
        switch (action.type) {
            case 'addTask': {
                return [{ text: action.text, completed: false }, ...state];
            };
            case 'removeTask': {
                const updatedTasks = state.filter((_, i) => i !== action.id);
                return updatedTasks
            };
            case 'toggleStatus': {
                const updatedTasks = state.map((task, i) => i === action.id ? { ...task, completed: !task.completed } : task);
                const pendingTasks = updatedTasks.filter((task, i) => !task.completed);
                const completedTasks = updatedTasks.filter((task, i) => task.completed);
                return [...pendingTasks, ...completedTasks]
            };
            case 'clearCompleted': {
                const updatedTasks = state.filter((task, i) => !task.completed);
                return updatedTasks
            };
            case 'clearAll': {
                return []
            };
            default:
                return state;
        }
    }


    const [tasks, setTasks] = useReducer(reducer, [], (initialState) => {
        const savedTasks = localStorage.getItem('tasks');
        return savedTasks ? JSON.parse(savedTasks) : initialState;
    });

    // save to localStorage everytime tasks get updated
    useEffect(() => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }, [tasks]);

    // actions
    const addTask = (details) => {
        if (taskInput.current.value.trim() !== '') {
            setTasks({ type: 'addTask', text: details })
            // setTaskInput('');
            taskInput.current.value = '';
            taskInput.current.focus();
        }
    };


    const removeTask = (id) => {
        setTasks({ type: 'removeTask', id })
    };

    const toggleTaskCompletion = (id) => {
        setTasks({ type: 'toggleStatus', id })
    };

    const clearCompleted = () => {
        setTasks({ type: 'clearCompleted' })
    };
    const clearAllTasks = () => {
        setTasks({ type: 'clearAll' })
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        addTask(taskInput.current.value)
    }

    return (
        <div className='bg-white place-self-center w-4/5 max-w-md flex flex-col p-6 min-h-[550px] rounded-xl'>

            <div className='flex items-center gap-2'>
                <h1 className='text-xl md:text-2xl font-semibold'>To-Do List</h1>
            </div>

            <div>
                <form action="" onSubmit={handleSubmit} className='flex justify-between items-center overflow-hidden my-4 md:my-7 bg-gray-200 rounded-full'>
                    <input
                        type="text"
                        ref={taskInput}
                        // value={taskInput}
                        // onChange={(e) => setTaskInput(e.target.value)}
                        // onChange={() => taskInput.current.value = value}
                        placeholder="Add your task..."
                        className='bg-transparent flex flex-1 h-12 border-0 outline-none pl-6 pr-2 w-full placeholder:text-gray-400'
                    />
                    <button type='submit' className='border-none outline-none rounded-full bg-blue-600 hover:bg-blue-800 text-white text-nowrap h-12 px-6 text-md sm:w-32'
                    >Add +</button>
                </form>
                {!!tasks.length && <button className='border-none outline-none text-gray-500 hover:text-gray-800 text-sm mb-2 ml-2 underline underline-offset-2' onClick={clearCompleted}>Clear completed</button>}
                {!!tasks.length && <button className='border-none outline-none text-gray-500 hover:text-gray-800 text-sm mb-2 ml-2 underline underline-offset-2' onClick={clearAllTasks}>Clear All</button>}

            </div>

            <div className='max-w-full overflow-hidden'>
            </div>
            {tasks.map((task, index) => (
                <TodoItem id={index} task={task} toggleTaskCompletion={toggleTaskCompletion} removeTask={removeTask} key={index} />
            ))}
        </div>
    );
}

export default Todo