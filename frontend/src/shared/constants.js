export const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:5000/";
export const LOGIN_URL = BASE_URL + "api/login";
export const USER_URL = BASE_URL + "api/user";
export const COURSE_URL = BASE_URL + "api/courses";
export const STATISTIC_URL = BASE_URL + "api/statistic";
export const PROBLEM_URL = BASE_URL + "api/courses/:courseId/problems";
export const SUBMISSION_URL = BASE_URL + "api/courses/:courseId/problems/:problemId/submissions";
