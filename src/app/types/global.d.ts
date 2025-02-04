declare module 'sslcommerz-lts' {
//   interface SSLCommerzConfig {
//     store_id: string;
//     store_passwd: string;
//     is_live: boolean;
//   }

  interface PaymentData {
    total_amount: number;
    currency: string;
    tran_id: string;
    success_url: string;
    fail_url: string;
    cancel_url: string;
    cus_name: string;
    cus_email: string;
    cus_phone: string;
    product_name: string;
    product_category: string;
    product_profile: string;
  }

  interface PaymentResponse {
    GatewayPageURL: string;
  }

  class SSLCommerz {
    // eslint-disable-next-line no-unused-vars
    constructor(storeId: string, storePassword: string, isLive: boolean);
    // eslint-disable-next-line no-unused-vars
    init(paymentData: PaymentData): Promise<PaymentResponse>;
  }

  export = SSLCommerz;
}
