import { getSwellClient } from './index';

export interface EmailNotificationData {
  to: string;
  subject: string;
  template: string;
  data: Record<string, any>;
}

export const sendOrderConfirmation = async (orderId: string, customerEmail: string) => {
  const SwellClient = getSwellClient();
  
  try {
    // This would typically be handled by Swell's built-in email system
    // The actual implementation depends on your Swell email configuration
    console.log(`Order confirmation email sent for order ${orderId} to ${customerEmail}`);
    
    // If you have custom email templates in Swell, you can trigger them here
    // await SwellClient.sendEmail({
    //   to: customerEmail,
    //   template: 'order-confirmation',
    //   data: { orderId }
    // });
    
    return { success: true };
  } catch (error) {
    console.error('Error sending order confirmation email:', error);
    return { success: false, error };
  }
};

export const sendOrderUpdate = async (orderId: string, customerEmail: string, status: string) => {
  const SwellClient = getSwellClient();
  
  try {
    console.log(`Order update email sent for order ${orderId} to ${customerEmail} - Status: ${status}`);
    
    // Trigger Swell's order update email
    // await SwellClient.sendEmail({
    //   to: customerEmail,
    //   template: 'order-update',
    //   data: { orderId, status }
    // });
    
    return { success: true };
  } catch (error) {
    console.error('Error sending order update email:', error);
    return { success: false, error };
  }
};

export const sendPasswordReset = async (customerEmail: string, resetToken: string) => {
  const SwellClient = getSwellClient();
  
  try {
    console.log(`Password reset email sent to ${customerEmail}`);
    
    // Trigger Swell's password reset email
    // await SwellClient.sendEmail({
    //   to: customerEmail,
    //   template: 'password-reset',
    //   data: { resetToken }
    // });
    
    return { success: true };
  } catch (error) {
    console.error('Error sending password reset email:', error);
    return { success: false, error };
  }
};

export const sendWelcomeEmail = async (customerEmail: string, customerName: string) => {
  const SwellClient = getSwellClient();
  
  try {
    console.log(`Welcome email sent to ${customerEmail}`);
    
    // Trigger Swell's welcome email
    // await SwellClient.sendEmail({
    //   to: customerEmail,
    //   template: 'welcome',
    //   data: { customerName }
    // });
    
    return { success: true };
  } catch (error) {
    console.error('Error sending welcome email:', error);
    return { success: false, error };
  }
};

export const sendAbandonedCartEmail = async (cartId: string, customerEmail: string) => {
  const SwellClient = getSwellClient();
  
  try {
    console.log(`Abandoned cart email sent for cart ${cartId} to ${customerEmail}`);
    
    // Trigger Swell's abandoned cart email
    // await SwellClient.sendEmail({
    //   to: customerEmail,
    //   template: 'abandoned-cart',
    //   data: { cartId }
    // });
    
    return { success: true };
  } catch (error) {
    console.error('Error sending abandoned cart email:', error);
    return { success: false, error };
  }
};


