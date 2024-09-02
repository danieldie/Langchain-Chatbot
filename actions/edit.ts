"use server"
import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";
import bcrypt from "bcryptjs";

export const edit = async (values: any) => {
    const { email, password, name } = values;

    try {
        await connectDB();
        const hashedPassword = await bcrypt.hash(password, 10);
        
        const updateUser = await User.updateOne({ email: email }, {
            name: name,
            password: hashedPassword
        })
    }catch(e){
        console.log(e);
    }
}