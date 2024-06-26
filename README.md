## CodeSphereX: A NextJS-based Code Submission and Judging System


### Overview

CodeFusion is a NextJS-based code submission and judging system designed to facilitate the evaluation of user-submitted code against a set of test cases. The system utilizes a combination of NextJS, PostgreSQL, and Judge0 API to provide a seamless and efficient experience for users.


## System Design



### Frontend (NextJS)

1. User Interface: The frontend is built using NextJS, providing a user-friendly interface for users to write and submit their code.
2. POST Request: When a user clicks the submit button, a POST request is sent to the backend to enrich the code and add test cases.

### Backend (NextJS)

1. Code Enrichment: The backend receives the POST request and enriches the user-submitted code by adding necessary functions (e.g., main) and other required elements.
2. Test Case Addition: The enriched code is then added to the PostgreSQL database along with the corresponding test cases.
3. Judge0 API Integration: The code is sent to the Judge0 API server for execution in a sandboxed environment against the test cases.

### Judge0 API

1. Queue Management: The Judge0 API server manages a redis queue of submissions and executes them one by one.
2. Code Execution: Each submission is executed against the test cases, and the results are stored in the Judge0 API server.

### Webhook (Node.js)

1. Result Retrieval: The Judge0 API server sends the execution results to the webhook, which is a Node.js backend.
2. Database Update: The webhook updates the PostgreSQL database with the execution results.
3. Response Generation: The webhook generates a response to the user, which is then sent back to the frontend.

### Frontend (NextJS) - Webhook Interaction

1. Polling: The frontend continuously sends requests to the webhook for 25 seconds to retrieve the execution results.
2. Response Display: The frontend displays the response to the user, indicating the outcome of the code execution.
