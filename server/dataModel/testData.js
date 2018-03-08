const userDb = [
    {
        id: 1,
        userName: 'Pascal',
        password: '123'
    },
    {
        id: 2,
        userName: 'Emeka',
        password: '453'
    }
];

const businessData = [
    {
        id: 1,
        businessName: 'SlimTrader',
        email: 'slimtrader@gmail.com',
        category: 'IT',
        Address: '123 V.I Lagos',
        location: 'Lagos',
        city: 'Island'
    },
    {
        id: 2,
        businessName: 'interswitch',
        email: 'interswitch@gmail.com',
        category: 'finance',
        Address: '40 V.I Lagos',
        location: 'Lagos',
        city: 'Island'
    }
];

const reviewsData = [
    {
        id: 1,
        reviewDetail: 'Quality',
        userId: 3,
        businessId: 1
    },
    {
        id: 2,
        reviewDetail: 'Impressive',
        userId: 3,
        businessId: 1
    },
    {
        id: 3,
        reviewDetail: 'Nice',
        userId: 3,
        businessId: 3
    },
    {
        id: 4,
        reviewDetail: 'Bad',
        userId: 1,
        businessId: 2
    },
    {
        id: 5,
        reviewDetail: 'Favourable',
        userId: 1,
        businessId: 2
    },
    {
        id: 6,
        reviewDetail: 'excellent',
        userId: 1,
        businessId: 2
    },
    {
        id: 7,
        reviewDetail: 'Great',
        userId: 1,
        businessId: 2
    }
];
export { userDb, businessData, reviewsData };