import {prismaClient} from "../src/application/database.js";
import bcrypt from "bcrypt";

export const removeTestUser = async () => {
    await prismaClient.user.deleteMany({
        where: {
            username: "test"
        }
    });
}

export const createTestUser = async () => {
    await prismaClient.user.create({
        data: {
            username: "test",
            password: await bcrypt.hash("rahasia", 10),
            name: "test",
            token: "test"
        }
    });
}

export const getTestUser = async () => {
    return prismaClient.user.findUnique({
        where: {
            username: "test"
        }
    });
}

export const removeAllTestContact = async () => {
     await prismaClient.contact.deleteMany({
        where: {
            username: "test"
        }
    })
}

export const createTestContact = async () => {
    await prismaClient.contact.create({
       data: {
           username: "test",
           first_name: "test",
           last_name: "test",
           email: "test@pzn.com",
           phone: "080900000"
       }
    });
};

export const createManyTestContact = async () => {
    for (let i = 0; i < 15; i++) {
        await prismaClient.contact.create({
            data: {
                username: "test",
                first_name: "test" + i,
                last_name: "test" + i,
                email: "test" + i + "@pzn.com",
                phone: "080900000" + i
            }
        });
    }
};


export const getTestContacts = async () => {
    return prismaClient.contact.findFirst({
        where: {
            username: "test"
        }
    })
}