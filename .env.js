const production = {
    ...process.env,
    NODE_ENV: process.env.NODE_ENV || 'production',
};

const development = {
    ...process.env,
    NODE_ENV: process.env.NODE_ENV || 'development',
    PORT: '9000',
    Meta_WA_accessToken:'EAAZA6LBt0ZBJQBAFF4sZBMsZBNdjFB6GRjS3kuxUk2ZAgbkOh6HdyzC581yQZCRwPgamEXbIunXHK7XoMICVHzmwN5379IqbXp1Do2xmNnURfh0PUZCIZCXVp5SLZAbYF5VM7So6jC88FGsVr7XVMsAkZA0UIwZBsDRCEevDmZB9sZBmslIgHlWz2wZBgCWXrWNzdC6exfzNE2NMBWDQZDZD',
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