import { Message } from 'node-nats-streaming';
import { ProductCreatedEvent } from '../types/product-created-event';
import { Listener } from '../base-listener';
import { Subjects } from '../subjects';

export class ProductCreatedListener extends Listener<ProductCreatedEvent> {
  subject: Subjects.ProductCreated = Subjects.ProductCreated;
  queueGroupName = 'payment-service';

  onMessage(data: ProductCreatedEvent['data'], msg: Message) {
    console.log('Event data', data);
    msg.ack();
  }
}
