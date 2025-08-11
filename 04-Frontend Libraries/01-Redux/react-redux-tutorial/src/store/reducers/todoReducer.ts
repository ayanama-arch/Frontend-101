import { createSlice, type PayloadAction } from "@reduxjs/toolkit";



interface TodoTypes {
  id: string;
  task: string;
  status: "completed" | "inprogress" | "incomplete";
}

const dummyReducer = createSlice({
  name:'dummy',
  initialState:{count:0},
  reducers:{
    addCount:(state)=>{
      state.count += 5;
    }
  }
})
export const {addCount} = dummyReducer.actions

// Start with an empty array
const initialState: TodoTypes[] = [];

const todoReducer = createSlice({
  name: "todos",
  initialState,
  reducers: {
    addTodo: {
      reducer: (state, action: PayloadAction<TodoTypes>) => {
        state.push(action.payload);
      },
      prepare: (task: string, status: TodoTypes["status"]) => ({
        payload: {
          id: Date.now().toString(),
          task,
          status,
        },
      }),
    },

    removeTodo: (state, action: PayloadAction<string>) => {
      state.filter((todo) => todo.id !== action.payload);
    },
    toggleStatus: (state, action: PayloadAction<string>) => {
      const todo = state.find((todo) => todo.id === action.payload);
      if (todo) {
        todo.status = todo.status === "completed" ? "incomplete" : "completed";
      }
    },
    updateTask: (
      state,
      action: PayloadAction<{ id: string; task: string }>
    ) => {
      const todo = state.find((todo) => todo.id === action.payload.id);
      if (todo) {
        todo.task = action.payload.task;
      }
    },
    
  },
  extraReducers:(builder)=>{
    builder.addCase(addCount,(state)=>{
      console.log(state)
      console.log('add - count TRIGGERED')
    }),
    builder.addMatcher((action:{type:string})=>action.type.startsWith('dummy'),(state,action)=>{
      state = state;
      console.log('ACTION: TARARA-> ',action)
    })
    builder.addDefaultCase((state,action)=>{
      state=state
      console.log("RUN ALWAYS: ",action)
    })
  },
  selectors:{
    selectAllTODO:state=>state
  }
});

export const { addTodo, removeTodo, toggleStatus, updateTask } =
  todoReducer.actions;

  export const {selectAllTODO} = todoReducer.selectors

export default todoReducer.reducer;
