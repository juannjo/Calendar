import React from 'react'

export const CalendarEvent = ({ event }) => {

    const {user, title} = event

    return (
        <>
            <span>{ title }</span>
            <span> - { user.name }</span>
        </>
  )
}
