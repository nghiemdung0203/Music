import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    MusicTrack: [],
    CurrentTrack: null,
    isPlaying: false,
};  


const musicSlice = createSlice({
    name: 'music',
    initialState,
    reducers: {
        setSongs:  (state, aciton) => {
            state.MusicTrack = aciton.payload
        },
        currentSong: (state, aciton) => {
            state.CurrentTrack = aciton.payload
        },
        toggleSong: (state, aciton) => {
            state.isPlaying = !state.isPlaying
        }
    }
})


export const {setSongs, currentSong, toggleSong} = musicSlice.actions;
export default musicSlice.reducer
