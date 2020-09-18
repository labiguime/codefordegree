export const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:5000/";
export const LOGIN_URL = BASE_URL + "api/login";
export const USER_URL = BASE_URL + "api/user";
export const COURSE_URL = BASE_URL + "api/courses";
export const STATISTIC_URL = BASE_URL + "api/statistic";
export const PROBLEM_URL = BASE_URL + "api/courses/:courseId/problems";
export const SUBMISSION_URL = BASE_URL + "api/courses/:courseId/problems/:problemId/submissions";
export const languageMap = {
        "javascript": 63,
        "c_cpp": 53,
        "python": 71, //python 3
        63: "javascript",
        53: "c_cpp",
        71: "python"
};
export const languagePlaceHolder = {
    "javascript": `console.log("Hello world")`,
    "c_cpp": `#include <iostream>
using namespace std;
int main() {
	// your code goes here
	return 0;
}`,
    "python": `print("Hello world")`
}
