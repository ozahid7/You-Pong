import { BadRequestException, ForbiddenException, Injectable, NotFoundException, ServiceUnavailableException } from "@nestjs/common";
import { state } from "@prisma/client";
import { response } from "express";
import { use } from "passport";
import { PrismaService } from "src/prisma/prisma.service";
import { FindUserService } from "src/user/services";

@Injectable()
export class friendService{
	constructor(private prisma: PrismaService,
				private findUser: FindUserService){}

	async opInit(user: string, friend: string, op: string) {
		const fr = await this.findUser.finduserByUserName(friend);
		if (!fr)
			throw new NotFoundException(`no such user ${friend}`);
		const us = await this.findUser.finduserById(user);
		if (!us)
			throw new NotFoundException(`no such user`);
		if (us.id_user === fr.id_user)
			throw new ForbiddenException(`can't ${op} yourself!`);
		return {us, fr};
	}

	async send(user: string, friend: string) {
		const init = await this.opInit(user, friend, 'add');
		try {
			await this.prisma.freindship.create({
				data: {
					id_freind: init.fr.id_user,
					id_user: init.us.id_user,
					id_freindship : init.us.id_user + init.fr.id_user,
					state: "PENDING"
				}
			});
			return ({satue: 'SUCCESS'});
		} catch(error) {
			if (error.code == 'P2002')
				throw new BadRequestException("A relation already exists");
			throw new BadRequestException(error);
		}
	}
	
	async accept(user: string, friend: string) {
		const init = await this.opInit(user, friend, 'accept');
		
		// check if req is sent
		const req = await this.prisma.freindship.findUnique({
			where: {
				id_freindship: init.fr.id_user + init.us.id_user,
				state: 'PENDING'
			}
		});
		if (!req)
			throw new BadRequestException(`no req was sent!`);
		try {
			await this.prisma.freindship.create({
				data: {
					id_freind: init.fr.id_user,
					id_user: init.us.id_user,
					id_freindship : init.us.id_user + init.fr.id_user,
					state: "ACCEPTED"
				}
			});
			await this.prisma.freindship.update({
				where: {
					id_freindship: init.fr.id_user + init.us.id_user
				},
				data: {
					state: 'ACCEPTED'
				}
			});
			return ({satue: 'SUCCESS'});
		} catch(error) {
			throw new BadRequestException(error);
		}
	}

	async decline(user: string, friend: string) {
		const init = await this.opInit(user, friend, 'decline');
		const req = await this.prisma.freindship.findUnique({
			where: {
				id_freindship: init.fr.id_user + init.us.id_user,
				state: 'PENDING'
			}
		});
		if (!req)
			throw new BadRequestException(`no req was sent!`);
		try {
			await this.prisma.freindship.delete({
				where: {
					id_freindship: init.fr.id_user + init.us.id_user,
					state: 'PENDING'
				}
			});
			return ({satue: 'SUCCESS'});
		} catch (error) {
			throw new BadRequestException(error);			
		}
	}
	
	async remove(user: string, friend: string) {
		const init = await this.opInit(user, friend, 'remove');
		const req = await this.prisma.freindship.findUnique({
			where: {
				id_freindship: init.fr.id_user + init.us.id_user,
				state: 'ACCEPTED'
			}
		});
		if (!req)
			throw new BadRequestException(`you're not friend with ${friend}`);
		try {
			await this.prisma.freindship.deleteMany({
				where:{
					OR: [
						{id_freindship: init.fr.id_user + init.us.id_user},
						{id_freindship: init.us.id_user + init.fr.id_user}
					],
				},
			});
			return ({satue: 'SUCCESS'});
		} catch (error) {
			throw new BadRequestException(error);
		};
	};
	
	async block(user: string, friend: string) {
		const init = await this.opInit(user, friend, 'block');
		const req = await this.prisma.freindship.findUnique({
			where: {
				id_freindship: init.fr.id_user + init.us.id_user,
				
				NOT: [
					{ state: 'BLOCKED' },
				],
			},
		});
		if (!req)
			throw new BadRequestException(`you can't block ${friend}`);
		if (req.state == 'BLOCKED')
			throw new BadRequestException(`${friend} is already blocked!`);
		try {
			await this.prisma.freindship.update({
				where: {
					id_freindship: init.us.id_user  + init.fr.id_user
				},
				data: {
					state: 'BLOCKED'
				}
			});
			return ({satue: 'SUCCESS'});
		} catch (error) {
			throw new BadRequestException(error);
		}
	}
}
