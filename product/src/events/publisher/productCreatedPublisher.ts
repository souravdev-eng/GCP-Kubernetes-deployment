import { ProductCreatedEvent, Publisher, Subjects } from '@ecom-micro/common';

export class ProductCreateEvent extends Publisher<ProductCreatedEvent> {
  subject: Subjects.ProductCreated = Subjects.ProductCreated;
}
