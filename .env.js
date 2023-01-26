const production = {
    ...process.env,
    NODE_ENV: process.env.NODE_ENV || 'production',
};

const development = {
    ...process.env,
    NODE_ENV: process.env.NODE_ENV || 'development',
    PORT: '9000',
    Meta_WA_accessToken:'EAAZA6LBt0ZBJQBAHD3fPeuGM2LhtxGUYG3LCwZBOX4JFiK164iRdGP39ZAY7q3YPH2iy2BsOG8gpyShadAKZClBMvFlgmatlbeW8yHY6cLJBFp6bYYU8ecGVbU8Aawvxau2Nn99lQNSsZC5ZB1gC0t5EwC6BFLDpz8cwDzwc4e3kA5S5XGor6RMYFZCk3HwmjH0HybsHq1IsJQZDZD',
    Meta_WA_SenderPhoneNumberId: '110836215242868',
    Meta_WA_wabaId: '105361492465196',
    Meta_WA_VerifyToken: 'jay',
};

const fallback = {
    ...process.env,
    NODE_ENV: undefined,
};

module.exports = (environment) => {
    console.log(`Execution environment selected is: "${environment}"`);
    if (environment === 'production') {
        return production;
    } else if (environment === 'development') {
        return development;
    } else {
        return fallback;
    }
};