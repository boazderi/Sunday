// async updateCurrBoard({ commit, state }, { groupId, taskId, prop, toUpdate }) {
//     commit({ type: 'savePrevBoard' })
// 
//     var updatedBoard = boardService.updateBoard(state.currBoard, groupId, taskId, prop, toUpdate)
//     commit({ type: 'updateBoard', board: updatedBoard })
//     try {
//         updatedBoard = await boardService.save(state.currBoard)
//     } catch (err) {
//         commit({ type: 'undoBoard' })
//         console.log('boardStore: Error in updateBoard', err)
//         throw err
//     }
// }