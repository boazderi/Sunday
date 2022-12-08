import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'
import { userService } from './user.service.js'
import { httpService } from './http.service.js'
import { socketService, SOCKET_EMIT_LOAD_CURRBOARD } from './socket.service.js'

// todo- change the storagekey to base url the Baseurl
const STORAGE_KEY = 'board'

export const boardService = {
    query,
    getBoardById,
    save,
    remove,
    getEmptyBoard,
    addBoardMsg,
    updateBoard,
    addNewTask,
    removeTasks,
    duplicateTasks,
    duplicateGroup,
    deleteGroup,
    addGroup,
    filterCurrBoard
    // updateDraggedGroup
}
window.cs = boardService

async function query() {
    return await httpService.get('board')
}

async function getBoardById(boardId) {
    try {
        // todo verify its need to be asynchron
        const board = await httpService.get(`board/${boardId}`)
        return board

    } catch (err) {
        throw err
    }
}

async function remove(boardId) {
    await storageService.remove(STORAGE_KEY, boardId)
}

async function save(board) {
    try {
        if (board._id) {
            await httpService.put(`board/${board._id}`, board)
            // socket for each update
            socketService.emit(SOCKET_EMIT_LOAD_CURRBOARD, board._id)
            return
        }

        // Note- meanwhile we didnt produce a new board
        // else {
        // yaronb: Later, owner is set by the backend
        // board.owner = userService.getLoggedinUser()
        // savedBoard = await storageService.post(STORAGE_KEY, board)
        // return httpService.post('board', board)
        // }
    } catch (err) {
        throw err
    }
}

async function addBoardMsg(boardId, txt) {
    //yaronb: Later, this is all done by the backend
    const board = await getBoardById(boardId)
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
    try {
        var currBoard = await getBoardById(boardId)
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

    } catch (err) {
        throw new Error('loadBoards')
    }
}

async function addNewTask({ boardId, groupId, taskTitle }) {
    try {
        var currBoard = await getBoardById(boardId)
        const groupIdx = currBoard.groups.findIndex(g => g.id === groupId)
        const newTask = _getEmptyTask(taskTitle)
        currBoard.groups[groupIdx].tasks.push(newTask)

        // note keep it synchronous and in failure 
        // the loadBoards dispatch will action
        save(currBoard)
        return currBoard

    } catch (err) {
        throw new Error('loadBoards')
    }
}

async function removeTasks({ boardId, selectedTasks }) {
    try {

        var currBoard = await getBoardById(boardId)
        currBoard.groups.forEach(group => {
            var tasks = group.tasks

            selectedTasks.forEach(selectedId => {
                const idx = tasks.findIndex(t => t.id === selectedId)
                if (idx !== -1) tasks.splice(idx, 1)
            })
        })
        save(currBoard)
        return currBoard
    } catch (err) {
        throw new Error('loadBoards')
    }
}
async function duplicateTasks({ boardId, selectedTasks }) {
    try {
        var currBoard = await getBoardById(boardId)
        currBoard.groups.forEach(group => {
            var tasks = group.tasks

            selectedTasks.forEach(selectedId => {
                const task = tasks.find(t => t.id === selectedId)
                if (task) tasks.push(task)
            })
        })
        save(currBoard)
        return currBoard

    } catch (err) {
        throw new Error('loadBoards')
    }
}
async function duplicateGroup({ boardId, groupId }) {
    try {
        var currBoard = await getBoardById(boardId)
        const dupGroup = JSON.parse(JSON.stringify(currBoard.groups.find(g => g.id === groupId)))
        dupGroup.id = utilService.makeId()

        dupGroup.tasks.forEach(t => t.id = utilService.makeId())
        currBoard.groups.push(dupGroup)
        save(currBoard)
        return currBoard
    } catch (err) {
        throw new Error('loadBoards')
    }
}
async function deleteGroup({ boardId, groupId }) {
    try {
        var currBoard = await getBoardById(boardId)
        const idx = currBoard.groups.findIndex(g => g.id === groupId)
        currBoard.groups.splice(idx, 1)
        save(currBoard)
        return currBoard
    } catch (err) {
        throw new Error('loadBoards')
    }

}
async function addGroup(boardId) {
    try {
        var currBoard = await getBoardById(boardId)
        const newGroup = _getEmptyGroup()
        currBoard.groups.push(newGroup)

        save(currBoard)
        return currBoard
    } catch (err) {
        throw new Error('loadBoards')
    }
}

