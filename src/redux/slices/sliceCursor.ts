// Redux: Slice / Cursor
/*----------------------------------------------------------------------------------------------------*/

/*---------- Imports ----------*/

// Scripts (node)
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Scripts (local)
// ...

/*---------- Config ----------*/

// Typings
type InitialState = {
	// Cursor
	cursorMouseX: number;
	cursorMouseY: number;
	cursorDestinationX: number;
	cursorDestinationY: number;
	cursorDistanceX: number;
	cursorDistanceY: number;
	cursorKey: number;
	cursorTheme: ThemeCursor;
};

// Initial State
const initialState = {
	// Cursor
	cursorMouseX: 0,
	cursorMouseY: 0,
	cursorDestinationX: 0,
	cursorDestinationY: 0,
	cursorDistanceX: 0,
	cursorDistanceY: 0,
	cursorKey: -1,
	cursorTheme: 'default',
} as InitialState;

// Create Slice
const content = createSlice({
	name: 'content',
	initialState,
	reducers: {
		// Cursor
		setCursorMouseX: (state, action: PayloadAction<number>) => {
			state.cursorMouseX = action.payload;
		},
		setCursorMouseY: (state, action: PayloadAction<number>) => {
			state.cursorMouseY = action.payload;
		},
		setCursorDestinationX: (state, action: PayloadAction<number>) => {
			state.cursorDestinationX = action.payload;
		},
		setCursorDestinationY: (state, action: PayloadAction<number>) => {
			state.cursorDestinationY = action.payload;
		},
		setCursorDistanceX: (state, action: PayloadAction<number>) => {
			state.cursorDistanceX = action.payload;
		},
		setCursorDistanceY: (state, action: PayloadAction<number>) => {
			state.cursorDistanceY = action.payload;
		},
		setCursorKey: (state, action: PayloadAction<number>) => {
			state.cursorKey = action.payload;
		},
		setCursorTheme: (state, action: PayloadAction<ThemeCursor>) => {
			state.cursorTheme = action.payload;
		},
	},
});

/*---------- Exports ----------*/

export const {
	// Cursor
	setCursorMouseX,
	setCursorMouseY,
	setCursorDestinationX,
	setCursorDestinationY,
	setCursorDistanceX,
	setCursorDistanceY,
	setCursorKey,
	setCursorTheme,
} = content.actions;
export default content.reducer;
