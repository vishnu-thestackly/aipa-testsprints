import { useContext } from "react";
import { SubscriptionContext } from "./SubscriptionContext";

export const useSubscription = () => {
  return useContext(SubscriptionContext);
};