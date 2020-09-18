//Status info retrieved from: https://api.judge0.com/statuses
//TODO: We might want to write code to get status info from api and put them into db
const statusId = {
  IN_QUEUE: 1,
  PROCESSING: 2,
  ACCEPTED: 3,
  WRONG_ANSWER: 4,
  TIME_LIMIT_EXCEEDED: 5,
  COMPILATION_ERROR: 6,
  RUNTIME_ERROR_SIGSEGV: 7,
  RUNTIME_ERROR_SIGXFSZ: 8,
  RUNTIME_ERROR_SIGFPE: 9,
  RUNTIME_ERROR_SIGABRT: 10,
  RUNTIME_ERROR_NZEC: 11,
  RUNTIME_ERROR_OTHER: 12,
  INTERNAL_ERROR: 13,
  EXEC_FORMAT_ERROR: 14,
  RUNTIME_ERROR_GENERAL: 15,
  RUNTIME_ERRORS: [7,8,9,10,11,12, 15],
}
const statusMap = {
  [statusId.IN_QUEUE]: {
    "id": 1,
    "description": "In Queue"
  },
  [statusId.PROCESSING]: {
    "id": 2,
    "description": "Processing"
  },
  [statusId.ACCEPTED]: {
    "id": 3,
    "description": "Accepted"
  },
  [statusId.WRONG_ANSWER]: {
    "id": 4,
    "description": "Wrong Answer"
  },
  [statusId.TIME_LIMIT_EXCEEDED]: {
    "id": 5,
    "description": "Time Limit Exceeded"
  },
  [statusId.COMPILATION_ERROR]: {
    "id": 6,
    "description": "Compilation Error"
  },
  [statusId.RUNTIME_ERROR_SIGSEGV]: {
    "id": 7,
    "description": "Runtime Error (SIGSEGV)"
  },
  [statusId.RUNTIME_ERROR_SIGXFSZ]: {
    "id": 8,
    "description": "Runtime Error (SIGXFSZ)"
  },
  [statusId.RUNTIME_ERROR_SIGFPE]: {
    "id": 9,
    "description": "Runtime Error (SIGFPE)"
  },
  [statusId.RUNTIME_ERROR_SIGABRT]: {
    "id": 10,
    "description": "Runtime Error (SIGABRT)"
  },
  [statusId.RUNTIME_ERROR_NZEC]: {
    "id": 11,
    "description": "Runtime Error (NZEC)"
  },
  [statusId.RUNTIME_ERROR_OTHER]: {
    "id": 12,
    "description": "Runtime Error (Other)"
  },
  [statusId.INTERNAL_ERROR] : {
    "id": 13,
    "description": "Internal Error"
  },
  [statusId.EXEC_FORMAT_ERROR]: {
    "id": 14,
    "description": "Exec Format Error"
  },
  [statusId.RUNTIME_ERROR_GENERAL]: {
    "id": 15,
    "description": "Runtime Error"
  }
}

// Laguanges can be retrieved from this: https://api.judge0.com/languages/
// TODO: We might want to write code to get languages info from api and put them in db
const languageMap = [
  {
    "id": 45,
    "name": "Assembly (NASM 2.14.02)"
  },
  {
    "id": 46,
    "name": "Bash (5.0.0)"
  },
  {
    "id": 47,
    "name": "Basic (FBC 1.07.1)"
  },
  {
    "id": 48,
    "name": "C (GCC 7.4.0)"
  },
  {
    "id": 52,
    "name": "C++ (GCC 7.4.0)"
  },
  {
    "id": 49,
    "name": "C (GCC 8.3.0)"
  },
  {
    "id": 53,
    "name": "C++ (GCC 8.3.0)"
  },
  {
    "id": 50,
    "name": "C (GCC 9.2.0)"
  },
  {
    "id": 54,
    "name": "C++ (GCC 9.2.0)"
  },
  {
    "id": 51,
    "name": "C# (Mono 6.6.0.161)"
  },
  {
    "id": 55,
    "name": "Common Lisp (SBCL 2.0.0)"
  },
  {
    "id": 56,
    "name": "D (DMD 2.089.1)"
  },
  {
    "id": 57,
    "name": "Elixir (1.9.4)"
  },
  {
    "id": 58,
    "name": "Erlang (OTP 22.2)"
  },
  {
    "id": 44,
    "name": "Executable"
  },
  {
    "id": 59,
    "name": "Fortran (GFortran 9.2.0)"
  },
  {
    "id": 60,
    "name": "Go (1.13.5)"
  },
  {
    "id": 61,
    "name": "Haskell (GHC 8.8.1)"
  },
  {
    "id": 62,
    "name": "Java (OpenJDK 13.0.1)"
  },
  {
    "id": 63,
    "name": "JavaScript (Node.js 12.14.0)"
  },
  {
    "id": 64,
    "name": "Lua (5.3.5)"
  },
  {
    "id": 65,
    "name": "OCaml (4.09.0)"
  },
  {
    "id": 66,
    "name": "Octave (5.1.0)"
  },
  {
    "id": 67,
    "name": "Pascal (FPC 3.0.4)"
  },
  {
    "id": 68,
    "name": "PHP (7.4.1)"
  },
  {
    "id": 43,
    "name": "Plain Text"
  },
  {
    "id": 69,
    "name": "Prolog (GNU Prolog 1.4.5)"
  },
  {
    "id": 70,
    "name": "Python (2.7.17)"
  },
  {
    "id": 71,
    "name": "Python (3.8.1)"
  },
  {
    "id": 72,
    "name": "Ruby (2.7.0)"
  },
  {
    "id": 73,
    "name": "Rust (1.40.0)"
  },
  {
    "id": 74,
    "name": "TypeScript (3.7.4)"
  }
]


module.exports = {
    statusMap,
    languageMap,
    statusId
};