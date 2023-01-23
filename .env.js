const production = {
    ...process.env,
    NODE_ENV: process.env.NODE_ENV || 'production',
};

const development = {
    ...process.env,
    NODE_ENV: process.env.NODE_ENV || 'development',
    PORT: '9000',
    Meta_WA_accessToken:'EAAZA6LBt0ZBJQBAKJsYj458lhbEas5RLpUyHWt5pUZCJSw9JnZBxZCZB0zr3IKooLAaN4Ej0C7Knt7ajfCZBDzHJIVcOV9JwoyDuv3ZCJmKGGRk1wJZAkEUejOglFty5hbrmDNiuZB0obMju4d8oiELtI8mf1EoCxI435DtDBlpM3lfq9iuiVYlAJgdnChugXfPfkR2I5RGZBTAXAZDZD',
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