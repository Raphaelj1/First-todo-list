import React from 'react'
import { XMarkIcon } from "@heroicons/react/24/outline";

function TodoItems({ task, toggleTaskCompletion, removeTask, id }) {
    return (
        <div className='flex items-start my-2 gap-2'>
            <div className='flex flex-1 overflow-hidden overflow-ellipsis' onClick={() => toggleTaskCompletion(id)}>
                <input type="checkbox" className='hover:cursor-pointer self-start mt-1.5' checked={task.completed}/>
                <span className='ml-2 flex-1 text-sm md:text-base break-words' style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>{task.text}</span>
            </div>
            <button onClick={() => removeTask(id)}><XMarkIcon className="bg-blue-200 h-6 w-6 text-gray-500" /></button>
        </div>
    )
}

export default TodoItems