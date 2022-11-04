import { useState } from "react"

import { addHours } from "date-fns"

import Modal from "react-modal"
import DatePicker, { registerLocale } from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import { es } from "date-fns/locale"

registerLocale('es', es)

const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    }
  }

Modal.setAppElement('#root')


export const CalendarModal = () => {

    const [modalOpen, setModalOpen] = useState( true )

    const [formValues, setformValues] = useState({
        title: '',
        notes: '',
        start: new Date(),
        end: addHours( new Date(), 2 ),
    })

    const onCloseModal = () => {
        setModalOpen(false)
    }

    const setChange = ({ target }) => {
        console.log( target.value )
        setformValues({
            ...formValues,
            [target.name]: target.value
        })
    }

    const onDateChanged = (event, changing) => {
        setformValues({
            ...formValues,
            [changing]: event
        })
    }

  return (
    <Modal
        isOpen={modalOpen}
        onRequestClose={onCloseModal}
        style={customStyles}
        className='modal'
        overlayClassName='modal-fondo'
        closeTimeoutMS={ 200 }
    >
        <h1> Nuevo evento </h1>
        <hr />
        <form className="container">

            <div className="form-group mb-2">
                <label>Fecha y hora inicio</label>
                <DatePicker
                    selected={formValues.start}
                    className='form-control'
                    onChange={( event ) => onDateChanged( event, 'start')}
                    dateFormat='Pp'
                    showTimeSelect  
                    locale='es'
                    timeCaption='Hora'
                />
            </div>

            <div className="form-group mb-2">
                <label>Fecha y hora fin</label>
                <DatePicker
                    selected={formValues.end}
                    className='form-control'
                    onChange={( event ) => onDateChanged( event, 'end')}
                    dateFormat='Pp'
                    minDate={formValues.start}
                    showTimeSelect  
                    locale='es'
                    timeCaption='Hora'
                />
            </div>

            <hr />
            <div className="form-group mb-2">
                <label>Titulo y notas</label>
                <input 
                    type="text" 
                    className="form-control"
                    placeholder="Título del evento"
                    name="title"
                    autoComplete="off"
                    value={ formValues.title } 
                    onChange={ setChange }
                />
                <small id="emailHelp" className="form-text text-muted">Una descripción corta</small>
            </div>

            <div className="form-group mb-2">
                <textarea 
                    type="text" 
                    className="form-control"
                    placeholder="Notas"
                    rows="5"
                    name="notes"
                    value={ formValues.notes }
                    onChange={ setChange }
                ></textarea>
                <small id="emailHelp" className="form-text text-muted">Información adicional</small>
            </div>

            <button
                type="submit"
                className="btn btn-outline-primary btn-block"
            >
                <i className="far fa-save"></i>
                <span> Guardar</span>
            </button>

        </form>
    </Modal>
  )
}
