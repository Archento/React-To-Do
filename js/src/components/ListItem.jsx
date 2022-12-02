import { useToDoContext } from './ToDo'

import React, { useState } from 'react'
import { Button, Col, Container, Form, Modal, Row } from 'react-bootstrap'
import { colors } from '../data/colors'

const ListItem = ({ id, text, checked, color }) => {
  const listDispatch = useToDoContext()

  const [showModal, setShowModal] = useState(false)
  const [temporaryText, setTemporaryText] = useState(text)
  const [temporaryColor, setTemporaryColor] = useState(color)

  const handleClose = () => {
    setShowModal(false)
    setTemporaryText(text)
    setTemporaryColor(color)
  }
  const handleUpdate = () => {
    listDispatch({ type: 'edit', id, text: temporaryText, color: temporaryColor })
    setShowModal(false)
  }

  return (
    <button
      type='button' data-strike className={`list-group-item list-group-item-action d-flex justify-content-between align-items-center list-group-item-${color}`}
      onClick={({ target }) => {
        if (target.dataset.strike) listDispatch({ type: 'check', id })
      }}
    >
      <span data-strike className={checked ? 'text-decoration-line-through text-black-50' : ''}>
        {text}
      </span>
      <span>
        <i className='bi bi-pencil' onClick={() => { setShowModal(true) }} />
        <i className='bi bi-x-circle ms-1' onClick={() => { listDispatch({ type: 'remove', id }) }} />
      </span>
      <Modal
        show={showModal} onHide={handleClose} backdrop='static' keyboard={false}
      >
        <Modal.Header>
          <Modal.Title>Edit entry</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container fluid>
            <Row className='mb-3'>
              <Col lg='3' className='align-self-center'>Edit Text</Col>
              <Col>
                <Form.Control type='text' defaultValue={temporaryText} onChange={({ currentTarget }) => { setTemporaryText(currentTarget.value) }} />
              </Col>
            </Row>
            <Row>
              <Col lg='3' className='align-self-center'>Choose Color</Col>
              <Col>
                <>
                  {colors.map(variant => (
                    <React.Fragment key={variant}>
                      <input
                        type='radio'
                        className='btn-check'
                        name='colors'
                        id={variant}
                        onClick={() => { setTemporaryColor(variant) }}
                      />
                      <label className={`btn btn-circle m-1 btn-${variant}`} htmlFor={variant} />
                    </React.Fragment>
                  ))}
                </>
              </Col>
            </Row>
          </Container>
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={handleClose}>Cancel</Button>
          <Button variant='primary' onClick={handleUpdate}>Confirm</Button>
        </Modal.Footer>
      </Modal>
    </button>
  )
}

export default ListItem
