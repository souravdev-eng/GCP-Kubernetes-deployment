import { ProductCreatedEvent } from './../types/product-created-event';
import { Publisher } from '../base-publisher';
import { Subjects } from '../subjects';

export class ProductCreatedPublished extends Publisher<ProductCreatedEvent> {
  subject: Subjects.ProductCreated = Subjects.ProductCreated;
}
