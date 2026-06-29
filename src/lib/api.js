import { API_URL } from "./utils";

async function fetchAPI(endpoint, options = {}) {
  const { params, ...fetchOpts } = options;
  let url = `${API_URL}${endpoint}`;

  if (params) {
    const searchParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined) searchParams.append(key, String(value));
    });
    const queryString = searchParams.toString();
    if (queryString) url += `?${queryString}`;
  }

  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;

  const res = await fetch(url, {
    ...fetchOpts,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...fetchOpts.headers,
    },
    credentials: "include",
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Something went wrong");
  }

  return data;
}

export const authAPI = {
  register: (body) => fetchAPI("/auth/register", { method: "POST", body: JSON.stringify(body) }),
  login: (body) => fetchAPI("/auth/login", { method: "POST", body: JSON.stringify(body) }),
  googleLogin: (credential) => fetchAPI("/auth/google", { method: "POST", body: JSON.stringify({ credential }) }),
  logout: () => fetchAPI("/auth/logout", { method: "POST" }),
  getMe: () => fetchAPI("/auth/me"),
};

export const startupAPI = {
  getAll: (params) => fetchAPI("/startups/all", { params }),
  getById: (id) => fetchAPI(`/startups/${id}`),
  create: (body) => fetchAPI("/startups", { method: "POST", body: JSON.stringify(body) }),
  getMy: () => fetchAPI("/startups"),
  update: (body) => fetchAPI("/startups", { method: "PUT", body: JSON.stringify(body) }),
  delete: () => fetchAPI("/startups", { method: "DELETE" }),
};

export const opportunityAPI = {
  getAll: (params) => fetchAPI("/opportunities/all", { params }),
  getById: (id) => fetchAPI(`/opportunities/${id}`),
  create: (body) => fetchAPI("/opportunities", { method: "POST", body: JSON.stringify(body) }),
  getMy: () => fetchAPI("/opportunities"),
  getStats: () => fetchAPI("/opportunities/stats/overview"),
  update: (id, body) => fetchAPI(`/opportunities/${id}`, { method: "PUT", body: JSON.stringify(body) }),
  delete: (id) => fetchAPI(`/opportunities/${id}`, { method: "DELETE" }),
};

export const applicationAPI = {
  apply: (body) => fetchAPI("/applications", { method: "POST", body: JSON.stringify(body) }),
  getMy: () => fetchAPI("/applications/my"),
  getFounder: () => fetchAPI("/applications/founder"),
  updateStatus: (id, status) => fetchAPI(`/applications/${id}/status`, { method: "PUT", body: JSON.stringify({ status }) }),
};

export const userAPI = {
  getProfile: () => fetchAPI("/users/profile"),
  updateProfile: (body) => fetchAPI("/users/profile", { method: "PUT", body: JSON.stringify(body) }),
};

export const paymentAPI = {
  createCheckout: () => fetchAPI("/payments/create-checkout", { method: "POST" }),
  success: (session_id) => fetchAPI(`/payments/success?session_id=${session_id}`),
};

export const adminAPI = {
  getOverview: () => fetchAPI("/admin/overview"),
  getUsers: () => fetchAPI("/admin/users"),
  toggleBlock: (id) => fetchAPI(`/admin/users/${id}/block`, { method: "PUT" }),
  getStartups: () => fetchAPI("/admin/startups"),
  approveStartup: (id) => fetchAPI(`/admin/startups/${id}/approve`, { method: "PUT" }),
  removeStartup: (id) => fetchAPI(`/admin/startups/${id}`, { method: "DELETE" }),
  getTransactions: () => fetchAPI("/admin/transactions"),
};
