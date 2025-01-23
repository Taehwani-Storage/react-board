export function UserReducer(state, action) {
    switch (action.type) {
        case 'ON_CHANGE':
            return {
                ...state,
                inputs: {
                    ...state.inputs, [action.name]: action.value
                }
            }

        default:
            return state
    }
}