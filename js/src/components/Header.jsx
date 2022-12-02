const Header = () => {
  return (
    <div className='container'>
      <header className='d-flex flex-wrap justify-content-center py-3 mb-4 border-bottom'>
        <span
          className='d-flex align-items-center mb-3 mb-md-0 me-md-auto text-dark text-decoration-none'
        >
          <span className='bi bi-list-check fs-4'>&nbsp;ReacTo-Do List</span>
        </span>
        {/* see outlook for more info */}

        {/* <ul className='nav nav-pills ms-3'>
          <li className='nav-item'>
            <div className='input-group'>
              <select className='form-select'>
                <option value={1} defaultValue>default list</option>
                <option value={2}>list 2</option>
                <option value={3}>list 3</option>
              </select>
              <button
                className='btn btn-outline-secondary' type='button'
                onClick={() => { console.log('bla') }}
              >
                <i className='bi bi-file-plus' />
              </button>
            </div>
          </li>
        </ul> */}
      </header>
    </div>
  )
}

export default Header
