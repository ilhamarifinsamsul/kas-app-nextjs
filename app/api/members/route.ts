import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { error } from "console";

const prisma = new PrismaClient();

// GET : List all member
export async function GET(){
    try {
        const members = await prisma.member.findMany({
            orderBy: {
                createdAt: 'desc'
            }
        });
        return NextResponse.json(members);
    } catch (error) {
        console.log(error);
        return NextResponse.json({message: "Internal Server Error"}, {status: 500});
    }
}

// POST : Create a new member
export async function POST(request: NextRequest){
    try {
        const body = await request.json();
        const {name, niat, address, phone} = body;
        if(!name || !niat || !address || !phone){
            return NextResponse.json({message: "Bad Request"}, {status: 400});
        }

        const newMember = await prisma.member.create({
            data: {
                name,
                niat,
                address,
                phone
            }
        })
        return NextResponse.json(newMember);
    } catch (error) {
        console.log(error);
        return NextResponse.json({message: "Internal Server Error"}, {status: 500});
    }

}

// PUT : Update an existing member
export async function PUT(request: NextRequest){
    try {
        const body = await request.json();
        const {id, name, niat, address, phone} = body;

        if (!id || !name || !niat || !address || !phone) {
            return NextResponse.json({
                error: "Bad Request"
            }, {status: 400})
        }

        // update member
        const updatedMember = await prisma.member.update({
            where: {id},
            data: {
                name,
                niat,
                address,
                phone
            }
        })
        return NextResponse.json(updatedMember);
    } catch (error) {
        console.log(error);
        return NextResponse.json({message: "Internal Server Error"}, {status: 500});
    }

}

// DELETE : Delete a member
export async function DELETE(request: NextRequest){
    try {
        const body = await request.json();
        const { id } = body;

        const deletedMember = await prisma.member.delete({
            where: {id}
        });
        return NextResponse.json(deletedMember, {status: 200})
    } catch (error) {
        console.error("Error deleting member:", error);
        return NextResponse.json({message: "Internal Server Error"}, {status: 500})
        
    }
}