function filterCurrBoard(currBoard, filterBy) {
    var filteredBoard = JSON.parse(JSON.stringify(currBoard))
    const regex = new RegExp(filterBy.text, 'i')
    var filteredGroups = []
    for (var i = 0; i < filteredBoard.groups.length ; i++) {
        var currGroup = filteredBoard.groups[i]
        if (regex.test(currGroup.title)) {
            filteredGroups.push(currGroup)
            continue
        }
        var filteredTasks = []
        for (var j = 0; j < currGroup.tasks.length; j++) {
            var toContinue = false
            const currTask = currGroup.tasks[j]
            if (regex.test(currTask.taskTitle)) {
                filteredTasks.push(currTask)
                toContinue = true
                continue
            }
            if (toContinue) continue

            for (var x = 0; x < filterBy.members.length; x++) {
                const currMember = filterBy.members[x]
                for (var n = 0; n < currTask.members.length; n++) {
                    if (currTask.members[n] === currMember.id) {
                        filteredTasks.push(currTask)
                        toContinue = true
                        continue
                    }
                }
            }
            if (toContinue) continue

            for (var y = 0; y < filterBy.dynamicProps.length; y++) {
                if (toContinue) continue
                const currProp = filterBy.dynamicProps[y].prop
                const currValues = filterBy.dynamicProps[y].values
                for (var m = 0; m < currValues.length; m++) {
                    if (currTask[currProp] === currValues[m]) {
                        filteredTasks.push(currTask)
                        toContinue = true
                        continue
                    }
                    if (toContinue) continue
                }
            }
            if (toContinue) continue
        }
        if (filteredTasks.length) {
            currGroup.tasks = filteredTasks
            filteredGroups.push(currGroup)
        }
    }
    filteredBoard.groups = filteredGroups

    // console.log(filteredGroups);
    return filteredBoard
}

function _getEmptyTask(taskTitle) {
    return {
        id: utilService.makeId(),
        taskTitle,
        status: 'Empty',
        priority: 'EMPTY',
        textNote: '',
        members: [],
        comments: []
    }
}

function _getEmptyGroup() {
    // todo-get random color
    return {
        id: utilService.makeId(),
        title: 'New Group',
        color: 'green',
        tasks: [],
    }
}

function getEmptyBoard() {
    return {
        boardName: '',
    }
}

// // TEST DATA

