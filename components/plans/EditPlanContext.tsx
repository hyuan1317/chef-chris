import React, { createContext, useContext, useState } from "react";
import { EditPlanState } from "./types";

interface EditPlanContextValue {
  editPlanState: EditPlanState;
  setEditPlanState: React.Dispatch<React.SetStateAction<EditPlanState>>;
}

const EditPlanContext = createContext<EditPlanContextValue>({
  editPlanState: {
    name: "",
    time: "",
    meals: {},
    ingredients: {},
  },
  setEditPlanState: undefined,
});

export default function EditPlanProvider({ children }) {
  const [editPlanState, setEditPlanState] = useState<EditPlanState>({
    name: "",
    time: "",
    meals: {},
    ingredients: {},
  });

  return (
    <EditPlanContext.Provider value={{ editPlanState, setEditPlanState }}>
      {children}
    </EditPlanContext.Provider>
  );
}

export const useEditPlan = () => {
  const ctx = useContext(EditPlanContext);
  if (!ctx) throw new Error("useEditPlan must be used within a PlanProvider");
  return ctx;
};
