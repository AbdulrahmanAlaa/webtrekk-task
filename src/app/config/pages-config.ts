export const pages = {
    customerManagement:{
        path:'customers',
        loadChildren: 'src/app/customer-management/customer-management.module#CustomerManagementModule',
        children:{
            list:{
                path:''
            },
            add:{
                path:'add'
            },
            edit:{
                path:':id'
            },
            delete:{
                path:'delete/:id'
            }

        }
    }
};