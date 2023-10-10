import React, { createContext, useContext, useEffect, useState } from "react";
import { PlanDetail, CreatePlanReq } from "./types";
import * as planService from "@services/planService";

interface PlanContextValue {
  plans: PlanDetail[];
  createPlan: (plan: CreatePlanReq) => Promise<PlanDetail>;
  editPlan: (plan: PlanDetail) => Promise<PlanDetail>;
}

const PlanContext = createContext<PlanContextValue>({
  plans: [],
  createPlan: undefined,
  editPlan: undefined,
});

export default function PlanProvider({ children }) {
  const [plans, setPlans] = useState<PlanDetail[]>([]);

  useEffect(() => {
    fetchPlans();
  }, []);

  const fetchPlans = async () => {
    try {
      const data = await planService.getPlans();
      setPlans(data);
    } catch {
      // error
    }
  };

  const createPlan = async (plan: CreatePlanReq) => {
    try {
      const data = await planService.createPlan(plan);
      fetchPlans();
      return data;
    } catch {
      // error
    }
  };

  const editPlan = async (plan: PlanDetail) => {
    try {
      const data = await planService.editPlan(plan);
      fetchPlans();
      return data;
    } catch {
      // error
    }
  };

  return (
    <PlanContext.Provider value={{ plans, createPlan, editPlan }}>
      {children}
    </PlanContext.Provider>
  );
}

export const usePlan = () => {
  const ctx = useContext(PlanContext);
  if (!ctx) throw new Error("usePlan must be used within a PlanProvider");
  return ctx;
};
