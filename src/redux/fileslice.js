import { createSlice } from '@reduxjs/toolkit'
import  toast  from "react-hot-toast";

const initialState = {
  files: localStorage.getItem('file') ? JSON.parse(localStorage.getItem('file')) : []  // get files from local storage on app start
  // files: [],  // initialize files array with empty array
}

export const file = createSlice({
  name: 'file',
  initialState,
  reducers: {
    addfile: (state,data) => {
      const file=data.payload
      state.files.push(file)
      localStorage.setItem('file', JSON.stringify(state.files))
      toast.success("File Create Successfully");
    },
    removefile: (state,data) => {
        const id=data.payload;
        const afterremove = state.files.filter(file => file.id != id);
        state.files = afterremove;
        localStorage.setItem('file', JSON.stringify(state.files))
        toast.success("File Delete Successfully");
    },

    updatefile: (state, action) => {
      const fileUpdate = action.payload;
      const index = state.files.findIndex((file) => file.id === fileUpdate.id);
      if (index !== -1) {
        state.files[index] = fileUpdate;
        localStorage.setItem('file', JSON.stringify(state.files));
        toast.success("File Update Successfully");
      }
    }    
  },
})

// Action creators are generated for each case reducer function
export const { addfile, removefile, updatefile } = file.actions
export default file.reducer