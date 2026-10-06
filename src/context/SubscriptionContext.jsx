import React, {
  createContext,
  useState,
  useEffect,
} from "react";

import {
  getSubscriptionPlans,
  addSubscriptionPlan,
  updateSubscriptionPlan,
  deleteSubscriptionPlan,
} from "../api/authApi"; 

export const SubscriptionContext = createContext();

export const SubscriptionProvider = ({ children }) => {
  const [plans, setPlans] = useState([]);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [plansLoading, setPlansLoading] = useState(true);

  // ==========================================
  // GET ALL SUBSCRIPTION PLANS
  // ==========================================
  const fetchPlans = async () => {
  try {
    setPlansLoading(true);

    const response = await getSubscriptionPlans();

    const formattedPlans = (response || []).map((plan) => ({
      id: plan.plan_id,
      plan_id: plan.plan_id,
      price: plan.price,
      amount: plan.price,
      currency: plan.currency,
      period: plan.interval,
      name: plan.name,
      description: plan.description,
      status: plan.is_active ? "Active" : "Inactive",
      discount: plan.discount_percent,
      features: (plan.features || []).map((feature) => ({
        text: feature,
        active: true,
      })),
      is_active: plan.is_active,
      is_current_plan: plan.is_current_plan,
    }));

    setPlans(formattedPlans);

    return formattedPlans;
  } catch (error) {
    console.error("Failed to fetch subscription plans:", error);
    return [];
  } finally {
    setPlansLoading(false);
  }
};

  // Fetch plans when provider loads
  useEffect(() => {
    fetchPlans();
  }, []);

  // ==========================================
  // CURRENCY
  // ==========================================
  const getCurrencySymbol = (currency) => {
    switch (currency) {
      case "USD":
      case "Dollar ($)":
        return "$";

      case "EUR":
      case "Euro (€)":
        return "€";

      case "INR":
      case "Rupee (₹)":
      default:
        return "₹";
    }
  };

  // ==========================================
  // ADD PLAN
  // POST TO BACKEND
  // THEN REFRESH PLANS
  // ==========================================
  const addPlan = async (planData) => {
  try {
    const response = await addSubscriptionPlan(planData);

    console.log("Subscription plan created:", response);

    await fetchPlans();

    return response;
  } catch (error) {
    console.error("Failed to add subscription plan:", error);
    throw error;
  }
};
  // ==========================================
  // UPDATE PLAN
  // ==========================================
  const updatePlan = async (planId, planData) => {
  try {
    const response = await updateSubscriptionPlan(planId, planData);

    console.log("Subscription plan updated:", response);

    await fetchPlans();

    return response;
  } catch (error) {
    console.error("Failed to update subscription plan:", error);
    throw error;
  }
};

  // ==========================================
  // DELETE PLAN
  // ==========================================
  const deletePlan = async (id) => {
  try {
    const response = await deleteSubscriptionPlan(id);

    console.log("Subscription plan deleted:", response);

    await fetchPlans();

    return response;
  } catch (error) {
    console.error("Failed to delete subscription plan:", error);
    throw error;
  }
};

  return (
    <SubscriptionContext.Provider
      value={{
    plans,
    plansLoading,
    fetchPlans,
    addPlan,
    updatePlan,
    deletePlan,
    selectedPlan,
    setSelectedPlan,
  }}
    >
      {children}
    </SubscriptionContext.Provider>
  );
};

