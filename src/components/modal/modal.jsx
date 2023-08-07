import './modal.css'

const Modal = ({ title = 'Título da Modal', children }) => {
  return (
    <div className="modal">
      <h2>{title}</h2>
      <div className="breaklike" />
      {children}
    </div>
  )
}

export { Modal }
