import { boardService } from '../services/board.service.local'

export const boardStore = {
    state: {
        boards: [],
        currBoard: null,
        filterBy: {
            text: '',
            members: [],
            groupTitle: '',
            dynamicProps: [{
                    prop: 'priority',
                    values: []
                },
                {
                    prop: 'status',
                    values: []
                },
            ]
        }
    },
    getters: {
        getBoards({ boards }) {
            return boards
        },
        getCurrBoard({ filterBy, currBoard }) {
            return boardService.filterCurrBoard(currBoard, filterBy)
        },
        getCmpOrder({ currBoard }) {
            return currBoard.cmpOrder
        },
        getLabels({ currBoard }) {
            return currBoard.labels
        },
        getProgLineOrder({ currBoard }) {
            return currBoard.progLineOrder
        },
    },
    mutations: {
        setBoards(state, { boards }) {
            // todo- set a flexable for all boardById
            state.boards = boards
        },
        setFilterBy(state, { filterBy }){
            state.filterBy = filterBy
        },
        addBoard(state, { board }) {
            state.boards.push(board)
        },
        updateBoard(state, { board }) {
            const idx = state.boards.findIndex(c => c.id === board._id)
            state.boards.splice(idx, 1, board)
            // todo understand why its duplicate the boards in the workspace and in general
            // state.currBoard = state.boards[idx]
            state.currBoard = board
        },
        removeBoard(state, { boardId }) {
            state.boards = state.boards.filter(board => board._id !== boardId)
        },
        addBoardMsg(state, { boardId, msg }) {
            const board = state.boards.find(board => board._id === boardId)
            if (!board.msgs) board.msgs = []
            board.msgs.push(msg)
        },
        setCurrBoard(state, { boardId }) {
            const newBoard = state.boards.find(board => board._id === boardId)
            state.currBoard = newBoard
        },
        setCurrBoardBySocket(state, { board }) {
            state.currBoard = board
        },
        changeDragged(state, { groupId, tasksToUpdate, groupsToUpdate }) {
            // console.log(groupId, tasksToUpdate, groupsToUpdate);
            if (groupId) {
                const idx = state.currBoard.groups.findIndex(group => group.id === groupId)
                state.currBoard.groups[idx].tasks = tasksToUpdate
            } else {
                state.currBoard.groups = groupsToUpdate
            }
        },
        changeDraggedCols(state, { labels }) {

            var cmpOrder = []
            var progLineOrder = []
            labels.forEach(label => {
                switch (label) {
                    case 'Status':
                        cmpOrder.push('status')
                        progLineOrder.push('status-progress')
                        break;
                    case 'Person':
                        cmpOrder.push('members')
                        progLineOrder.push('div')
                        break;
                    case 'Priority':
                        cmpOrder.push('priority')
                        progLineOrder.push('priority-progress')
                        break;
                    case 'Date':
                        cmpOrder.push('date')
                        progLineOrder.push('div')
                        break;
                    case 'Text':
                        cmpOrder.push('textNote')
                        progLineOrder.push('div')
                        break;
                    case 'File':
                        cmpOrder.push('file')
                        progLineOrder.push('div')
                        break;
                    case 'Timeline':
                        cmpOrder.push('timeline')
                        progLineOrder.push('timeline-width')
                        break;
                }
            })

            state.currBoard.labels = labels
            state.currBoard.cmpOrder = cmpOrder
            state.currBoard.progLineOrder = progLineOrder
                // console.log(state.currBoard.labels, state.currBoard.cmpOrder);
        },
        updateGroupIsCollapse(state, { groupId }) {
            const updatedGroup = state.currBoard.groups.find(g => g.id === groupId)
            updatedGroup.isCollapse = !updatedGroup.isCollapse
            const idx = state.currBoard.groups.findIndex(g => g.id === groupId)
            state.currBoard.groups.splice(idx, 1, updatedGroup)
        }
    },
    actions: {
        async loadBoards(context) {
            try {
                const boards = await boardService.query()
                context.commit({ type: 'setBoards', boards })
                //NOTE: for first time login--- the else is when we get into that action in
                //  failure from data and that we dont wanna update the currBoard
                if (!context.state.currBoard) {
                    context.commit({
                        type: 'setCurrBoard',
                        boardId: context.state.boards[0]._id
                    })
                }

            } catch (err) {
                console.log('boardStore: Error in loadBoards', err)
                throw err
            }
        },
        async addBoard(context, { board }) {
            try {
                board = await boardService.save(board)
                context.commit(getActionAddBoard(board))
                return board
            } catch (err) {
                console.log('boardStore: Error in addBoard', err)
                throw err
            }
        },
        async updateCurrBoard({ commit, state }, { groupId, taskId, prop, toUpdate }) {
            try {
                const updatedBoard = await boardService.updateBoard(state.currBoard._id, groupId, taskId, prop, toUpdate)
                commit({ type: 'updateBoard', board: updatedBoard })
            } catch (err) {
                console.log('boardStore: Error in updateBoard', err)
                throw err
            }
        },
        async updateDraggedItems({ commit, state }, { groupId, tasksToUpdate, groupsToUpdate, labels }) {
            // console.log(groupId, tasksToUpdate, groupsToUpdate, labels);
            if (labels) commit({ type: 'changeDraggedCols', labels })
            else commit({ type: 'changeDragged', groupId, tasksToUpdate, groupsToUpdate })
            try {
                const updatedBoard = await boardService.save(state.currBoard)
            } catch (err) {
                console.log('boardStore: Error in updateBoard', err)
                throw err
            }
        },
        // NOTE- example for the all-around pattern with errors
        async addNewTask({ dispatch, commit, state }, { payload }) {
            try {
                payload.boardId = state.currBoard._id
                const updatedBoard = await boardService.addNewTask(payload)
                commit({ type: 'updateBoard', board: updatedBoard })
                    //todo usermsg about success
            }
            // Note-the err.message is string with loadBoards-action 
            catch (err) {
                await dispatch({ type: err.message })
                //todo usermsg about failure
            }
        },
        async removeTasks({ commit, state }, { payload }) {
            try {
                payload.boardId = state.currBoard._id
                const updatedBoard = await boardService.removeTasks(payload)
                commit({ type: 'updateBoard', board: updatedBoard })
            } catch (err) {
                console.log("boardStore: cannot remove tasks", err)
                throw err
            }
        },
        async setFilterBy({ commit, state }, { payload }){
            try {
                const currFilterBy = state.filterBy
                if(payload.filterBy.text){
                    currFilterBy.text = payload.filterBy.text
                    commit({type: 'setFilterBy', filterBy: currFilterBy})
                }
            } catch (err){

            }
        },
        async duplicateTasks({ commit, state }, { payload }) {
            try {
                payload.boardId = state.currBoard._id
                const updatedBoard = await boardService.duplicateTasks(payload)
                commit({ type: 'updateBoard', board: updatedBoard })

            } catch (err) {
                console.log("boardStore: cannot remove tasks", err)
                throw err
            }
        },
        // NOTE-new mechanism verify nothing is broken

        async addBoardMsg(context, { boardId, txt }) {
            try {
                const msg = await boardService.addBoardMsg(boardId, txt)
                context.commit({ type: 'addBoardMsg', boardId, msg })
            } catch (err) {
                console.log('boardStore: Error in addBoardMsg', err)
                throw err
            }
        },
        async duplicateGroup({ commit, state }, { payload }) {
            payload.boardId = state.currBoard._id
            try {
                const updatedBoard = await boardService.duplicateGroup(payload)
                commit({ type: 'updateBoard', board: updatedBoard })
            } catch (err) {
                console.log('boardStore: Error in duplicate group', err)
            }
        },
        async deleteGroup({ commit, state }, { payload }) {
            payload.boardId = state.currBoard._id
            try {
                const updatedBoard = await boardService.deleteGroup(payload)
                commit({ type: 'updateBoard', board: updatedBoard })
            } catch (err) {
                console.log('boardStore: Error in duplicate group', err)

            }
        },
        async collapseGroup({ commit, state }, { payload }) {
            //todo-for now Optimistic approach need to add prvBoard in case of failure
            commit({ type: 'updateGroupIsCollapse', groupId: payload.groupId })

            try {
                await boardService.save(state.currBoard)
            } catch (err) {
                console.log('boardStore: Error in collapsing group', err)
            }
        },
        async addGroup({ commit, state }) {
            const boardId = state.currBoard._id
            try {
                const updatedBoard = await boardService.addGroup(boardId)
                commit({ type: 'updateBoard', board: updatedBoard })
            } catch (err) {
                console.log('boardStore: Error with create a new group', err)
            }
        },
    },

}