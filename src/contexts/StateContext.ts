import { MakotoState } from "@/backend/state";
import { createContext } from "react";

export const StateContext = createContext<MakotoState>(undefined!);