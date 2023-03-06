import { Navbar, CalendarEvent, CalendarModal, FabAddNew, FabDelete } from "../"
import { Calendar } from 'react-big-calendar'
import "react-big-calendar/lib/css/react-big-calendar.css";
import { localizer, getMessagesEs } from "../../helpers";
import { useState } from "react";
import { useCalendarStore, useUiStore } from "../../hooks";






export const CalendarPage = () => {


    const { openDateModal } = useUiStore()
    const [lastView, setlastView] = useState(localStorage.getItem("lastView") || "week");

    const { events, setActiveElement } = useCalendarStore();




    const eventStyleGetter = (event, start, end, isSelected) => {
        const style = {
            backgoundColor: "#347cf7",
            borderRadius: "0px",
            opacity: 0.8,
            color: "white"
        }

        return {
            style
        }
    }

    const onDoubleClick = (event) => {
        console.log({ doubleClick: event });
        openDateModal();
    }

    const onSelect = (event) => {
        setActiveElement(event)
    }

    const onViewChanged = (event) => {
        localStorage.setItem("lastView", event)
    }

    return (
        <>
            <Navbar />

            <Calendar
                culture="es"
                localizer={localizer}
                events={events}
                defaultView={lastView}
                startAccessor="start"
                endAccessor="end"
                style={{ height: "calc( 100vh - 80px)" }}
                messages={getMessagesEs()}
                eventPropGetter={eventStyleGetter}
                components={{
                    event: CalendarEvent
                }}
                onDoubleClickEvent={onDoubleClick}
                onSelectEvent={onSelect}
                onView={onViewChanged}
            />


            <CalendarModal />
            <FabAddNew />
            <FabDelete />



        </>
    )
}
