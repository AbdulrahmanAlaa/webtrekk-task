declare interface Customer{
    customerID:number;
    name:{
        first:string,
        last:string
    },
    birthday: string;
    gender: string;
    lastContact: string;
    customerLifetimeValue: number;
    customerImage?:{
        name:string,
        value:string
    }
} 