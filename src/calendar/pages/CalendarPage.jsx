import { Calendar } from 'react-big-calendar' 
import { addHours } from 'date-fns'
import 'react-big-calendar/lib/css/react-big-calendar.css'

import { Navbar, CalendarEvent, CalendarModal } from '../'
import { localizer, getMessagesEs } from '../../helpers'
import { useState } from 'react'


const event = [{
  title: 'Cumpleaños del jefe',
  notes: 'Hay que comprar el pastel',
  start: new Date(),
  end: addHours(new Date(), 2),
  bgColor: '#fafafa',
  user: {
    _id: 123,
    name: 'Juan'
  }
}]

const onDoubleClick = (event) => {
  console.log({ onDouble: event })
}

const onSelect = (event) => {
  console.log(event)
}

const onViewChange = (event) => {
  localStorage.setItem('lastView', event)
}


export const CalendarPage = () => {
  
  const [lastView, setLastView] = useState(localStorage.getItem('lastView') || 'week')

  const eventStyleGetter = ( event, start, end, isSelected ) => {
    const style = {
      backgroundColor: '#347cf7',
      borderRadius: '0px',
      opacity: '0.8',
      color: 'white'
    }

    return {
      style
    }
  }

  return (
    <>
      <Navbar />

      <div>
        <Calendar
          culture='es'
          events={event}
          localizer={localizer}
          defaultView={ lastView }
          startAccessor="start"
          endAccessor="end"
          style={{ height: 'calc(100vh - 80px)' }}
          messages={getMessagesEs()}
          eventPropGetter={ eventStyleGetter }
          components={{
            event: CalendarEvent
          }}
          onDoubleClickEvent={ onDoubleClick }
          onView={ onViewChange }
          onSelectEvent={ onSelect }
        />
      </div>

      <CalendarModal />
    </>
  )
}
