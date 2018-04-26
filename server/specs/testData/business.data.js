export default {
   validData1: {
    businessName: 'SlimTrader',
    email: 'slimtrader@gmail.com',
    category: 'IT',
    location: 'Lagos',
    address: '123 V.I Lagos',
    businessImage: 'business picture',
    aboutUs: 'Business Details must be between 20 to 1000 characters',
   },
   validData2: {
    businessName: 'gtbank',
    email: 'gtb@gmail.com',
    category: 'Finance',
    location: 'Lagos',
    address: '123 V.I Lagos',
    businessImage: 'business picture',
    aboutUs: 'Business Details must be between 20 to 1000 characters',
   },
   validUpdate1: {
    businessName: 'shell',
    email: 'shell@gmail.com',
    category: 'Engr',
    location: 'Rivers',
    address: '123 V.I Ph',
    businessImage: 'business picture',
    aboutUs: 'Business Details must be between 20 to 1000 characters',
   },
   validUpdate2: {
    businessName: 'HNN',
    email: 'hnn@gmail.com',
    category: 'IT',
    location: 'USA',
    address: '123 V.I Seatle',
    businessImage: 'business picture',
    aboutUs: 'Business Details must be between 20 to 1000 characters',
   },
   invalidUpdate1: {
    businessName: '12gtbank',
    email: 'gtb@gmail.com',
    category: 'finance',
    address: '123 V.I Lagos',
    location: 'Lagos',
    businessImage: 'mypic',
    aboutUs: 'Business Details must be between 20 to 1000 characters'
   },
   invalidUpdate2: {
    businessName: 'a',
    email: 'gtb@gmail.com',
    category: 'finance',
    address: '123 V.I Lagos',
    location: 'Lagos',
    businessImage: 'mypic',
    aboutUs: 'less than 20'
   },
   emptyData: {
    businessName: '',
    email: '',
    category: '',
    address: '',
    location: '',
    businessImage: '',
    aboutUs: ''
   },
   invalidData: {
    businessName: '12gtbank',
    email: 'gtb@gmail',
    category: 'finance',
    address: '123 V.I Lagos',
    location: 'Lagos',
    businessImage: 'mypic',
    aboutUs: 'less than 20'
   },
   incompleteData: {
    businessName: 'a',
    email: 'gtb@gmail',
    category: 'finance',
    address: '123 V.I Lagos',
    location: 'Lagos',
    businessImage: 'mypic',
    aboutUs: 'less than 20'
   }
};