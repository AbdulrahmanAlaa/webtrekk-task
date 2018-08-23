/**
 * holds all application routes that could be replaced in future with out cracking
 * the app
 */
export const pages = {
    customerManagement: {
        path: 'customers',
        loadChildren: 'src/app/customer-management/customer-management.module#CustomerManagementModule',
        children: {
            list: {
                path: ''
            },
            add: {
                path: 'add'
            },
            edit: {
                path: ':id'
            },
            delete: {
                path: 'delete/:id'
            }

        }
    },
    auth: {
        login: {
            path: 'login'
        },
        register: {
            path: 'register'
        },
        social: {
            facebook: {
                path: 'facebook/:token'
            },
            google: {
                path: 'google/:token'
            },
            twitter: {
                path: 'twitter/:token'
            },
            linkedin: {
                path: 'linkedin/:token'
            }
        }
    }
};
