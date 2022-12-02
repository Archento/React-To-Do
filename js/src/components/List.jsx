import { useState, Fragment } from 'react'
import { Button, Col, Row, OverlayTrigger, Popover } from 'react-bootstrap'
import { colors } from '../data/colors'
import { useSort } from '../hooks/useSort'
import ListItem from './ListItem'
import { useToDoContext } from './ToDo'

const List = ({ items }) => {
  const listDispatch = useToDoContext()

  const [todo, setTodo] = useState('') // todo entry
  const sortings = ['bi-arrow-down-up', 'bi-arrow-down', 'bi-arrow-up']
  const { count, changeSort } = useSort(0, sortings.length - 1) // sorting
  const [filter, setFilter] = useState('') // text filter
  const [colorFilter, setColorFilter] = useState({ // color filter
    light: true,
    primary: true,
    success: true,
    danger: true,
    warning: true,
    info: true
  })

  const addEntry = () => {
    if (todo === '') return
    listDispatch({
      type: 'add',
      id: Date.now(),
      text: todo,
      checked: false,
      color: 'light'
    })
    setTodo('')
  }

  /**
   * Generate a filtered and sorted list of entries
   * @param {Array} array array of React objects
   * @returns list
   */
  const modifyList = originalArray => {
    const textFilteredArray = filter // filter by text
      ? originalArray.filter(({ text }) => text.toLowerCase().includes(filter.toLowerCase()))
      : originalArray
    const array = textFilteredArray.filter(({ color }) => colorFilter[color]) // filter by color
    if (sortings[count] === 'bi-arrow-down-up') return array // return unsorted list
    return array.sort((a, b) => {
      const nameA = a.text.toLowerCase()
      const nameB = b.text.toLowerCase()
      switch (sortings[count]) {
        case 'bi-arrow-up':
          return nameA < nameB ? 1 : -1
        case 'bi-arrow-down':
          return nameA < nameB ? -1 : 1
      }
      return 0
    })
  }

  const handleColor = evt => {
    setColorFilter(color => {
      const newColor = { ...color }
      newColor[evt.target.id] = !color[evt.target.id]
      return newColor
    })
  }

  return (
    <div className='w-75 mx-auto'>
      <div className='mb-3 ms-2 me-2'>
        <Row>
          <Col>
            <a className={`bi ${sortings[count]}`} onClick={changeSort} />
          </Col>
          <Col>
            <div className='d-flex'>
              <OverlayTrigger
                trigger='focus'
                placement='auto'
                overlay={
                  <Popover>
                    <Popover.Header as='h3'>Filter by color</Popover.Header>
                    <Popover.Body>
                      <>
                        {colors.map(variant => (
                          <Fragment key={variant}>
                            <input
                              type='checkbox'
                              className='btn-check'
                              name='colors'
                              id={variant}
                              onClick={handleColor}
                              defaultChecked={colorFilter[variant]}
                            />
                            <label className={`btn btn-circle m-1 btn-${variant} ${colorFilter[variant] ? 'bi bi-check' : ''}`} htmlFor={variant} />
                          </Fragment>
                        ))}
                      </>
                    </Popover.Body>
                  </Popover>
              }
              >
                <button className='btn btn-circle btn-rainbow align-self-center' />
              </OverlayTrigger>
              <div className='input-group input-group-sm ms-2'>
                <input
                  type='text'
                  className='form-control form-control-sm'
                  placeholder='search'
                  onChange={({ currentTarget }) => { setFilter(currentTarget.value) }}
                />
                <span className='input-group-text bi bi-search' />
              </div>
            </div>
          </Col>
        </Row>
      </div>
      {
      items.length === 0
        ? (<></>)
        : (
          <div className='list-group'>
            {modifyList(items).map(item => <ListItem key={item.id} {...item} />)}
          </div>
          )
      }
      <div className='w-75 mx-auto input-group mt-3 pb-4 sticky-bottom'>
        <Button
          variant='secondary'
          onClick={addEntry}
          className='bi bi-plus-circle'
        />
        <input
          type='text'
          className='form-control bg-secondary bg-gradient bg-opacity-50'
          placeholder='todo'
          onKeyUp={({ code }) => { if (code === 'Enter') addEntry() }}
          onChange={({ currentTarget }) => { setTodo(currentTarget.value) }}
          value={todo}
          maxLength={42}
        />
      </div>
    </div>
  )
}

export default List
