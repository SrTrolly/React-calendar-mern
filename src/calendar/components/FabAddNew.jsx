import { addHours } from "date-fns";
import { useDispatch } from "react-redux"
import { useCalendarStore, useUiStore } from "../../hooks";



export const FabAddNew = () => {

    const dispatch = useDispatch();
    const { openDateModal } = useUiStore();
    const { setActiveElement } = useCalendarStore()

    const handleClickNew = () => {
        setActiveElement({
            title: "",
            notes: "",
            start: new Date(),
            end: addHours(new Date(), 2),
            bgColor: "#fafafa",
            user: {
                _id: "123",
                name: "Nicolas"
            }
        })
        openDateModal();
    }

    return (
        <button
            className="btn btn-primary fab"
            onClick={handleClickNew}
        >
            <i className="fas fa-plus"></i>
        </button>
    )
}
