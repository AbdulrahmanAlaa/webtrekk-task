export const pages = {
    customerManagement:{
        path:'customers',
        loadChildren: 'src/app/customer-management/customer-management.module#CustomerManagementModule'
    }
};