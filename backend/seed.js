const User = require('./src/models/User');
const bcrypt = require('bcryptjs');

const seedAdminUser = async () => {
    try {
        // Check if admin user already exists
        const adminExists = await User.findOne({ email: 'admin@example.com' });

        if (!adminExists) {
            // Hash password
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash('password123', salt);

            // Create admin user
            await User.create({
                email: 'admin@example.com',
                password: hashedPassword,
                role: 'admin'
            });

            console.log('Admin user created successfully');
        } else {
            console.log('Admin user already exists');
        }
    } catch (error) {
        console.error('Error seeding admin user:', error);
    }
};

// Run the seed function
seedAdminUser();