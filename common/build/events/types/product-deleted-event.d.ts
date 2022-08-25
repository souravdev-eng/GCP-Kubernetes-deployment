import { Subjects } from './subjects';
export interface ProductDeletedEvent {
    subject: Subjects.ProductDeleted;
    data: {
        id: string;
        name: string;
        price: number;
        userId: string;
    };
}
