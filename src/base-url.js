let isDeployment = false;
let baseURL = ''

if (isDeployment) {
    baseURL = 'VPS URL HERE';
} else {
    baseURL = 'http://localhost:8080';
}

export { baseURL };