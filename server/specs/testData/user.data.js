export default {
    validInput1: {
      fullName: 'Bruce Banner',
      email: 'banner@yahoo.com',
      userName: 'hulk',
      password: 'bruce banner',
      location: 'newyork',
      profileImage: 'mypix',
      aboutMe: 'I am hulk of the Avengers'
    },
    validInput2: {
       fullName: 'Mike',
       email: 'mk@yahoo.com',
       userName: 'Pascal',
       password: 'ulor mike',
       location: 'lagos',
       profileImage: 'mypix',
       aboutMe: 'I am the CEO of ulorseries. Thanks'
    },
    existingUsername: {
        fullName: 'BruceBanner',
        email: 'banner@yahoo.com',
        userName: 'hulk',
        password: 'bruce banner',
        location: 'newyork',
        profileImage: 'mypix',
        aboutMe: 'I am hulk of the Avengers'
      },
      existingEmail: {
        fullName: 'BruceBanner',
        email: 'banner@yahoo.com',
        userName: 'hulk',
        password: 'bruce banner',
        location: 'newyork',
        profileImage: 'mypix',
        aboutMe: 'I am hulk of the Avengers'
      },
      incompleteData: {
        fullName: 'Anna Jones',
        email: 'annie@yahoo.com'
      },
      emptyData: {
        fullName: '',
        email: '',
        userName: '',
        password: '',
        location: '',
        profileImage: '',
        aboutMe: ''
      },
      improperData: {
        fullName: '23BruceBanner',
        email: 'banner@yahoo.com',
        userName: '112hulk',
        password: 'bruce banner',
        location: 'newyork',
        profileImage: 'mypix',
        aboutMe: 'I am hulk of the Avengers'
      },
      userOneLogin: { userName: 'hulk', password: 'bruce banner' },
      userTwoLogin: { userName: 'Pascal', password: 'ulor mike' },
      emptyLoginData: { userName: '', password: '' },
      invalidUserName: { userName: 'wally', password: 'bruce banner' },
      invalidPassword: { userName: 'hulk', password: 'west' },
      invalidUserNamePassword: { userName: 'wally', paaword: 'west'}
};