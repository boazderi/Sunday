import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'
import { userService } from './user.service.js'

const STORAGE_KEY = 'board'

export const boardService = {
    query,
    getById,
    save,
    remove,
    getEmptyBoard,
    addBoardMsg,
    updateBoard,
    addNewTask
}
window.cs = boardService

// todo: this function need to be edit later

async function query(filterBy = { txt: '' }) {
    var boards = await storageService.query(STORAGE_KEY)
    if (filterBy.txt) {
        const regex = new RegExp(filterBy.txt, 'i')
        boards = boards.filter(board => regex.test(board.boardName) || regex.test(board.description))
    }
    return boards
}

function getById(boardId) {
    return storageService.get(STORAGE_KEY, boardId)
}

async function remove(boardId) {
    await storageService.remove(STORAGE_KEY, boardId)
}

async function save(board) {
    var savedBoard
    if (board._id) {
        savedBoard = await storageService.put(STORAGE_KEY, board)
    } else {
        // Later, owner is set by the backend
        board.owner = userService.getLoggedinUser()
        savedBoard = await storageService.post(STORAGE_KEY, board)
    }
    return savedBoard
}

async function addBoardMsg(boardId, txt) {
    // Later, this is all done by the backend
    const board = await getById(boardId)
    if (!board.msgs) board.msgs = []

    const msg = {
        id: utilService.makeId(),
        by: userService.getLoggedinUser(),
        txt
    }
    board.msgs.push(msg)
    await storageService.put(STORAGE_KEY, board)

    return msg
}

async function updateBoard(boardId, groupId, taskId, prop, toUpdate) {
    var currBoard = await getById(boardId)
    if (taskId) {
        const groupIdx = currBoard.groups.findIndex(group => group.id === groupId)
        const taskIdx = currBoard.groups[groupIdx].tasks.findIndex(task => task.id === taskId)
        currBoard.groups[groupIdx].tasks[taskIdx][prop] = toUpdate
    } else if (groupId) {
        const groupIdx = currBoard.groups.findIndex(group => group.id === groupId)
        currBoard.groups[groupIdx][prop] = toUpdate
    } else {
        currBoard[prop] = toUpdate
    }

    save(currBoard)
    return currBoard
}
async function addNewTask({ boardId, groupId, taskTitle }) {
    var currBoard = await getById(boardId)
    const groupIdx = currBoard.groups.findIndex(g => g.id === groupId)
    const newTask = _getEmptyTask(taskTitle)
    currBoard.groups[groupIdx].tasks.push(newTask)
    save(currBoard)
    return currBoard

}

function _getEmptyTask(taskTitle) {
    return {
        id: utilService.makeId(),
        taskTitle,
        status: '',
        members: [],
    }
}


// todo update this function later
function getEmptyBoard() {
    return {
        boardName: '',
    }
}


// TEST DATA

// ;
// (async() => {
//     await storageService.post(STORAGE_KEY, {
//         "_id": "b102",
//         "title": "HR SALES",
//         "description": "This board will be used for collaboration management on the Funday app project",
//         "createdAt": 1589983468418,
//         "createdBy": {
//             "id": "u101",
//             "fullname": "Tal Liber",
//             "imgUrl": "http://some-img"
//         },
//         "members": [{
//                 "id": "u101",
//                 "fullname": "Tal Liber",
//                 "imgUrl": "http://some-img",
//                 "color": "#8338ec"
//             },
//             {
//                 "id": "u102",
//                 "fullname": "Arnon Arditi",
//                 "imgUrl": "",
//                 "color": "#8338ec"
//             },
//             {
//                 "id": "u103",
//                 "fullname": "Boaz Deri",
//                 "imgUrl": "https://randomuser.me/api/portraits/men/27.jpg",
//                 "color": "#3a86ff"
//             },
//             {
//                 "id": "u104",
//                 "fullname": "Tal Amit",
//                 "imgUrl": "https://randomuser.me/api/portraits/men/27.jpg",
//                 "color": "#ff006e"
//             }
//         ],
//         "activities": [{
//             "id": "a101",
//             "txt": "Changed Color",
//             "createdAt": 154514,
//             "byMember": {
//                 "id": "u101",
//                 "fullname": "Tal Liber",
//                 "imgUrl": "http://some-img"
//             },
//             "task": {
//                 "id": "c101",
//                 "title": "Replace Logo"
//             }
//         }],
//         "groups": [{
//                 "id": "gy5LnM",
//                 "title": "Frontend",
//                 "tasks": [{
//                         "id": "t2yn4E",
//                         "taskTitle": "Complete UI for demo1",
//                         "status": "IN WORK",
//                         "members": [{
//                                 "id": "u101",
//                                 "fullname": "Tal Liber",
//                                 "imgUrl": "https://www.google.com",
//                                 "color": "#8338ec"
//                             },
//                             {
//                                 "id": "u102",
//                                 "fullname": "Arnon Arditi",
//                                 "imgUrl": "https://www.google.com",
//                                 "color": "#3a86ff"
//                             }
//                         ],
//                         "date": "2022-03-28T21:00:00.000Z",
//                         "priority": "HIGH",
//                     },
//                     {
//                         "id": "t2yvg",
//                         "taskTitle": "Learn CSS",
//                         "status": "STUCK",
//                         "members": [{
//                                 "id": "u101",
//                                 "fullname": "Tal Liber",
//                                 "imgUrl": "https://www.google.com",
//                                 "color": "#8338ec"
//                             },
//                             {
//                                 "id": "u102",
//                                 "fullname": "Arnon Arditi",
//                                 "imgUrl": "https://www.google.com",
//                                 "color": "#3a86ff"
//                             }
//                         ],
//                         "date": "2022-03-28T21:00:00.000Z",
//                         "priority": "LOW",
//                         "comments": [{
//                                 "creator": "Arnon Arditi",
//                                 "content": "can some one help me"
//                             },
//                             {
//                                 "creator": "Tal Amit",
//                                 "content": "fix problem with bug"
//                             },
//                             {
//                                 "creator": "Boaz Deri",
//                                 "content": "i can help"
//                             },
//                             {
//                                 "creator": "Tal Liber",
//                                 "content": "made that dnd work"
//                             }
//                         ]
//                     }
//                 ],
//             },
//             {
//                 "id": "tyCQHY",
//                 "title": "Routes & pages",
//                 "tasks": [{
//                     "id": "t2eevg",
//                     "taskTitle": "finis grid layout",
//                     "status": "Done",
//                     "members": [{
//                             "id": "u102",
//                             "fullname": "Arnon Arditi",
//                             "imgUrl": "https://www.google.com",
//                             "color": "#8338ec"
//                         },
//                         {
//                             "id": "u101",
//                             "fullname": "Tal Liber",
//                             "imgUrl": "https://www.google.com",
//                             "color": "#ffbe0b"
//                         }
//                     ],
//                     "date": "2022-03-08T22:00:00.000Z",
//                     "priority": "LOW"
//                 }]
//             }
//         ]
//
//     })
// })()