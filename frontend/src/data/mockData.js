export const CURRENT_USER = {
    name: 'Tharun Varshan',
    mobile: '9876543210',
    balance: 129.00,
    dataBalance: '1.5 GB',
    validity: '5 Days',
    plan: 'Unlimited Calls + 1.5GB/Day',
    operator: 'Airtel'
};

export const RECHARGE_PLANS = [
    {
        id: 1,
        price: 299,
        validity: '28 Days',
        data: '1.5 GB/Day',
        voice: 'Unlimited',
        sms: '100/Day',
        description: 'Truly Unlimited Calls + 1.5GB Data/Day',
        tag: 'Bestseller'
    },
    {
        id: 2,
        price: 479,
        validity: '56 Days',
        data: '1.5 GB/Day',
        voice: 'Unlimited',
        sms: '100/Day',
        description: 'Truly Unlimited Calls + 1.5GB Data/Day',
        tag: 'Popular'
    },
    {
        id: 3,
        price: 719,
        validity: '84 Days',
        data: '2 GB/Day',
        voice: 'Unlimited',
        sms: '100/Day',
        description: 'Truly Unlimited Calls + 2GB Data/Day'
    },
    {
        id: 4,
        price: 1799,
        validity: '365 Days',
        data: '24 GB',
        voice: 'Unlimited',
        sms: '3600',
        description: 'Truly Unlimited Calls + 24GB Data'
    },
    {
        id: 5,
        price: 19,
        validity: '1 Day',
        data: '1 GB',
        voice: 'NA',
        sms: 'NA',
        description: 'Data Booster Pack'
    }
];

export const HISTORY_DATA = [
    { id: 101, date: '2023-10-15', amount: 299, status: 'Success', operator: 'Airtel' },
    { id: 102, date: '2023-09-15', amount: 299, status: 'Success', operator: 'Airtel' },
    { id: 103, date: '2023-08-15', amount: 299, status: 'Success', operator: 'Airtel' },
    { id: 104, date: '2023-07-20', amount: 19, status: 'Failed', operator: 'Airtel' },
];

export const ADMIN_STATS = {
    totalUsers: 12450,
    totalRevenue: 4500000,
    activePlans: 15,
    pendingIssues: 3
};