// ;
// (async() => {
//     await storageService.post(STORAGE_KEY, {
//         "_id": "b101",
//         "title": "Sprint4 - Project Mgmt",
//         "description": "This board will be used for collaboration management on the Funday app project",
//         "createdAt": 1589983468418,
//         "cmpOrder": ["status", "members", "priority", "date", "textNote", "file", "timeline"],
//         "labels": ["Status", "Person", "Priority", "Date", "Text", "File", "Timeline"],
//         "progLineOrder": ["status-progress", "div", "priority-progress", "div", "div", "div", "timeline-width"],
//         "createdBy": {
//             "id": "u101",
//             "fullname": "Tal Liber",
//             "imgUrl": "https://res.cloudinary.com/boaz-sunday-proj/image/upload/v1670188871/m99ikqcqjcuw75m4z8sl.jpg"
//         },
//         "members": [{
//                 "id": "u101",
//                 "fullname": "Tal Liber",
//                 "imgUrl": "https://res.cloudinary.com/boaz-sunday-proj/image/upload/v1670188871/m99ikqcqjcuw75m4z8sl.jpg",
//                 "color": "#8338ec"
//             },
//             {
//                 "id": "u102",
//                 "fullname": "Arnon Arditi",
//                 "imgUrl": "https://res.cloudinary.com/boaz-sunday-proj/image/upload/v1670188871/ggfq1eh886iohap9nmmd.jpg",
//                 "color": "#8338ec"
//             },
//             {
//                 "id": "u103",
//                 "fullname": "Boaz Deri",
//                 "imgUrl": "https://res.cloudinary.com/boaz-sunday-proj/image/upload/v1670188872/v24ixm31xhncmyyjkqpx.jpg",
//                 "color": "#3a86ff"
//             },
//             {
//                 "id": "u104",
//                 "fullname": "Tal Amit",
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
//                 "imgUrl": "https://res.cloudinary.com/boaz-sunday-proj/image/upload/v1670188871/m99ikqcqjcuw75m4z8sl.jpg"
//             },
//             "task": {
//                 "id": "c101",
//                 "title": "Replace Logo"
//             }
//         }],
//         "groups": [{
//             "id": "gy5LnM",
//             "title": "Frontend",
//             "color": "#579bfc",
//             "tasks": [{
//                     "id": "t2yn4E",
//                     "taskTitle": "without comments",
//                     "status": "Working",
//                     "members": [{
//                             "id": "u101",
//                             "fullname": "Tal Liber",
//                             "imgUrl": "https://res.cloudinary.com/boaz-sunday-proj/image/upload/v1670188871/m99ikqcqjcuw75m4z8sl.jpg",
//                             "color": "#8338ec"
//                         },
//                         {
//                             "id": "u102",
//                             "fullname": "Arnon Arditi",
//                             "imgUrl": "https://res.cloudinary.com/boaz-sunday-proj/image/upload/v1670188871/ggfq1eh886iohap9nmmd.jpg",
//                             "color": "#3a86ff"
//                         }
//                     ],
//                     "date": "2022-03-28T21:00:00.000Z",
//                     "priority": "HIGH",
//                     "textNote": "",
//                     "comments": []
//                 },
//                 {
//                     "id": "t2yvg",
//                     "taskTitle": "With comments",
//                     "status": "Done",
//                     "members": [{
//                             "id": "u101",
//                             "fullname": "Tal Liber",
//                             "imgUrl": "https://res.cloudinary.com/boaz-sunday-proj/image/upload/v1670188871/m99ikqcqjcuw75m4z8sl.jpg",
//                             "color": "#8338ec"
//                         },
//                         {
//                             "id": "u102",
//                             "fullname": "Arnon Arditi",
//                             "imgUrl": "https://res.cloudinary.com/boaz-sunday-proj/image/upload/v1670188871/ggfq1eh886iohap9nmmd.jpg",
//                             "color": "#3a86ff"
//                         }
//                     ],
//                     "date": "2022-03-28T21:00:00.000Z",
//                     "priority": "LOW",
//                     "textNote": "sass is good",
//                     "comments": [{
//                             "id": "ZdPnm",
//                             "txt": "also @yaronb please CR this",
//                             "createdAt": 1590999817436,
//                             "byMember": {
//                                 "_id": "u101",
//                                 "fullname": "Tal Liber",
//                                 "imgUrl": "https://res.cloudinary.com/boaz-sunday-proj/image/upload/v1670188871/m99ikqcqjcuw75m4z8sl.jpg",
//                                 "color": "#8338ec"
//                             }
//                         },
//                         {
//                             "id": "ZdPfd",
//                             "txt": "Baba and didi go to the yam",
//                             "createdAt": 1590999212436,
//                             "byMember": {
//                                 "id": "u102",
//                                 "fullname": "Arnon Arditi",
//                                 "imgUrl": "https://res.cloudinary.com/boaz-sunday-proj/image/upload/v1670188871/ggfq1eh886iohap9nmmd.jpg",
//                                 "color": "#8338ec"
//                             }
//                         }
//                     ]
//                 }
//             ]
//         }]
//     })
// })()