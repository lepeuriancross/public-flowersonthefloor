// Redux: Slice / Manager
/*----------------------------------------------------------------------------------------------------*/

/*---------- Imports ----------*/

// Config
import { staticMeta } from '@/data/content';

// Scripts (node)
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Scripts (local)
// ...

/*---------- Config ----------*/

// Typings
type InitialState = {
	// UI
	isShowingIntro: boolean;
	isShowingLoader: boolean;
	isScrolled: number;
	isResized: [number, number];
	isShowingMenu: boolean;
	isDarkMode: boolean;

	// Metadata
	metaTitle: string;

	// Cursor
	cursorMouseX: number;
	cursorMouseY: number;
	cursorDestinationX: number;
	cursorDestinationY: number;
	cursorDistanceX: number;
	cursorDistanceY: number;
	cursorKey: number;
	cursorTheme: ThemeCursor;

	// Header
	headerSize: number[];
	headerTheme?: string;

	// Footer
	footerSize: number[];

	// Contact
	tel?: string;
	email?: string;
	instagram?: string;
	tiktok?: string;

	// Navigation
	navHomeSlug: string;
	navHeader?: ListButtons;
	navFooter?: ListButtons;
};

// Initial State
const initialState = {
	// UI
	isShowingIntro: true,
	isShowingLoader: false,
	isScrolled: 0,
	isResized: [0, 0],
	isShowingMenu: true,
	isDarkMode: false,

	// Metadata
	metaTitle: staticMeta.title,

	// Cursor
	cursorMouseX: 0,
	cursorMouseY: 0,
	cursorDestinationX: 0,
	cursorDestinationY: 0,
	cursorDistanceX: 0,
	cursorDistanceY: 0,
	cursorKey: -1,
	cursorTheme: 'default',

	// Header
	headerSize: [0, 0],
	headerTheme: 'default',

	// Footer
	footerSize: [0, 0],

	// Contact
	tel: undefined,
	email: undefined,
	instagram: undefined,
	tiktok: undefined,

	// Navigation
	navHomeSlug: 'index',
	navHeader: [],
	navFooter: [],
	navSocial: [],
} as InitialState;

// Create Slice
const content = createSlice({
	name: 'content',
	initialState,
	reducers: {
		// UI
		setIsShowingIntro: (state, action: PayloadAction<boolean>) => {
			state.isShowingIntro = action.payload;
		},
		setIsShowingLoader: (state, action: PayloadAction<boolean>) => {
			state.isShowingLoader = action.payload;
		},
		setIsScrolled: (state, action: PayloadAction<number>) => {
			state.isScrolled = action.payload;
		},
		setIsResized: (state, action: PayloadAction<[number, number]>) => {
			state.isResized = action.payload;
		},
		setIsShowingMenu: (state, action: PayloadAction<boolean>) => {
			state.isShowingMenu = action.payload;
		},
		setIsDarkMode: (state, action: PayloadAction<boolean>) => {
			state.isDarkMode = action.payload;
		},

		// Meta
		setMetaTitle: (state, action: PayloadAction<string>) => {
			state.metaTitle = action.payload;
		},

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

		// Header
		setHeaderSize: (state, action: PayloadAction<number[]>) => {
			state.headerSize = action.payload;
		},
		setHeaderTheme: (state, action: PayloadAction<string>) => {
			state.headerTheme = action.payload;
		},

		// Footer
		setFooterSize: (state, action: PayloadAction<number[]>) => {
			state.footerSize = action.payload;
		},

		// Contact
		setContactTel: (state, action: PayloadAction<string>) => {
			state.tel = action.payload;
		},
		setContactEmail: (state, action: PayloadAction<string>) => {
			state.email = action.payload;
		},
		setContactInstagram: (state, action: PayloadAction<string>) => {
			state.instagram = action.payload;
		},
		setContactTikTok: (state, action: PayloadAction<string>) => {
			state.tiktok = action.payload;
		},

		// Navigation
		setNavHomeSlug: (state, action: PayloadAction<string>) => {
			state.navHomeSlug = action.payload;
		},
		setNavHeader: (state, action: PayloadAction<ListButtons>) => {
			state.navHeader = action.payload;
		},
		setNavFooter: (state, action: PayloadAction<ListButtons>) => {
			state.navFooter = action.payload;
		},
	},
});

/*---------- Exports ----------*/

export const {
	// UI
	setIsShowingIntro,
	setIsShowingLoader,
	setIsScrolled,
	setIsResized,
	setIsShowingMenu,
	setIsDarkMode,

	// Metadata
	setMetaTitle,

	// Cursor
	setCursorMouseX,
	setCursorMouseY,
	setCursorDestinationX,
	setCursorDestinationY,
	setCursorDistanceX,
	setCursorDistanceY,
	setCursorKey,
	setCursorTheme,

	// Header
	setHeaderSize,
	setHeaderTheme,

	// Footer
	setFooterSize,

	// Contact
	setContactTel,
	setContactEmail,
	setContactInstagram,
	setContactTikTok,

	// Navigation
	setNavHomeSlug,
	setNavHeader,
	setNavFooter,
} = content.actions;
export default content.reducer;
