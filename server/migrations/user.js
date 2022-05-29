module.exports = async() => DB.User.find({})
    .remove()
    .then(() => DB.User.create({
        provider: 'local',
        name: 'Test User',
        email: 'user@gmail.com',
        password: '12345678',
        emailVerified: true
    }, {
        provider: 'local',
        role: 'admin',
        name: 'Admin',
        email: 'admin@gmail.com',
        password: '12345678',
        emailVerified: true
    }));