import axios from "axios";

// Backend Base URL
const BASE_URL = "http://127.0.0.1:8000";

// Axios Instance
const API = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

//  Added for refresh token perpose

API.interceptors.response.use(
  (response) => response,

  async (error) => {
    const originalRequest = error.config;

    if (
      error.response?.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      try {
        const refreshToken =
          localStorage.getItem("refreshToken");

        const refreshResponse = await axios.post(
          `${BASE_URL}/api/v1/auth/refresh`,
          {
            refresh_token: refreshToken,
          }
        );

        const newAccessToken =
          refreshResponse.data.access_token;

        localStorage.setItem("token", newAccessToken);

        originalRequest.headers.Authorization =
          `Bearer ${newAccessToken}`;

        return API(originalRequest);
      } catch (refreshError) {
        localStorage.removeItem("token");
        localStorage.removeItem("refreshToken");

        

        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

// ================= REGISTER API =================

export const signupUser = async (userData) => {
  try {

    const response = await API.post(
      "/api/v1/auth/register",
      userData
    );

    return response.data;

  } catch (error) {

    throw error.response?.data || "Signup Failed";
  }
};

// ================= LOGIN API =================

export const loginUser = async (userData) => {
  try {

    const response = await API.post(
      "/api/v1/auth/login",
      userData
    );

    return response.data;

  } catch (error) {

    throw error.response?.data || "Login Failed";
  }
};

// export const loginUser = async (userData) => {
//   try {
//     const response = await API.post(
//       "/api/v1/auth/login",
//       userData
//     );

//     return response.data;

//   } catch (error) {

//     throw new Error(
//       error.response?.data?.detail || "Login Failed"
//     );
//   }
// };
// ================= CAPTCHA VERIFY API =================

export const verifyCaptcha = async (captchaToken) => {

  try {

    const response = await API.post(
      "/api/v1/auth/captcha/verify",
      {
        captcha_token: captchaToken,
      }
    );

    return response.data;

  } catch (error) {

    throw error.response?.data || "Captcha Verification Failed";
  }
};

// ================= GOOGLE LOGIN API =================

export const googleLogin = async (tokenData) => {

  try {

    const response = await API.post(
      "api/v1/auth/oauth/google",
      tokenData
    );

    return response.data;

  } catch (error) {

    throw error.response?.data || "Google Login Failed";
  }
};

// ================= RESEND OTP API =================

export const resendOtp = async (emailData) => {

  try {

    const response = await API.post(
      "/api/v1/auth/resend-otp",
      emailData
    );

    return response.data;

  } catch (error) {

    throw error.response?.data || "Resend OTP Failed";
  }
};

// ================= VERIFY EMAIL API =================

export const verifyEmail = async (otpData) => {

  try {

    const response = await API.post(
      "/api/v1/auth/verify-email",
      otpData
    );

    return response.data;

  } catch (error) {

    throw error.response?.data || "Email Verification Failed";
  }
};

// ================= VERIFY RESET PASSWORD EMAIL API =================

export const verifyResetPassword = async (otpData) => {

  try {

    const response = await API.post(
      "/api/v1/auth/verify-reset-otp",
      otpData
    );

    return response.data;

  } catch (error) {

    throw error.response?.data || "Email Verification Failed";
  }
};

export const verifyAdminLoginOTP = async (otpData) => {

  try {

    const response = await API.post(
      "/api/v1/auth/verify-admin-login-otp",
      otpData
    );

    return response.data;

  } catch (error) {

    throw error.response?.data || "Email Verification Failed";
  }
};


// ================= FORGOT PASSWORD API =================

export const forgotPassword = async (emailData) => {

  try {

    const response = await API.post(
      "/api/v1/auth/forgot-password",
      emailData
    );

    return response.data;

  } catch (error) {

    throw error.response?.data || "Forgot Password Failed";
  }
};

// ================= RESET PASSWORD API =================

export const resetPassword = async (resetData) => {

  try {

    const response = await API.post(
      "/api/v1/auth/reset-password",
      resetData
    );

    return response.data;

  } catch (error) {

    throw error.response?.data || "Reset Password Failed";
  }
};

// ================= REFRESH TOKEN API =================

export const refreshToken = async (refreshData) => {

  try {

    const response = await API.post(
      "/api/v1/auth/refresh",
      refreshData
    );

    return response.data;

  } catch (error) {

    throw error.response?.data || "Refresh Token Failed";
  }
};

// ================= LOGOUT API =================

export const logoutAdmin = async () => {

  try {

    const token = localStorage.getItem("token");

    const response = await API.post(
      "/api/v1/auth/logout",
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;

  } catch (error) {

    console.log("Logout API Error:", error);

    throw error.response?.data || "Logout Failed";
  }
};


// sprint 3

// ================= USERS KPI STATS =================

export const getUserStats = async () => {
  try {
    const token = localStorage.getItem("token");

    const response = await API.get(
      "/api/v1/admin-management/users/stats",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    throw error.response?.data || "Failed to fetch user stats";
  }
};


// ================= GET ALL USERS =================

export const getUsers = async () => {
  try {
    const token = localStorage.getItem("token");

    const response = await API.get(
      "/api/v1/admin-management/users",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    throw error.response?.data || "Failed to fetch users";
  }
};


// ================= EXPORT USERS =================

export const exportUsers = async () => {
  try {
    const token = localStorage.getItem("token");

    const response = await API.get(
      "/api/v1/admin-management/users/export",
      {
        responseType: "blob",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    throw error.response?.data || "Export failed";
  }
};


// ================= GET USER DETAILS =================

export const getUserDetails = async (userId) => {
  try {
    const token = localStorage.getItem("token");

    const response = await API.get(
      `/api/v1/admin-management/users/${userId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    throw error.response?.data || "Failed to fetch user details";
  }
};


// ================= UPDATE USER =================

export const updateUser = async (userId, payload) => {
  try {
    const token = localStorage.getItem("token");

    const response = await API.patch(
      `/api/v1/admin-management/users/${userId}`,
      payload,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    throw error.response?.data || "Update failed";
  }
};


// ================= DELETE USER =================

export const deleteUser = async (userId) => {
  try {
    const token = localStorage.getItem("token");

    const response = await API.delete(
      `/api/v1/admin-management/users/${userId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    throw error.response?.data || "Delete failed";
  }
};


// ================= UPDATE USER STATUS =================

export const updateUserStatus = async (userId, payload) => {
  try {
    const token = localStorage.getItem("token");

    const response = await API.patch(
      `/api/v1/admin-management/users/${userId}/status`,
      payload,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    throw error.response?.data || "Status update failed";
  }
};


// ================= UPDATE USER ROLE =================

export const updateUserRole = async (userId, payload) => {
  try {
    const token = localStorage.getItem("token");

    const response = await API.patch(
      `/api/v1/admin-management/users/${userId}/role`,
      payload,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    throw error.response?.data || "Role update failed";
  }
};


// ================= SYSTEM HEALTH =================

export const getSystemHealth = async () => {
  try {
    const token = localStorage.getItem("token");

    const response = await API.get(
      "/api/v1/admin-management/system/health",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    throw error.response?.data || "Failed to fetch system health";
  }
};


// ================= SYSTEM SERVICES =================

export const getSystemServices = async () => {
  try {
    const token = localStorage.getItem("token");

    if (!token) {
      throw new Error("No auth token found");
    }

    const response = await API.get(
      "/api/v1/admin-management/system/services",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("getSystemServices error:", error);

    throw new Error(
      error?.response?.data?.message ||
      error?.message ||
      "Failed to fetch services"
    );
  }
};


// ================= getUserProfile =================

export const getUserProfile = async () => {
  try {
    const token = localStorage.getItem("token");

    const response = await API.get(
      "/api/v1/users/me/profile",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    throw error.response?.data || "Failed to fetch profile";
  }
};


// ================= UpadteUserProfile =================



export const updateUserProfile = async (payload) => {
  try {
    const token = localStorage.getItem("token");

    const response = await API.patch(
      "/api/v1/users/me/profile",
      payload,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("API Error:", error.response?.data);
    throw error;
  }
};

// ================= Avtar Profile =================

// ================= ONBOARDING AVATAR =================

export const uploadAvatar = async (file) => {
  try {
    const token = localStorage.getItem("token");

    const formData = new FormData();
    formData.append("file", file);

    const response = await API.post(
      "/api/v1/users/me/avatar",
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      }
    );

    return response.data;
  } catch (error) {
    throw error.response?.data || "Avatar upload failed";
  }
};


// ================= edit Avtar Profile =================

export const uploadProfileAvatar = async (file) => {
  try {
    const token = localStorage.getItem("token");

    const formData = new FormData();
    formData.append("file", file);

    const response = await API.post(
      "/api/v1/users/me/avatar",
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      }
    );

    return response.data;
  } catch (error) {
    throw error.response?.data || "Profile avatar upload failed";
  }
};

// ================= Delete Avtar Profile =================

export const deleteAvatar = async () => {
  try {
    const token = localStorage.getItem("token");

    const response = await API.delete(
      "/api/v1/users/me/avatar",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    throw error.response?.data || "Avatar delete failed";
  }
};


// ================= Get Preferences =================


// ================= ONBOARDING - AI PREFERENCES =================

export const saveAiPreferences = async (payload) => {
  try {
    const token = localStorage.getItem("token");

    const response = await API.post(
      "/api/v1/onboarding/preferences",
      payload,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    throw error.response?.data || "Failed to save AI preferences";
  }
};





// ================= ONBOARDING - NOTIFICATION SETTINGS =================

export const saveNotificationSettings = async (payload) => {
  try {
    const token = localStorage.getItem("token");

    const response = await API.post(
      "/api/v1/onboarding/notifications",
      payload,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    throw error.response?.data || "Failed to save notification settings";
  }
};


// =================update Notification Settings  =================


export const updateNotificationSettings = async (payload) => {
  try {
    const token = localStorage.getItem("token");

    const response = await API.patch(
      "/api/v1/users/me/notification-settings",
      payload,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    throw error.response?.data || "Failed to update notification settings";
  }
};


// ================= ONBOARDING - PERSONAL DETAILS =================

export const savePersonalDetails = async (payload) => {
  try {
    const token = localStorage.getItem("token");

    const response = await API.post(
      "/api/v1/onboarding/personal",
      payload,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    throw error.response?.data || "Failed to save personal details";
  }
};


// ================= AVAILABLE INTEGRATIONS =================

export const getAvailableIntegrations = async () => {
  try {
    const token = localStorage.getItem("token");

    const response = await API.get(
      "/api/v1/onboarding/integrations/available",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    throw error.response?.data || "Failed to fetch integrations";
  }
};


// ================= SAVE CONNECTED INTEGRATIONS =================

export const saveConnectedIntegrations = async (payload) => {
  try {
    const token = localStorage.getItem("token");

    const response = await API.post(
      "/api/v1/onboarding/integrations",
      payload,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    throw error.response?.data || "Failed to save integrations";
  }
};


export const getOnboardingSummary = async () => {
  try {
    const token = localStorage.getItem("token");

    const response = await API.get(
      "/api/v1/onboarding/summary",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    throw error.response?.data || "Failed to fetch onboarding summary";
  }
};

 // Save btn

export const completeOnboarding = async () => {
  try {
    const token = localStorage.getItem("token");

    const response = await API.post(
      "/api/v1/onboarding/complete",
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    throw error.response?.data || "Failed to complete onboarding";
  }
};


// Skip btn

export const skipOnboarding = async () => {
  try {
    const token = localStorage.getItem("token");

    const response = await API.post(
      "/api/v1/onboarding/skip",
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    throw error.response?.data || "Failed to skip onboarding";
  }
};



// ================= GET USER PREFERENCES =================

export const getUserPreferences = async () => {
  try {
    const token = localStorage.getItem("token");

    const response = await API.get(
      "/api/v1/users/me/preferences",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    throw error.response?.data || "Failed to fetch preferences";
  }
};


// ================= UPDATE USER PREFERENCES =================

export const updateUserPreferences = async (payload) => {
  try {
    const token = localStorage.getItem("token");

    const response = await API.patch(
      "/api/v1/users/me/preferences",
      payload,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    throw error.response?.data || "Failed to update preferences";
  }
};


// ================= COUNTRY CODES =================

export const getCountryCodes = async () => {
  try {
    const token = localStorage.getItem("token");

    const response = await API.get(
      "/api/v1/location/country-codes",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    throw error.response?.data || "Failed to fetch country codes";
  }
};


export const getLocations = async (limit = 20) => {
  const response = await API.get(
    `/api/v1/location/locations?limit=${limit}`
  );
  return response.data;
};




// ================= ADMIN PROFILE =================

// export const getAdminProfile = async () => {
//   try {
//     const token = localStorage.getItem("token");

//     const response = await API.get(
//       "/api/v1/admin/profile",
//       {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       }
//     );

//     return response.data;
//   } catch (error) {
//     throw error.response?.data || "Failed to fetch admin profile";
//   }
// };


// ================= UPDATE ADMIN PROFILE =================

export const updateAdminProfile = async (formData) => {
  try {
    const token = localStorage.getItem("token");

    const response = await API.put(
      "/api/v1/admin/profile",
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      }
    );

    return response.data;
  } catch (error) {
    throw error.response?.data || "Failed to update profile";
  }
};

// ================= CHANGE ADMIN PASSWORD =================

export const changeAdminPassword = async (passwordData) => {
  try {
    const token = localStorage.getItem("token");

    const response = await API.post(
      "/api/v1/users/me/change-password",
      passwordData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    throw error.response?.data || "Password change failed";
  }
};



// ================= PAYMENT REPORT KPIs =================

export const getPaymentReportKPIs = async (params = {}) => {
  try {
    const token = localStorage.getItem("token");

    const response = await API.get(
      "/api/v1/admin/payment-report/kpis",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params,
      }
    );

    return response.data;
  } catch (error) {
    throw error.response?.data || "Failed to fetch payment KPIs";
  }
};




// ================= PAYMENT TRANSACTIONS =================

export const getTransactions = async (params = {}) => {
  try {
    const token = localStorage.getItem("token");

    const response = await API.get(
      "/api/v1/admin/payment-report/transactions",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params,
      }
    );

    return response.data;
  } catch (error) {
    throw error.response?.data || "Failed to fetch transactions";
  }
};



export const getRevenueChart = async () => {
  const token = localStorage.getItem("token");

  const response = await axios.get(
    `${BASE_URL}/api/v1/admin-management/subscriptions/transactions/charts/revenue`,
    {
      params: {
        year: 2026,
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};


export const getSubscriptionTracking = async (params) => {
  const token = localStorage.getItem("token");

  const response = await API.get(
    "/api/v1/admin-management/subscriptions/tracking",
    {
      params,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};



export const getRefundKpis = async () => {
  const token = localStorage.getItem("token");

  const response = await API.get(
    "/api/v1/admin-management/subscriptions/refunds/kpis",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

export const getRefundList = async (params) => {
  const token = localStorage.getItem("token");

  const response = await API.get(
    "/api/v1/admin-management/subscriptions/refunds",
    {
      params,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

//  ADDED ENDPOINT FOR EXPORT BTN IN REFUND COMPONENT

export const exportRefunds = async (params) => {
  const token = localStorage.getItem("token");

  const response = await API.get(
    "/api/v1/admin-management/subscriptions/refunds/export",
    {
      params,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      responseType: "blob", // important for CSV download
    }
  );

  return response.data;
};




// ================= TRANSACTION KPIS =================

// ================= TRANSACTION KPIS =================

export const getTransactionKpis = async () => {
  try {
    const token = localStorage.getItem("token");

    const response = await API.get(
      "/api/v1/admin-management/subscriptions/transactions/kpis",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    throw error.response?.data || "Failed to fetch transaction KPIs";
  }
};

// ================= TRANSACTION DETAILS =================

export const getTransactionDetail = async (paymentId) => {
  try {
    const token = localStorage.getItem("token");

    const response = await API.get(
      `/api/v1/admin-management/subscriptions/transactions/${paymentId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    throw error.response?.data || "Failed to fetch transaction details";
  }
};




// ================= EXPORT TRANSACTIONS =================

export const exportTransactions = async () => {
  try {
    const token = localStorage.getItem("token");

    const response = await API.get(
      "/api/v1/admin-management/subscriptions/transactions/export",
      {
        responseType: "blob",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response;
  } catch (error) {
    throw error.response?.data || "Failed to export transactions";
  }
};


export const getSubscriptionTransactions = async (params = {}) => {
  try {
    const token = localStorage.getItem("token");

    const response = await API.get(
      "/api/v1/admin-management/subscriptions/transactions",
      {
        params,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    throw (
      error.response?.data ||
      "Failed to fetch subscription transactions"
    );
  }
};



// ================= CREATE CHECKOUT SESSION =================

export const createCheckoutSession = async (payload) => {
  try {
    const token = localStorage.getItem("token");

    const response = await API.post(
      "/api/v1/subscriptions/checkout",
      payload,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error(error.response?.data);
    throw error;   // <-- throw the original error
  }
};



export const downgradePlan = async (data) => {
  const token = localStorage.getItem("token");

  const res = await axios.post(
    "/api/v1/user/subscription/downgrade",
    data,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return res.data;
};


export const getSubscriptionDetails = async () => {
  try {
    const token = localStorage.getItem("token");

    const response = await API.get(
      "/api/v1/user/subscription/details",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("API Error:", error.response?.data);
    throw error;
  }
};


// =============== INOVICE ==================

export const getInvoice = async (paymentId) => {
  try {
    const token = localStorage.getItem("token");

    const response = await API.get(
      `/api/v1/user/subscription/invoice/${paymentId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Invoice API Error:", error.response?.data);
    throw error;
  }
};

//============= verify payment ============

export const verifyPayment = async (sessionId) => {
  const token = localStorage.getItem("token");

  const response = await fetch(
    `${BASE_URL}/api/v1/subscriptions/verify?session_id=${sessionId}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    }
  );

  if (!response.ok) {
    throw new Error("Payment verification failed");
  }

  return response.json();
};



// =================== Cancel subscription =================

export const cancelSubscription = async (data) => {
  try {
    const token = localStorage.getItem("token");

    const response = await API.post(
      "/api/v1/user/subscription/cancel",
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Cancel Subscription Error:", error.response?.data);
    throw error;
  }
};