const passport = require('passport');
const GitHubStrategy = require('passport-github2').Strategy;
const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;
require('dotenv').config();

passport.use(
    new GitHubStrategy(
        {
            clientID: process.env.GITHUB_CLIENT_ID,
            clientSecret: process.env.GITHUB_CLIENT_SECRET,
            callbackURL: process.env.GITHUB_CALLBACK_URL,
            scope: ['user:email']
        },
        async (accessToken, refreshToken, profile, done) => {
            try {
                const db = mongodb.getDatabase();
                const usersCollection = db.db().collection('users');
                
                const userUpdate = {
                    $set: {
                        githubId: profile.id,
                        username: profile.username,
                        email: profile.emails?.[0]?.value || null,
                        avatar: profile.photos?.[0]?.value || null,
                        updatedAt: new Date()
                    },
                    $setOnInsert: { createdAt: new Date() } // Only set when inserting
                };

                const options = { returnDocument: 'after', upsert: true };
                const user = await usersCollection.findOneAndUpdate(
                    { githubId: profile.id },
                    userUpdate,
                    options
                );
                return done(null, user);
            } catch (err) {
                return done(err, null);
            }
        }
    )
);

// Serialize user
passport.serializeUser((user, done) => {
    done(null, user._id.toString());
});

// Deserialize user
passport.deserializeUser(async (id, done) => {
    try {
        const db = mongodb.getDatabase();
        const usersCollection = db.db().collection('users');
        const user = await usersCollection.findOne({ _id: new ObjectId(id) });
        done(null, user);
    } catch (err) {
        done(err, null);
    }
});

module.exports = passport;