import AsyncStorage from "@react-native-async-storage/async-storage";
import { PlanDetail, CreatePlanReq } from "@components/plans/types";

const PLANS = "PLANS";
const PLAN_ID_COUNT = "PLAN_ID_COUNT";

export const getPlans = async (): Promise<PlanDetail[]> => {
  const data = await AsyncStorage.getItem(PLANS);
  return data ? JSON.parse(data) : [];
};

export const createPlan = async (plan: CreatePlanReq) => {
  const plans = await getPlans();

  const idCount = await AsyncStorage.getItem(PLAN_ID_COUNT);
  const id = idCount ? Number(idCount) + 1 : 1;
  const newPlan = {
    ...plan,
    time: new Date().toISOString(),
    id,
  };
  plans.push(newPlan);
  await AsyncStorage.setItem(PLANS, JSON.stringify(plans));
  await AsyncStorage.setItem(PLAN_ID_COUNT, id.toString());

  return newPlan;
};

export const editPlan = async (plan: PlanDetail) => {
  const plans = await getPlans();
  const targetPlan = plans.find((m) => m.id === plan.id);
  targetPlan.name = plan.name;
  targetPlan.meals = plan.meals;
  targetPlan.ingredients = plan.ingredients;

  await AsyncStorage.setItem(PLANS, JSON.stringify(plans));
  return plan;
};

export const deletePlan = async (planId: number) => {
  const plans = await getPlans();
  const newPlans = plans.filter((p) => p.id !== planId);

  await AsyncStorage.setItem(PLANS, JSON.stringify(newPlans));
};
