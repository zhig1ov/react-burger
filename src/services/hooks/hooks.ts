import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import type { RootState, AppDispatch, AppThunk } from '../../index';

export const useDispatchHook = () => useDispatch<AppDispatch | AppThunk>()
export const useSelectorHook: TypedUseSelectorHook<RootState> = useSelector
