
// import { storageService } from './async-storage.service.js'
import { httpService } from './http.service.js'
import { utilService } from './util.service.js'
import { userService } from './user.service.js'


const STORAGE_KEY = 'board'

export const boardService = {
    query,
    getById,
    save,
    remove,
    getEmptyBoard,
    addBoardMsg
}
window.cs = boardService


async function query(filterBy = { txt: ''}) {
    return httpService.get(STORAGE_KEY, filterBy)

    // var boards = await storageService.query(STORAGE_KEY)
    // if (filterBy.txt) {
    //     const regex = new RegExp(filterBy.txt, 'i')
    //     boards = boards.filter(board => regex.test(board.vendor) || regex.test(board.description))
    // }
    // if (filterBy.price) {
    //     boards = boards.filter(board => board.price <= filterBy.price)
    // }
    // return boards

}
function getById(boardId) {
    // return storageService.get(STORAGE_KEY, boardId)
    return httpService.get(`board/${boardId}`)
}

async function remove(boardId) {
    // await storageService.remove(STORAGE_KEY, boardId)
    return httpService.delete(`board/${boardId}`)
}
async function save(board) {
    var savedBoard
    if (board._id) {
        // savedBoard = await storageService.put(STORAGE_KEY, board)
        savedBoard = await httpService.put(`board/${board._id}`, board)

    } else {
        // Later, owner is set by the backend
        board.owner = userService.getLoggedinUser()
        // savedBoard = await storageService.post(STORAGE_KEY, board)
        savedBoard = await httpService.post('board', board)
    }
    return savedBoard
}

async function addBoardMsg(boardId, txt) {
    const savedMsg = await httpService.post(`board/${boardId}/msg`, {txt})
    return savedMsg
}


function getEmptyBoard() {
    return {
        boardName: ''
    }
}





