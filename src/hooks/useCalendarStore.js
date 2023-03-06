import { useDispatch, useSelector } from "react-redux"
import { onAddNewEvent, onDeleteEvent, onSetActiveEvent, onUpdateEvent } from "../store/";



export const useCalendarStore = () => {

    const { events, activeEvent } = useSelector(state => state.calendar);

    const dispatch = useDispatch();

    const setActiveElement = (calendarEvent) => {
        dispatch(onSetActiveEvent(calendarEvent));
    }

    const startSavingEvent = async (calendarEvent) => {
        //TODO llegar al backend

        //TODO bien 
        if (calendarEvent._id) {
            //actualizando
            dispatch(onUpdateEvent({ calendarEvent }));
        } else {
            //creando
            dispatch(onAddNewEvent({ ...calendarEvent, _id: new Date().getTime() }))
        }
    }

    const startDeletingEvent = () => {
        dispatch(onDeleteEvent())
    }

    return {
        //*Propiedades
        events,
        activeEvent,
        hasEventSelected: !!activeEvent,

        //*Metodos
        setActiveElement,
        startSavingEvent,
        startDeletingEvent
    }

}


