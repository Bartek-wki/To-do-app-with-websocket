//selectors
export const getAllTaks = ({ tasks }) => tasks;

// actions
const createActionName = actionName => `app/tasks/${actionName}`;
const ADD_TASK = createActionName('ADD_TASK');
const REMOVE_TASK = createActionName('REMOVE_TASK');
const UPDATE_TASKS = createActionName('UPDATE_TASKS');
const EDIT_TASK = createActionName('EDIT_TASK');

// action creators
export const addTask = payload => ({ type: ADD_TASK, payload });
export const removeTask = payload => ({ type: REMOVE_TASK, payload });
export const updateTasks = payload => ({ type: UPDATE_TASKS, payload });
export const editTask = payload => ({ type: EDIT_TASK, payload });

const tasksReducer = (statePart = [], action) => {
  switch (action.type) {
    case ADD_TASK:
      return [...statePart, action.payload];
    case REMOVE_TASK:
      return statePart.filter(task => task.id !== action.payload);
    case UPDATE_TASKS:
      return action.payload
    case EDIT_TASK:
      return statePart.map(task => (task.id === action.payload.id ? { ...task, ...action.payload } : task));
    default:
      return statePart;
  };
};

export default tasksReducer;