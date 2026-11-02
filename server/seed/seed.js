import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import mongoose from 'mongoose';
import connectDB from '../config/db.js';

import User from '../models/User.js';
import Profile from '../models/Profile.js';
import Experience from '../models/Experience.js';
import Project from '../models/Project.js';
import Skill from '../models/Skill.js';
import Certification from '../models/Certification.js';
import Message from '../models/Message.js';

import {
  seedProfile,
  seedExperiences,
  seedProjects,
  seedSkills,
  seedCertifications
} from './seedData.js';

dotenv.config();

const seed = async () => {
  try {
    console.log('[Seed] Connecting to MongoDB...');
    const conn = await connectDB();
    if (!conn) {
      console.error('[Seed Error] Could not connect to database. Aborting seed.');
      process.exit(1);
    }

    console.log('[Seed] Purging existing collection data...');
    await Promise.all([
      User.deleteMany({}),
      Profile.deleteMany({}),
      Experience.deleteMany({}),
      Project.deleteMany({}),
      Skill.deleteMany({}),
      Certification.deleteMany({}),
      Message.deleteMany({})
    ]);

    // Create Admin User
    const adminEmail = (process.env.ADMIN_EMAIL || 'admin@portfolio.dev').toLowerCase();
    const adminPassword = process.env.ADMIN_PASSWORD || 'Admin@12345';
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(adminPassword, salt);

    const adminUser = await User.create({
      email: adminEmail,
      passwordHash,
      role: 'admin'
    });
    console.log(`[Seed] Admin user seeded successfully (${adminUser.email})`);

    // Insert Profile
    await Profile.create(seedProfile);
    console.log('[Seed] Profile seeded successfully');

    // Insert Experiences
    await Experience.insertMany(seedExperiences);
    console.log(`[Seed] ${seedExperiences.length} Experience entries seeded`);

    // Insert Projects
    await Project.insertMany(seedProjects);
    console.log(`[Seed] ${seedProjects.length} Projects seeded`);

    // Insert Skills
    await Skill.insertMany(seedSkills);
    console.log(`[Seed] ${seedSkills.length} Skill categories seeded`);

    // Insert Certifications
    await Certification.insertMany(seedCertifications);
    console.log(`[Seed] ${seedCertifications.length} Certifications seeded`);

    // Insert initial welcome message in inbox
    await Message.create({
      name: "Portfolio Bot",
      email: "system@portfolio.dev",
      subject: "Welcome to your Developer Portfolio Admin Dashboard",
      message: "Congratulations! Your MERN portfolio has been seeded successfully. You can use this dashboard to manage your projects, edit experience entries, adjust profile copy, and review incoming contact messages.",
      read: false,
      ip: "127.0.0.1"
    });
    console.log('[Seed] Welcome message seeded in admin inbox');

    console.log('\n========================================');
    console.log(' SEEDING COMPLETED SUCCESSFULLY! ');
    console.log(` Admin Email:    ${adminEmail}`);
    console.log(` Admin Password: ${adminPassword}`);
    console.log('========================================\n');

    await mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    console.error(`[Seed Error] Failed to seed database: ${error.message}`);
    process.exit(1);
  }
};

seed();
