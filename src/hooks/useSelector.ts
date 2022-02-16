import { useSelector as _useSelector, TypedUseSelectorHook } from "react-redux";
import { RootState } from "../redux/store";

const useSelector: TypedUseSelectorHook<RootState> = _useSelector;

export default useSelector;
