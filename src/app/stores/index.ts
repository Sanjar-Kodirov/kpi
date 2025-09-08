import { RUNTIME_STATE } from "#constants/index";
import { registerGlobalReset } from "src/core/store";
import { create } from "zustand";

type RuntimeStateType = {
  branchId?: string;
};

const runtimeStateDefault = {
  branchId: undefined,
};

export const $runtime = create<RuntimeStateType>(() => runtimeStateDefault);

export const updateRuntimeState = (runtimeState?: RuntimeStateType) => {
  $runtime.setState((state) => {
    const newState = {
      ...state,
      ...runtimeState,
    };

    localStorage.setItem(RUNTIME_STATE, JSON.stringify({ branchId: newState.branchId }));

    return newState;
  });
};

export const resetRuntime = () => {
  $runtime.setState(() => runtimeStateDefault);
};

registerGlobalReset(resetRuntime);
