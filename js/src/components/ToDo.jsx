/* global localStorage */
import { createContext, useContext, useEffect, useReducer } from 'react'

import Footer from './Footer'
import Header from './Header'
import List from './List'

const ToDoContext = createContext(null)

export const useToDoContext = () => { // custom hook
  return useContext(ToDoContext)
}

const listReducer = (list, message) => {
  switch (message.type) {
    case 'add':
      return [...list, {
        id: message.id,
        text: message.text,
        checked: message.checked,
        color: message.color
      }]

    case 'check':
      return list.map(entry => {
        if (entry.id === message.id) entry.checked = !entry.checked
        return entry
      })

    case 'edit':
      return list.map(entry => {
        if (entry.id === message.id) {
          entry.text = message.text
          entry.color = message.color
        }
        return entry
      })

    case 'remove':
      return list.filter(entry => entry.id !== message.id)
  }
}

const getInitialList = () => {
  const currentList = JSON.parse(localStorage.getItem('list'))
  return Array.isArray(currentList) ? currentList : []
}

const ToDo = () => {
  const [list, listDispatch] = useReducer(
    listReducer, null, getInitialList
  )

  useEffect(
    () => localStorage.setItem('list', JSON.stringify(list)),
    [list] // write db entry if list has changed
  )

  return (
    <div className='d-flex flex-column min-vh-100'>
      <Header />
      <ToDoContext.Provider value={listDispatch}>
        <List items={list} />
      </ToDoContext.Provider>
      <Footer />
    </div>
  )
}

export default ToDo
