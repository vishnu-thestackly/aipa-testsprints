import React, { createContext, useContext, useState, useEffect } from "react";
import { getSubscriptionPlans } from "../api/authApi"; // update the path

  const SubscriptionContext = createContext();



  export const SubscriptionProvider = ({ children }) => {
    const [plans, setPlans] = useState([]);
  const [selectedPlan, setSelectedPlan] = useState(null);

  const fetchPlans = async () => {
    try {
      const response = await getSubscriptionPlans();

      const formattedPlans = response.map((plan) => ({
        id: plan.plan_id,
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
      }));

      setPlans(formattedPlans);
    } catch (error) {
      console.error("Failed to fetch subscription plans:", error);
    }
  };
  
  useEffect(() => {
    fetchPlans();
  }, []);

  

    const getCurrencySymbol = (currency) => {
      switch (currency) {
        case "Dollar ($)":
          return "$";
        case "Euro (€)":
          return "€";
        default:
          return "₹";
      }
    };

    const addPlan = (plan) => {
      const newPlan = {
        ...plan,
        id: Date.now(),
        price: `${getCurrencySymbol(plan.currency)}${plan.amount}`,
      };

      setPlans((prev) => [...prev, newPlan]);
    };

    const updatePlan = (updatedPlan) => {
      const plan = {
        ...updatedPlan,
        price: `${getCurrencySymbol(updatedPlan.currency)}${updatedPlan.amount}`,
      };

      setPlans((prev) =>
        prev.map((item) => (item.id === plan.id ? plan : item))
      );
    };

    const deletePlan = (id) => {
      setPlans((prev) => prev.filter((item) => item.id !== id));
    };

    return (
      <SubscriptionContext.Provider
        value={{
          plans,
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

  export const useSubscription = () => useContext(SubscriptionContext);