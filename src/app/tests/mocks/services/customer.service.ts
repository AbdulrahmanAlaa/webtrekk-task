import { of } from 'rxjs';

export class CustomersServiceMock {
    getCustomers() {
        return of([]);
    }
}
