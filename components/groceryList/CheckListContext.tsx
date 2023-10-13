import React, { createContext, useContext, useState, useEffect } from "react";
import { CheckListState } from "@components/groceryList/types";
import { PlanDetail } from "@components/plans/types";
import { IngredientWithQty } from "@components/ingredient/types";
import { getStorageLists, syncListToStorage } from "@storages/checkListStorage";

export const CHECK_LIST = "CHECK_LIST";

interface CheckListContextValue {
  list: CheckListState;
  setupCheckList: (plan: PlanDetail) => void;
  checkListItem: (id: number) => void;
  unCheckListItem: (id: number) => void;
}

const initialCheckList: CheckListState = {
  planId: 0,
  checklist: {},
};
const CheckListContext = createContext<CheckListContextValue>({
  list: initialCheckList,
  setupCheckList: undefined,
  checkListItem: undefined,
  unCheckListItem: undefined,
});

export default function CheckListProvider({ children }) {
  const [list, setList] = useState<CheckListState>(initialCheckList);

  useEffect(() => {
    syncListToStorage(list);
  }, [list]);

  const setupCheckList = async (plan: PlanDetail) => {
    try {
      const lists = await getStorageLists();
      const listByPlanId = lists.find((l) => l.planId === plan.id);

      if (listByPlanId) {
        setList(listByPlanId);
      } else {
        setList(parsePlanToCheckList(plan));
      }
    } catch {
      // error
    }
  };

  const checkListItem = (id: number) => {
    setList((prev) => {
      const newList = { ...prev };
      newList.checklist[id].checked = true;
      return newList;
    });
  };

  const unCheckListItem = (id: number) => {
    setList((prev) => {
      const newList = { ...prev };
      newList.checklist[id].checked = false;
      return newList;
    });
  };

  return (
    <CheckListContext.Provider
      value={{
        list,
        setupCheckList,
        checkListItem,
        unCheckListItem,
      }}
    >
      {children}
    </CheckListContext.Provider>
  );
}

export const useCheckList = () => {
  const ctx = useContext(CheckListContext);
  if (!ctx)
    throw new Error("useCheckList must be used within a CheckListProvider");
  return ctx;
};

function parsePlanToCheckList(plan: PlanDetail): CheckListState {
  const result: CheckListState = {
    planId: plan.id,
    checklist: {},
  };

  const mergeIngredIntoResult = (ingred: IngredientWithQty) => {
    const { id, quantity } = ingred;
    if (result.checklist[id]) {
      result.checklist[id].quantity += quantity;
    } else {
      result.checklist[id] = { ...ingred, checked: false };
    }
  };

  plan.meals.forEach((m) => m.ingredients.forEach(mergeIngredIntoResult));
  plan.ingredients.forEach(mergeIngredIntoResult);

  return result;
}
