import React, { createContext, useContext, useState } from "react";
import { EditPlanState } from "./types";

interface EditPlanContextValue {
  editPlanState: EditPlanState;
  setEditPlanState: React.Dispatch<React.SetStateAction<EditPlanState>>;
  reset: () => void;
}

const initialEditPlanState: EditPlanState = {
  name: "",
  time: "",
  completed: false,
  meals: {},
  ingredients: {},
};

const EditPlanContext = createContext<EditPlanContextValue>({
  editPlanState: initialEditPlanState,
  setEditPlanState: undefined,
  reset: undefined,
});

export default function EditPlanProvider({ children }) {
  const [editPlanState, setEditPlanState] =
    useState<EditPlanState>(initialEditPlanState);

  const reset = () => {
    // instead of using variable 'initialEditPlanState', hard reset with whole new obj
    // due to the way we manipulate ingredients: if we reset with initialEditMealState, initialEditMealState.ingredients would always be the same obj
    // might need to change adjust later
    setEditPlanState({
      ...initialEditPlanState,
      meals: {},
      ingredients: {},
    });
  };

  return (
    <EditPlanContext.Provider
      value={{ editPlanState, setEditPlanState, reset }}
    >
      {children}
    </EditPlanContext.Provider>
  );
}

export const useEditPlan = () => {
  const ctx = useContext(EditPlanContext);
  if (!ctx)
    throw new Error("useEditPlan must be used within a EditPlanProvider");
  return ctx;
};
