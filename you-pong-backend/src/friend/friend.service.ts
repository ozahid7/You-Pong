import { BadRequestException, Injectable, ServiceUnavailableException } from "@nestjs/common";
import { use } from "passport";
import { PrismaService } from "src/prisma/prisma.service";
import { FindUserService } from "src/user/services";

@Injectable()
export class friendService{
	constructor(private prisma: PrismaService,
				private findUser: FindUserService){}

	async postcolumn(state: any, id_user: string, id_freind: string) {
		try {			
			await this.prisma.freindship.create({
				data: {
					id_freind,
					id_user,
					state,
					id_freindship: id_user + id_freind 
				}
			})         
		} catch (error) {
			throw new BadRequestException("a request have been already sent!");
		}
	}

	async deletefriendship(id_freindship: string) {
		try {
			await this.prisma.freindship.delete({
				where : {
					id_freindship,
				}
			})
		} catch (error) {
			throw new BadRequestException("Couldn't remove friendship");
		}
	}

	async updateStatus(id_freindship, state) {
		try {
			await this.prisma.freindship.update({
				where: {
					id_freindship
				},
				data: {
					state
				}
			})
		} catch (error) {
			throw new BadRequestException("Could't accept the friend request");  
		}
	}

	async sendReq(userUid: string, friendName: string) {
		const friend = await this.findUser.finduserByUserName(friendName);
		if (!friend)
			throw new ServiceUnavailableException(`Could't find friend with the username '${friendName}'`);
		const user = await this.findUser.finduserById(userUid);
		if (!user)
			throw new BadRequestException("DB couldn't fetch user please ma sure theat you're logged");
		if (user.id_user == friend.id_user)
			throw new BadRequestException("You can't add yourself -_- !");  
		const pend = await this.prisma.freindship.findFirst({
			where: {
				id_freindship: friend.id_user + user.id_user,
			}
		});
		if (pend === null)
			await this.postcolumn("PENDING", user.id_user, friend.id_user);
		else
		{
			if (pend.state == 'PENDING')
				throw new BadRequestException(`${friend.username} have already send you a friend request`);
			if (pend.state == "ACCEPTED")
				throw new BadRequestException(`${friend.username} and You are already friends`);
		}
		return {status: "SUCCESS"};
	};

	async acceptReq(userUid: string, friendName: string) {
		const friend = await this.findUser.finduserByUserName(friendName);
		if (!friend)
			throw new ServiceUnavailableException(`Could't find friend with the username '${friendName}'`);
		const user = await this.findUser.finduserById(userUid);
		if (!user)
			throw new BadRequestException("DB couldn't fetch user please ma sure theat you're logged");
		if (user.id_user == friend.id_user)
			throw new BadRequestException("You can't accept yourself -_- !");  
		// check for request
		const req = await this.prisma.freindship.findUnique({
			where: {
				id_freindship: friend.id_user + user.id_user,
				state: "PENDING"
			}
		});
		if (!req)
			throw new BadRequestException("No request was found to be accepted");  
	// add user
		await this.postcolumn("ACCEPTED", user.id_user, friend.id_user);
		await this.updateStatus(friend.id_user + user.id_user, "ACCEPTED");
		return {status: "SUCCESS"};
	};

	async removeFriend(userUid: string, friendName: string) {
		const friend = await this.findUser.finduserByUserName(friendName);
		if (!friend)
			throw new ServiceUnavailableException(`Could't find friend with the username '${friendName}'`);
		const user = await this.findUser.finduserById(userUid);
		if (!user)
			throw new BadRequestException("DB couldn't fetch user please ma sure theat you're logged");
		if (user.id_user == friend.id_user)
			throw new BadRequestException("You can't remove yourself -_- !");
		await this.deletefriendship(user.id_user + friend.id_user);
		await this.deletefriendship(friend.id_user + user.id_user);
		return {status: "SUCCESS"};
	}

	async blockFriend(userUid: string, friendName: string) {
		const friend = await this.findUser.finduserByUserName(friendName);
		if (!friend)
			throw new ServiceUnavailableException(`Could't find friend with the username '${friendName}'`);
		const user = await this.findUser.finduserById(userUid);
		if (!user)
			throw new BadRequestException("DB couldn't fetch user please ma sure theat you're logged");
		if (user.id_user == friend.id_user)
			throw new BadRequestException("You can't remove yourself -_- !");
		const req = await this.prisma.freindship.findUnique({
			where: {
				id_freindship: friend.id_user + user.id_user,
			}
		});
		if (req)
			await this.updateStatus(friend.id_user + user.id_user, 'BLOCKED');
		else
		{
			await this.postcolumn("ACCEPTED", user.id_user, friend.id_user);
			await this.postcolumn("BLOCKED", friend.id_user, user.id_user);
		}
		return {status: "SUCCESS"};
	}
}