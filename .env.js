const production = {
    ...process.env,
    NODE_ENV: process.env.NODE_ENV || 'production',
};

const development = {
    ...process.env,
    NODE_ENV: process.env.NODE_ENV || 'development',
    PORT: '9000',
    Meta_WA_accessToken:'EAAZA6LBt0ZBJQBAC7UP00V7AZA2iJlUGLPZBf1zDS3MDZCznHABDXr2SnN2iJLxIOw0NJZCooWUHFzi0KORYyY75lYXTAgSiqTavPw67VwZCdM1ld7YGSHaB0DQXESjIHFhM98cSQDusysLwLWjHXmpXv8WG71yP7GG8O6gk6JJoAgluGS5bj7XZC91a1BXVhRWm8hzi9Ew2DgZDZD',
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