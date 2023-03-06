import { useDispatch, useSelector } from "react-redux"
import { onAddNewEvent, onDeleteEvent, onLoadEvents, onSetActiveEvent, onUpdateEvent } from "../store/";
import { calendarApi } from "../api"
import { convertEventsToDateEvents } from "../helpers";
import Swal from "sweetalert2";



export const useCalendarStore = () => {

    const { events, activeEvent } = useSelector(state => state.calendar);
    const { user } = useSelector(state => state.auth);

    const dispatch = useDispatch();

    const setActiveElement = (calendarEvent) => {
        dispatch(onSetActiveEvent(calendarEvent));
    }

    const startSavingEvent = async (calendarEvent) => {

        try {
            if (calendarEvent.id) {
                //actualizando
                await calendarApi.put(`/event/${calendarEvent.id}`, calendarEvent);
                dispatch(onUpdateEvent({ ...calendarEvent, user }));
                return
            } else {
                //creando
                const { data } = await calendarApi.post("/event", calendarEvent);

                dispatch(onAddNewEvent({ ...calendarEvent, id: data.evento.id, user }))
            }

        } catch (error) {
            console.log(error);
            Swal.fire("Error al guardar", error.response.data.msg, "error");
        }

    }

    const startDeletingEvent = async () => {

        try {
            await calendarApi.delete(`/event/${activeEvent.id}`)
            dispatch(onDeleteEvent())
        } catch (error) {
            console.log(error);
            Swal.fire("Error al eliminar", error.response.data.msg, "error");
        }
    }

    const startLoadingEvents = async () => {
        try {
            const { data } = await calendarApi.get("/event");
            const events = convertEventsToDateEvents(data.eventos);
            dispatch(onLoadEvents(events));
        } catch (error) {
            console.log("Error cargando eventos")
        }
    }

    return {
        //*Propiedades
        events,
        activeEvent,
        hasEventSelected: !!activeEvent,

        //*Metodos
        setActiveElement,
        startSavingEvent,
        startDeletingEvent,
        startLoadingEvents
    }

}


