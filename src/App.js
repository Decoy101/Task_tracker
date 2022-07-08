
import React from 'react'
import { useState, useEffect } from 'react'
import AddTask from './components/AddTask'
import Header from './components/Header'
import Tasks from './components/Tasks'



function App(){
    const [showAddTask,setShowAddTask] = useState(true)
    const [tasks, setTasks] = useState([])

    useEffect(()=>{
        const getTasks = async()=>{
            const tasksFromServer = await fetchTasks()
            setTasks(tasksFromServer)
        }

        getTasks()
    },[])

    const fetchTasks = async()=>{
        const res = await fetch('http:localhost:8000/tasks')
        const data = await res.json()
        
        console.log(data)
        return data
    }
    //Add Task

    const addTask = (task)=>{
        const id = Math.floor(Math.random() * 1000)+ 1
        const newTask = {id, ...task}
        setTasks([...tasks, newTask])
    }


    //Delete Task
    const deleteTask = (id)=>{
        setTasks(tasks.filter((task)=>task.id !== id))
    }

    const toggleReminder = (id)=>{
        setTasks(tasks.map((task)=> task.id === id ? { ...task, reminder:!task.reminder } : task))
    }

    return (
      <div className='container'>
        <Header onAdd={()=>setShowAddTask(!showAddTask)} showAdd={showAddTask}></Header>
        { showAddTask && <AddTask onAdd = {addTask} ></AddTask>}
       { tasks.length >0 ?
         <Tasks tasks= {tasks} onDelete={deleteTask} onToggle={toggleReminder}></Tasks> :
         'No tasks to be done!'
       }
      </div>
    )
}


export default App