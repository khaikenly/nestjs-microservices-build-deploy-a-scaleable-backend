import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Stripe from 'stripe';
import { PaymentsCreateChargeDto } from './dto/payments-create-charge.dto';

@Injectable()
export class PaymentsService {
  private readonly _stripe = new Stripe(
    this.configService.get('STRIPE_SECRET_KEY'),
    {
      apiVersion: '2022-11-15',
    },
  );

  constructor(private readonly configService: ConfigService) {}

  async createCharge({ card, amount, email }: PaymentsCreateChargeDto) {
    const paymentIntent = await this._stripe.paymentIntents.create({
      amount: amount * 100,
      confirm: true,
      payment_method_types: ['card'],
      payment_method: card.type,
      currency: 'usd',
      receipt_email: email,
    });

    return paymentIntent;
  }
}
