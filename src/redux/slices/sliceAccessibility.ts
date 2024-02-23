// Redux: Slice / Accessibility
/*----------------------------------------------------------------------------------------------------*/

/*---------- Imports ----------*/

// Scripts (node)
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Scripts (local)
// ...

/*---------- Config ----------*/

// Typings
type InitialState = {
	// Layout
	isLoadingOverlay: boolean;
	isShowingOverlay: boolean;

	// Settings
	settingBiggerText: number;
	settingBiggerCursor: boolean;
	settingTooltips: boolean;
	settingLineHeight: number;
	settingHideImages: boolean;
	settingReadableFonts: boolean;
	settingStopAnimations: boolean;
};

// Initial State
const initialState = {
	// Layout
	isLoadingOverlay: false,
	isShowingOverlay: false,

	// Settings
	settingBiggerText: 0,
	settingBiggerCursor: false,
	settingTooltips: false,
	settingLineHeight: 0,
	settingHideImages: false,
	settingReadableFonts: false,
	settingStopAnimations: false,
} as InitialState;

// Create Slice
const content = createSlice({
	name: 'content',
	initialState,
	reducers: {
		// Layout
		setIsLoadingOverlay: (state, action: PayloadAction<boolean>) => {
			state.isLoadingOverlay = action.payload;
		},
		setIsShowingOverlay: (state, action: PayloadAction<boolean>) => {
			state.isShowingOverlay = action.payload;
		},

		// Settings
		setSettingBiggerText: (state, action: PayloadAction<number>) => {
			state.settingBiggerText = action.payload;
		},
		setSettingBiggerCursor: (state, action: PayloadAction<boolean>) => {
			state.settingBiggerCursor = action.payload;
		},
		setSettingTooltips: (state, action: PayloadAction<boolean>) => {
			state.settingTooltips = action.payload;
		},
		setSettingLineHeight: (state, action: PayloadAction<number>) => {
			state.settingLineHeight = action.payload;
		},
		setSettingHideImages: (state, action: PayloadAction<boolean>) => {
			state.settingHideImages = action.payload;
		},
		setSettingReadableFonts: (state, action: PayloadAction<boolean>) => {
			state.settingReadableFonts = action.payload;
		},
		setSettingStopAnimations: (state, action: PayloadAction<boolean>) => {
			state.settingStopAnimations = action.payload;
		},
	},
});

/*---------- Exports ----------*/

export const {
	// Layout
	setIsLoadingOverlay,
	setIsShowingOverlay,
	// Settings
	setSettingBiggerText,
	setSettingBiggerCursor,
	setSettingTooltips,
	setSettingLineHeight,
	setSettingHideImages,
	setSettingReadableFonts,
	setSettingStopAnimations,
} = content.actions;
export default content.reducer;
