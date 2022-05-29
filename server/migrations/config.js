
// Config collections migrations schema

module.exports =  async () => DB.Config.find({})
    .remove()
    .then(() => DB.Config.create(
        {
            key: 'siteName',
            value: 'Bangali Job SA',
            name: 'Site Name',
            public: true
        },
        {
            key: 'siteLogo',
            value: '/assets/images/logo.png',
            name: 'Site Logo',
            public: true
        }, 
        {
            key: 'siteFavicon',
            value: '/favicon.ico',
            name: 'Site Favicon',
            public: true
        }, 
        {
            key: 'contactEmail',
            value: 'contact@bangalijobsa.com',
            name: 'Contact E-mail',
            public: false
        }, 
        {
            key: 'homeSEO',
            value: {
                keywords: '',
                description: '',
            },
            name: 'Here will be SEO meta data for home page',
            type: 'mixed',
            public: true
        }, 
        {
            key: 'codeHead',
            value: '',
            name: 'Custom code before end head tag',
            public: true
        }, 
        {
            key: 'codeBody',
            value: '',
            name: 'Custom code before end body tag',
            public: true
        }, 
        {
            key: 'sociaLinks',
            value: {
                facebook: 'https://facebook.com/kkohab494',
                linkedin: 'https://linkedin.com/ohabdev',
                github: 'https://github.com/ohabdev',
                bitbucket: 'https://bitbucket.com/ohabdev',
                twitter: 'https://twitter.com/ohabdev',
                dribbble: 'https://dribbble.com/ohabdev',
                google: 'https://google.com'
            },
            name: 'Social Links',
            type: 'mixed',
            public: true
        }, 
        {
            key: 'publicPhone',
            value: '+880155412704',
            name: 'Public contact phone number',
            public: true
        }, 
        {
            key: 'publicEmail',
            value: 'info@bangalijobsa.com',
            name: 'Public contact email',
            public: true
        }, 
        {
            key: 'securityIcon1',
            public: true,
            type: 'mixed',
            value: {
                title: 'Icon1',
                iconUrl: '',
                description: ''
            },
        }, 
        {
            key: 'securityIcon2',
            public: true,
            type: 'mixed',
            value: {
                title: 'Icon2',
                iconUrl: '',
                description: ''
            },
        }, 
        {
            key: 'securityIcon3',
            public: true,
            type: 'mixed',
            value: {
                title: 'Icon3',
                iconUrl: '',
                description: ''
            },
        }, 
        {
            key: 'siteCommission',
            value: 0.2,
            name: 'Site Commission',
            type: 'number',
            public: false,
            description: 'The commission of site. 0.2 means 20%, please use decimal value, less than 1'
        }, 
        {
            key: 'paymentGatewayConfig',
            value: {
                paypal: {
                    enable: true
                },
                stripe: {
                    enable: true
                },
                cod: {
                    enable: true
                }
            },
            name: 'Payment gateway config',
            type: 'mixed',
            description: 'Enable or disable payment gateway',
            public: true
        }
    ));