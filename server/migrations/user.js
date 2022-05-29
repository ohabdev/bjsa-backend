module.exports = async() => DB.User.find({})
    .remove()
    .then(() => DB.User.create({
        provider: 'local',
        name: 'Test User',
        email: 'user@gmail.com',
        password: '12345678',
        emailVerified: true,
        emailVerifiedToken: "9437534959345h34y58o34y5o434h54h5u",
        isActive: true,
    }, {
        provider: 'local',
        role: 'admin',
        name: 'Admin',
        email: 'admin@gmail.com',
        password: '12345678',
        emailVerified: true,
        emailVerifiedToken: "9437534959345h34y58o34y5o434h54h5u",
        isActive: true,
    }));