import React, { FC } from 'react';
import GooglePayButton from '@google-pay/button-react';

interface GooglePaymentButtonProps {
  totalPrice: string;
  currencyCode: string;
  onSuccessfulPayment?: (data: any) => void;
}

const GooglePaymentButton: FC<GooglePaymentButtonProps> = ({
  totalPrice = '0',
  currencyCode = 'USD',
  onSuccessfulPayment,
}) => {
  return (
    <GooglePayButton
      environment="TEST"
      buttonType="pay"
      buttonColor="black"
      buttonSizeMode="static"
      paymentRequest={{
        apiVersion: 2,
        apiVersionMinor: 0,
        allowedPaymentMethods: [
          {
            type: 'CARD',
            parameters: {
              allowedAuthMethods: ['PAN_ONLY', 'CRYPTOGRAM_3DS'],
              allowedCardNetworks: ['MASTERCARD', 'VISA'],
            },
            tokenizationSpecification: {
              type: 'PAYMENT_GATEWAY',
              parameters: {
                gateway: 'example',
                gatewayMerchantId: 'exampleGatewayMerchantId',
              },
            },
          },
        ],
        merchantInfo: {
          merchantId: '12345678901234567890',
          merchantName: 'Demo Merchant',
        },
        transactionInfo: {
          totalPriceStatus: 'FINAL',
          totalPriceLabel: 'Total',
          totalPrice,
          currencyCode,
          countryCode: 'US',
        },
        callbackIntents: ['PAYMENT_AUTHORIZATION'],
      }}
      onLoadPaymentData={(paymentRequest) => {
        onSuccessfulPayment && onSuccessfulPayment(paymentRequest);
        console.log('load payment data', paymentRequest);
      }}
      onPaymentAuthorized={(paymentData) => {
        return { transactionState: 'SUCCESS' };
      }}
    />
  );
};

export default GooglePaymentButton;
