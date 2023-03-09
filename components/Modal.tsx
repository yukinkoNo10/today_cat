import ReactDOM from "react-dom"

const Modal = ({ children, closeModal, deleteModal }) => {
    console.log(children)
    return ReactDOM.createPortal(
        <div
            style={{
                position: 'fixed',
                top: '0',
                left: '0',
                width: '100%',
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: 'rgba(0,0,0,0.5)',
            }}
        >
            <div style={{ width: '70%', height: '70%', padding: '1em', backgroundColor: 'white' }}>
                <div>{children}</div>
                <div>
                    <button onClick={closeModal}>Close</button>
                    <button onClick={deleteModal} style={{ marginLeft: "10px" }}>Delete</button>
                </div>
            </div>
        </div>,
        document.getElementById('portal')
    )
}

export default Modal;