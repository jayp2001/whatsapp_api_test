const production = {
    ...process.env,
    NODE_ENV: process.env.NODE_ENV || 'production',
};

const development = {
    ...process.env,
    NODE_ENV: process.env.NODE_ENV || 'development',
    PORT: '9000',
    Meta_WA_accessToken:'EAAZA6LBt0ZBJQBAErpjp0Clf7NIXTXkZCZBsF9ZAMdntZCQQAtoulbVRRUpSAWEfM5d7p17KxqDuAHXrn1UGDSmohbNS6K5aY5H7w9cL4k1MT7ZCvj6IslHE8gna9aVamxXZBczMHyyYwTicAZB0WpVl70ANExcUOeJrDpNZBJHZCLKO1RZBKo3OuBeswZCLxZCZA7SYQkRpGDp5pWNcwZDZD',
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