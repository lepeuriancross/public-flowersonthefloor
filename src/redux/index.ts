// Redux: Index
/*----------------------------------------------------------------------------------------------------*/

/*---------- Imports ----------*/

// Config
import { configShop } from '@/data/config';

// Scripts (node)
import { TypedUseSelectorHook, useSelector } from 'react-redux';

// Scripts (local)
import { configureStore } from '@reduxjs/toolkit';
import accessibility from './slices/sliceAccessibility';
import cursor from './slices/sliceCursor';
import manager from './slices/sliceManager';
import shop from './slices/sliceShop';

/*---------- Config ----------*/

// Config
const store = configureStore({
	reducer: {
		accessibility,
		cursor,
		manager,
		...(configShop.useShop ? { shop } : {}),
	},
});

/*---------- Exports ----------*/

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export { store };
