import { usePlan } from "@components/plans/PlanContext";
import { PlanDetail } from "@components/plans/types";
import PlanForm from "@components/plans/PlanForm";

const NewPlan = () => {
  const { createPlan } = usePlan();

  const handleOnCreate = async (plan: PlanDetail) => {
    createPlan(plan);
  };

  return <PlanForm submitTItle="Create" onSubmit={handleOnCreate} />;
};

export default NewPlan;
