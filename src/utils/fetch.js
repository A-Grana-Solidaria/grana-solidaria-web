/* eslint-disable import/no-anonymous-default-export */
import axios from "axios";

export function fazerRequisicaoComBody(url, metodo, conteudo) {
  return fetch(url, {
    method: metodo,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(conteudo),
  });
}

let API = axios.create({
  // baseURL: process.env.REACT_APP_API_BASE_ENDPOINT,
  baseURL: "https://grana-solidaria-server-dev.azurewebsites.net/",
  headers: { Authorization: "Bearer " + localStorage.getItem("token") },
});

export default {
  updateAuthorization: (token) => {
    localStorage.setItem("token", token);

    API = axios.create({
      // baseURL: process.env.REACT_APP_API_BASE_ENDPOINT,
      baseURL: "https://grana-solidaria-server-dev.azurewebsites.net/",
      headers: { Authorization: "Bearer " + localStorage.getItem("token") },
    });
  },

  getToken: () => localStorage.getItem("token"),

  auth: (email, password) =>
    API.post("auth", {
      email,
      password,
    }),

  supporter: (formData) => API.post("supporter", formData),

  dreamer: (formData) => API.post("dreamer", formData),

  company: (formData) => {
    console.log("chegou aquiiii");
    API.post("company", formData)
  },

  saveCompanyDataOnCache : (formData) => {
    localStorage.setItem("FormData", JSON.stringify(formData));
  },

  dreamerGet: () => API.get("dreamerGet"),

  registerDream: (
    question1_status,
    question2_status,
    question3_status,
    question4_status,
    question5_status,
    question6_status,
    estimatedCashGoal,
    description,
    type
  ) =>
    API.post("dreams", {
      question1_status,
      question2_status,
      question3_status,
      question4_status,
      question5_status,
      question6_status,
      estimatedCashGoal,
      description,
      type,
    }),

  dreams: (offset) => API.get(`dreams?offset=${offset}`),

  dreamById: (id) => API.get(`dreams/${id}`),

  emailConfirmation: (token) => API.get(`confirmation/${token}`),

  supportDream: (id, totalQuotas) =>
    API.post(`support/${id}`, { totalQuotas: totalQuotas }),

  recoverPassword: (email) => API.post("requestpassword", { email }),

  resetPassword: (token, newPassword) =>
    API.post(`resetpassword/${token}`, {
      newPassword,
    }),
};
