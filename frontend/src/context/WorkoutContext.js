import { createContext, useReducer } from "react";

export const WorkoutsContext = createContext()

export const workoutsReducer = (state, action) => {
    switch(action.type){
        case 'SET_WORKOUTS':
            return {
                workouts: action.payload
            }
        case 'CREATE_WORKOUT':
            return {
                workouts: [action.payload, ...state.workouts]
            }
        case 'DELETE_WORKOUT':
            return {
                //keep the workouts that do not match the id of the workout to be deleted
                workouts: state.workouts.filter((w) => w._id !== action.payload._id)
            }
        default:
            return state
    }
}

export const WorkoutContextProvider = ({ children }) => {

    const [state, dispatch] = useReducer(workoutsReducer, {
        workouts: null
    })

    return (
        <WorkoutsContext.Provider value={{...state, dispatch}}>
            { children }
        </WorkoutsContext.Provider>
    )
}

//wraps the components that need to access the context
//children represented the components wrapped by Provider
