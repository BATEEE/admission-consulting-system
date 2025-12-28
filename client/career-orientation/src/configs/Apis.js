import axios from "axios";
import cookie from "react-cookies";

const BASE_URL = "http://localhost:4000/career-service";
// const BASE_URL = "https://admission-consulting-system.onrender.com/career-service";

export const endpoints = {
  blocks: "/blocks",
  "blocks-with-subjects": "/blocks/with-subjects",

  majorgroups: "/majorgroups",

  questions: "/questions",
  "questions-random": "/questions/random",

  answers: "/answers",
  "answers-by-question": (questionId) => `/questions/${questionId}/answers`,

  traits: "/traits",

  occupations: "/occupations",
  "occupations-by-holland-code": (hollandCode) => `/occupations/holland/${hollandCode}`,

  "holland-result": "/quiz-attempts",

  schools: "/schools",

  benmark: "/admission-scores",
  "benmark-suitable-schools": "/admission-scores/suitable",

  users: "/users",

  statistics: "/statistics",

  login: "/auth/login",
  register: "/auth/register",
  profile: "/auth/profile",
};

export const authApis = () => {
  let token = cookie.load("token");
  return axios.create({
    baseURL: BASE_URL,
    headers: token
      ? {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        }
      : { "Content-Type": "application/json" },
  });
};

export default axios.create({
  baseURL: BASE_URL,
});
