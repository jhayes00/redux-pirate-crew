const { createStore } = Redux;

const initialState = {
  crew: [
    {
      name: 'Captain'
    }
  ],
  exCrew: [
    {
      name: ''
    }
  ]
}

const crewReducer = (state = initialState, action) => {
  switch(action.type) {
    case ADD_MEMBER:
      const newCrewArray = state.crew.concat(action.newMember)
      return Object.assign({}, state, {
        crew: newCrewArray
      })
    case DELETE_MEMBER:
      const currentCrewArray = state.crew
      const currentExCrewArray = state.exCrew
      const deletedMember = currentCrewArray.shift()
      const filteredCrew = currentCrewArray

      let newExCrewArray = currentExCrewArray
      if (deletedMember) {
        newExCrewArray = currentExCrewArray.concat(deletedMember)
      }

      return Object.assign({}, state, {
        crew: filteredCrew,
        exCrew: newExCrewArray
      })
    default:
      return state;
  }
}

const newPirateForm = document.getElementById('new-pirate-form')

const ADD_MEMBER = 'ADD_MEMBER'

const addMemberToCrew = newMember => {
  return {
    type: ADD_MEMBER,
    newMember: newMember
  }
}

newPirateForm.addEventListener('submit', () => {
  event.preventDefault()
  const pirateName = document.getElementById('name').value
  document.getElementById('name').value = ''
  const newPirate = { name: pirateName }
  store.dispatch(addMemberToCrew(newPirate))
})

const deleteButton = document.getElementById('walk-the-plank')

const DELETE_MEMBER = 'DELETE_MEMBER'

const deleteMemberFromCrew = () => {
  return {
    type: DELETE_MEMBER
  }
}

deleteButton.addEventListener('click', () => {
  if (store.getState().exCrew.length > 0) {
    store.dispatch(deleteMemberFromCrew())
  }
})

const store = createStore(crewReducer)

const currentCrewMembers = document.getElementById('current-crew')
const currentExCrewMembers = document.getElementById('walked-crew')
const numExCrewMembers = document.getElementById('plank-walkers')

const render = () => {
  let newCrewList = ''
  let newExCrewList = ''

  console.log(store.getState().crew)
  store.getState().crew.forEach(function(crewMember) {
    newCrewList += `<div>${crewMember.name}</div>`
  })
  currentCrewMembers.innerHTML = newCrewList

  console.log(store.getState().exCrew)
  store.getState().exCrew.forEach(function(exCrewMember) {
    newExCrewList += `<div>${exCrewMember.name}</div>`
  })
  currentExCrewMembers.innerHTML = newExCrewList

  numExCrewMembers.innerHTML = store.getState().exCrew.length - 1
}

render()
store.subscribe(render)
