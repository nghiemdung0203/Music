import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    MusicTrack: [],
    CurrentTrack: null,
    isPlaying: false,
    volume: 50,
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
        PlayPause: (state, aciton) => {
            state.isPlaying = !state.isPlaying
        }
    }
})


export const {setSongs, currentSong, PlayPause} = musicSlice.actions;
export default musicSlice.reducer
