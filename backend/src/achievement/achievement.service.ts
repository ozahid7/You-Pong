import { ForbiddenException, Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { achCreateDto } from "./dto";

@Injectable()
export class AchievementService{
	constructor (private prisma: PrismaService){}
	async setAchievement(dto: achCreateDto){
		try {
			await this.prisma.achievement.create({
			  data: {
				avatar: dto.avatar,
				title: dto.title,
				description: dto.description,
				requirement: dto.requirement,
			  },
			});
			return true;
		} catch (error) {
			throw new ForbiddenException("Failed to create achievement.")
		}
	}

	async findAch(_title: string) {
	  try {
		const ach = await this.prisma.achievement.findUnique({
		  where: {
			title: _title
		  }
		});
		return ach;
	  } catch (error) {
		throw new NotFoundException('achievement not found');
	  }
	}
}
