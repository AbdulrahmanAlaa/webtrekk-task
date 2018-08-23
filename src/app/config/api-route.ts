import { environment } from '../../environments/environment';

export const API_ROUTES = {
    // CUSTOMERS MODULE
    'GET_CUSTOMERS': `${environment.apiBaseUrl}/customers`,
    'GET_CUSTOMER_BY_ID': (customer_id) => `${environment.apiBaseUrl}/customers/${customer_id}`,
    'DELETE_CUSTOMER_BY_ID': (customer_id) => `${environment.apiBaseUrl}/customers/${customer_id}`,
    'CREATE_CUSTOMER': `${environment.apiBaseUrl}/customers`,
    'UPDATE_CUSTOMER': `${environment.apiBaseUrl}/customers`,

    // Login
    'POST_LOGIN': `${environment.apiBaseUrl}/auth/login`,

    // Register
    'POST_REGISTER': `${environment.apiBaseUrl}/auth/register`


};
