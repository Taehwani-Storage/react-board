export function reducer(state, action) {
    switch (action.type) {
        case 'ON_LOAD':
            return ({
                list: action.list,
                startPage: action.startPage,
                endPage: action.endPage,
                maxPage: action.maxPage,
                currentPage: action.currentPge
            })

        default:
            return state
    }
}