import { addHours, differenceInSeconds } from "date-fns"
import { useMemo } from "react"
import { useState } from "react"

import Swal from "sweetalert2"
import 'sweetalert2/dist/sweetalert2.min.css'


export const useCalendar = () => {
    
    const [modalOpen, setModalOpen] = useState( true )

    const [formSubmitted, setFormSubmitted] = useState(null)

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

    const onSubmit = ( event ) => {
        event.preventDefault()
        setFormSubmitted(true)

        const difference = differenceInSeconds(formValues.end, formValues.start)

        if( isNaN(difference) || difference <= 0) {
            Swal.fire('Hora o fecha incorrecta', 'Revisar las fechas ingresadas', 'error')
            setFormSubmitted(false)
            return 
        }
    }

    const titleClass = useMemo(() => {
        if(!formSubmitted) return ''
        return (formValues.title.length > 0)
                ? ''
                : 'is-invalid'
    }, [ formValues.title, formSubmitted ])
  
    return ({
        modalOpen,  
        formSubmitted,
        formValues,
        onCloseModal,
        setChange,
        onDateChanged,
        onSubmit,
        titleClass
    })
}
