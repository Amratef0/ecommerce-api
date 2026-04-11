const welcomeEmail = (name) => `
<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
    <h1 style="color: #4CAF50;">Welcome to Our Store! 🎉</h1>
    <p>Hi <strong>${name}</strong>,</p>
    <p>Thank you for registering with us. We're glad to have you!</p>
    <p>Start shopping now and enjoy our amazing products.</p>
    <br/>
    <p>Best Regards,</p>
    <p><strong>Ecommerce Team</strong></p>
</div>
`;

const orderConfirmationEmail = (name, order) => `
<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
    <h1 style="color: #4CAF50;">Order Confirmed! 🛍️</h1>
    <p>Hi <strong>${name}</strong>,</p>
    <p>Your order has been placed successfully!</p>
    <h3>Order Details:</h3>
    <p><strong>Order ID:</strong> ${order._id}</p>
    <p><strong>Total Price:</strong> ${order.totalPrice} EGP</p>
    <p><strong>Status:</strong> ${order.status}</p>
    <h3>Shipping Address:</h3>
    <p>${order.shippingAddress.street}, ${order.shippingAddress.city}, ${order.shippingAddress.country}</p>
    <br/>
    <p>Best Regards,</p>
    <p><strong>Ecommerce Team</strong></p>
</div>
`;

const paymentConfirmationEmail = (name, order) => `
<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
    <h1 style="color: #4CAF50;">Payment Successful! 💳</h1>
    <p>Hi <strong>${name}</strong>,</p>
    <p>Your payment has been processed successfully!</p>
    <p><strong>Order ID:</strong> ${order._id}</p>
    <p><strong>Amount Paid:</strong> ${order.totalPrice} EGP</p>
    <br/>
    <p>Best Regards,</p>
    <p><strong>Ecommerce Team</strong></p>
</div>
`;

const orderCancelledEmail = (name, order) => `
<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
    <h1 style="color: #f44336;">Order Cancelled ❌</h1>
    <p>Hi <strong>${name}</strong>,</p>
    <p>Your order has been cancelled.</p>
    <p><strong>Order ID:</strong> ${order._id}</p>
    <p><strong>Total Price:</strong> ${order.totalPrice} EGP</p>
    <br/>
    <p>If you have any questions, please contact us.</p>
    <p>Best Regards,</p>
    <p><strong>Ecommerce Team</strong></p>
</div>
`;

const forgotPasswordEmail = (name, resetUrl) => `
<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
    <h1 style="color: #2196F3;">Reset Your Password 🔑</h1>
    <p>Hi <strong>${name}</strong>,</p>
    <p>You requested to reset your password. Click the button below:</p>
    <a href="${resetUrl}" style="background-color: #2196F3; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Reset Password</a>
    <p>This link will expire in <strong>1 hour</strong>.</p>
    <p>If you didn't request this, ignore this email.</p>
    <br/>
    <p>Best Regards,</p>
    <p><strong>Ecommerce Team</strong></p>
</div>
`;

module.exports = { welcomeEmail, orderConfirmationEmail, paymentConfirmationEmail, orderCancelledEmail, forgotPasswordEmail };