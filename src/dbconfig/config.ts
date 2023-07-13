import mongoose from 'mongoose';

export async function connect() {
    try {
        mongoose.connect(process.env.mongodb_url!) 
        const connection = mongoose.connection;
        connection.on('connected', () => {
            console.log('Connected to MongoDB');
        })
        connection.on('error', (err) => {
            console.log(err);
        })
    } catch (error) {
        console.log(error);
    }
}