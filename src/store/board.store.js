import { boardService } from '../services/board.service.local'

export function getActionRemoveBoard(boardId) {
    return {
        type: 'removeBoard',
        boardId
    }
}
export function getActionAddBoard(board) {
    return {
        type: 'addBoard',
        board
    }
}
export function getActionUpdateBoard(board) {
    return {
        type: 'updateBoard',
        board
    }
}

export function getActionAddBoardMsg(boardId) {
    return {
        type: 'addBoardMsg',
        boardId,
        txt: 'Stam txt'
    }
}

export const boardStore = {
    state: {
        boards: [],
        currBoard: null,
    },
    getters: {
        getBoards({ boards }) {
            return boards
        },
        getCurrBoard({ currBoard }) {
            return currBoard
        }
    },
    mutations: {
        setBoards(state, { boards }) {
            // todo- set a flexable for all boardById
            state.boards = boards
        },
        addBoard(state, { board }) {
            state.boards.push(board)
        },
        updateBoard(state, { board }) {
            const idx = state.boards.findIndex(c => c.id === board._id)
            state.boards.splice(idx, 1, board)
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
        changeDragged(state, { groupId, tasksToUpdate, groupsToUpdate }) {
            console.log(groupId, tasksToUpdate, groupsToUpdate);
            if (groupId) {
                const idx = state.currBoard.groups.findIndex(group => group.id === groupId)
                state.currBoard.groups[idx].tasks = tasksToUpdate
            } else {
                state.currBoard.groups = groupsToUpdate
            }
        },
        updateGroupIsCollapse(state, { groupId }) {
            const updatedGroup = state.currBoard.groups.find(g => g.id === groupId)
            updatedGroup.isCollapse = !updatedGroup.isCollapse
            const idx = state.currBoard.groups.findIndex(g => g.id === groupId)
            state.currBoard.groups.splice(idx, 1, updatedGroup)
        }
    },
    actions: {
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
        async updateDraggedItems({ commit, state }, { groupId, tasksToUpdate, groupsToUpdate }) {
            commit({ type: 'changeDragged', groupId, tasksToUpdate, groupsToUpdate })
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
            // Note-the err is string with loadBoards-action th
            catch (err) {
                await dispatch(err)
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
        async removeBoard(context, { boardId }) {
            try {
                await boardService.remove(boardId)
                context.commit(getActionRemoveBoard(boardId))
            } catch (err) {
                console.log('boardStore: Error in removeBoard', err)
                throw err
            }
        },
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