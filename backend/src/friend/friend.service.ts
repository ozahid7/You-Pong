import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class friendService {
  constructor(private prisma: PrismaService) {}

  //GET MANY
  //   async getFriends(id_user: string) {
  //     const user = await this.prisma.user.findUnique({
  //       where: { id_user: id_user },
  //     });
  //     if (!user)
  //       return {
  //         message: 'No such User !',
  //         Object: null,
  //       };
  //     const result = await this.prisma.friendship.findMany({
  //       where: {
  //         id_user: user.id_user,
  //       },
  //     });
  //     if (!result)
  //       return {
  //         message: 'There is no friends !',
  //         Object: null,
  //       };
  //     return {
  //       message: 'Friends founded',
  //       Object: result,
  //     };
  //   }
  async getFriends(id_user: string) {
    const user = await this.prisma.user.findUnique({
      where: { id_user: id_user },
    });
    if (!user)
      return {
        message: 'No such User !',
        Object: null,
      };
    const blockedFriends = await this.prisma.friendship.findMany({
      where: {
        OR: [{ id_user: user.id_user }, { id_friend: user.id_user }],
        state: 'BLOCKED',
        blocker_User: id_user,
      },
    });
    const acceptedFriends = await this.prisma.friendship.findMany({
      where: {
        OR: [{ id_user: user.id_user }, { id_friend: user.id_user }],
        state: 'ACCEPTED',
      },
    });
    const pendingFriends = await this.prisma.friendship.findMany({
      where: {
        id_friend: user.id_user,
        // OR: [{ id_user: user.id_user }, { id_friend: user.id_user }],
        state: 'PENDING',
      },
    });

    const accepted = await Promise.all(
      acceptedFriends.map(async (friend) => {
        let id = friend.id_user;
        if (id === id_user) id = friend.id_friend;
        return await this.prisma.user.findUnique({
          where: { id_user: id },
          select: { username: true, avatar: true, status: true },
        });
      }),
    );
    const blocked = await Promise.all(
      blockedFriends.map(async (friend) => {
        let id = friend.id_user;
        if (id === id_user) id = friend.id_friend;
        return await this.prisma.user.findUnique({
          where: { id_user: id },
          select: { username: true, avatar: true, status: true },
        });
      }),
    );
    const pending = await Promise.all(
      pendingFriends.map(async (friend) => {
        let id = friend.id_user;
        if (id === id_user) id = friend.id_friend;

        return await this.prisma.user.findUnique({
          where: { id_user: id },
          select: { username: true, avatar: true, status: true },
        });
      }),
    );
    const result = { accepted, blocked, pending };

    if (!result)
      return {
        message: 'There is no friends !',
        Object: null,
      };
    return {
      message: 'Friends founded',
      Object: result,
    };
  }

  //GET SEARCH
  async searchFriends(id_user: string) {
    const my_user = await this.prisma.user.findUnique({
      where: { id_user: id_user },
      include: { blocked_user: true, blocked_from: true },
    });
    if (!my_user)
      return {
        message: 'No such User !',
        Object: null,
      };

    const allUsers = await this.prisma.user.findMany({
      where: {
        NOT: {
          id_user: my_user.id_user,
        },
      },
      include: { blocked_user: true, blocked_from: true },
    });

    const users = await Promise.all(
      allUsers.map((user) => {
        if (
          user.blocked_user.filter((block) => block.id_user === my_user.id_user)
            .length != 1 &&
          user.blocked_from.filter((block) => block.id_user === my_user.id_user)
            .length != 1
        )
          return user;
      }),
    );
    const filtredUsers = users.filter((user) => user);
    const result = filtredUsers.map((user) => {
      return {
        username: user.username,
        avatar: user.avatar,
        status: user.status,
      };
    });
    if (!result)
      return {
        message: 'There is no friends !',
        Object: null,
      };
    return {
      message: 'Friends founded',
      Object: result,
    };
  }

  //POST
  async postFriend(id_user: string, username: string) {
    const user = await this.prisma.user.findUnique({
      where: { id_user: id_user },
    });
    const friend = await this.prisma.user.findUnique({
      where: { username: username },
    });
    if (!user || !friend || user.id_user === friend.id_user)
      return {
        message: 'No such User !',
        Object: null,
      };
    const duplicate = await this.prisma.friendship.findFirst({
      where: {
        OR: [
          {
            id_user: user.id_user,
            id_friend: friend.id_user,
          },
          {
            id_user: friend.id_user,
            id_friend: user.id_user,
          },
        ],
      },
    });
    if (duplicate)
      return {
        message: 'Duplicated founded',
        Object: null,
      };
    const result = await this.prisma.friendship.create({
      data: {
        id_user: user.id_user,
        id_friend: friend.id_user,
        state: 'PENDING',
      },
    });
    if (!result)
      return {
        message: "Can't create a friendship !",
        Object: null,
      };
    return {
      message: 'Friendship Created Succefully',
      Object: result,
    };
  }

  //PUT ACCEPTED
  async acceptFriend(id_user: string, username: string) {
    const user = await this.prisma.user.findUnique({
      where: { id_user: id_user },
    });
    const friend = await this.prisma.user.findUnique({
      where: { username: username },
    });
    if (!user || !friend || user.id_user === friend.id_user)
      return {
        message: 'No such User !',
        Object: null,
      };
    const duplicate = await this.prisma.friendship.findFirst({
      where: {
        id_user: friend.id_user,
        id_friend: user.id_user,
        state: 'PENDING',
      },
    });
    if (!duplicate)
      return {
        message: 'There is no friendship !',
        Object: null,
      };
    const result = await this.prisma.friendship.update({
      where: {
        id_friendship: duplicate.id_friendship,
      },
      data: {
        state: 'ACCEPTED',
      },
    });
    const updateUser = await this.prisma.user.update({
      where: {
        id_user: id_user,
      },
      data: {
        friend_user: {
          connect: {
            id_user: friend.id_user,
          },
        },
      },
    });
    if (!result || !updateUser)
      return {
        message: "Can't update a friendship !",
        Object: null,
      };
    return {
      message: 'Friendship Updated Succefully',
      Object: result,
    };
  }

  //   //DELETE REFUSED
  //   async refuseFriend(id_user: string, username: string) {
  //     const user = await this.prisma.user.findUnique({
  //       where: { id_user: id_user },
  //     });
  //     const friend = await this.prisma.user.findUnique({
  //       where: { username: username },
  //     });
  //     if (!user || !friend || user.id_user === friend.id_user)
  //       return {
  //         message: 'No such User !',
  //         Object: null,
  //       };
  //     const duplicate = await this.prisma.friendship.findFirst({
  //       where: {
  //         id_user: friend.id_user,
  //         id_friend: user.id_user,
  //         state: { in: ['ACCEPTED', 'PENDING'] },
  //       },
  //     });
  //     if (!duplicate)
  //       return {
  //         message: 'There is no friendship !',
  //         Object: null,
  //       };
  //     const result = await this.prisma.friendship.delete({
  //       where: {
  //         id_friendship: duplicate.id_friendship,
  //       },
  //     });
  //     if (!result)
  //       return {
  //         message: "Can't delete a friendship !",
  //         Object: null,
  //       };
  //     return {
  //       message: 'Friendship Deleted Succefully',
  //       Object: result,
  //     };
  //   }

  //PUT REFUSED
  async refuseFriend(id_user: string, username: string) {
    const user = await this.prisma.user.findUnique({
      where: { id_user: id_user },
    });
    const friend = await this.prisma.user.findUnique({
      where: { username: username },
    });
    if (!user || !friend || user.id_user === friend.id_user)
      return {
        message: 'No such User !',
        Object: null,
      };
    const duplicate = await this.prisma.friendship.findFirst({
      where: {
        id_user: friend.id_user,
        id_friend: user.id_user,
        state: 'PENDING',
      },
    });
    if (!duplicate)
      return {
        message: 'There is no friendship !',
        Object: null,
      };
    const result = await this.prisma.friendship.update({
      where: {
        id_friendship: duplicate.id_friendship,
      },
      data: {
        state: 'REFUSED',
      },
    });
    if (!result)
      return {
        message: "Can't update a friendship !",
        Object: null,
      };
    return {
      message: 'Friendship Updated Succefully',
      Object: result,
    };
  }

  //PUT BLOCKED
  async blockFriend(id_user: string, username: string) {
    const user = await this.prisma.user.findUnique({
      where: { id_user: id_user },
    });
    const friend = await this.prisma.user.findUnique({
      where: { username: username },
    });
    if (!user || !friend || user.id_user === friend.id_user)
      return {
        message: 'No such User !',
        Object: null,
      };
    const duplicate = await this.prisma.friendship.findFirst({
      where: {
        OR: [
          { id_user: user.id_user, id_friend: friend.id_user },
          { id_user: friend.id_user, id_friend: user.id_user },
        ],
        state: 'ACCEPTED',
      },
    });
    if (!duplicate)
      return {
        message: 'There is no friendship !',
        Object: null,
      };
    const result = await this.prisma.friendship.update({
      where: {
        id_friendship: duplicate.id_friendship,
      },
      data: {
        state: 'BLOCKED',
        blocker_User: id_user,
      },
    });
    const updateUser = await this.prisma.user.update({
      where: {
        id_user: duplicate.id_user,
      },
      data: {
        blocked_user: {
          connect: {
            id_user: duplicate.id_friend,
          },
        },
        friend_user: { disconnect: { id_user: duplicate.id_friend } },
      },
    });
    if (!result || !updateUser)
      return {
        message: "Can't update a friendship !",
        Object: null,
      };
    return {
      message: 'Friendship Updated Succefully',
      Object: result,
    };
  }

  //PUT UNBLOCK
  async unblockFriend(id_user: string, username: string) {
    const user = await this.prisma.user.findUnique({
      where: { id_user: id_user },
    });
    const friend = await this.prisma.user.findUnique({
      where: { username: username },
    });
    if (!user || !friend || user.id_user === friend.id_user)
      return {
        message: 'No such User !',
        Object: null,
      };
    const duplicate = await this.prisma.friendship.findFirst({
      where: {
        OR: [
          { id_user: user.id_user, id_friend: friend.id_user },
          { id_user: friend.id_user, id_friend: user.id_user },
        ],
        state: 'BLOCKED',
        blocker_User: id_user,
      },
    });
    if (!duplicate)
      return {
        message: 'There is no friendship !',
        Object: null,
      };
    const result = await this.prisma.friendship.update({
      where: {
        id_friendship: duplicate.id_friendship,
      },
      data: {
        state: 'ACCEPTED',
        blocker_User: null,
      },
    });
    const updateUser = await this.prisma.user.update({
      where: {
        id_user: duplicate.id_user,
      },
      data: {
        blocked_user: {
          disconnect: {
            id_user: duplicate.id_friend,
          },
        },
        friend_user: {
          connect: {
            id_user: duplicate.id_friend,
          },
        },
      },
    });
    if (!result || !updateUser)
      return {
        message: "Can't update a friendship !",
        Object: null,
      };
    return {
      message: 'Friendship Updated Succefully',
      Object: result,
    };
  }

  //DELETE
  async deleteFriend(id_user: string, username: string) {
    const user = await this.prisma.user.findUnique({
      where: { id_user: id_user },
    });
    const friend = await this.prisma.user.findUnique({
      where: { username: username },
    });
    if (!user || !friend || user.id_user === friend.id_user)
      return {
        message: 'No such User !',
        Object: null,
      };
    const duplicate = await this.prisma.friendship.findFirst({
      where: {
        OR: [
          { id_user: user.id_user, id_friend: friend.id_user },
          { id_user: friend.id_user, id_friend: user.id_user },
        ],
        state: 'ACCEPTED',
      },
    });
    if (!duplicate)
      return {
        message: 'There is no friendship !',
        Object: null,
      };
    const result = await this.prisma.friendship.delete({
      where: {
        id_friendship: duplicate.id_friendship,
      },
    });
    const updateUser = await this.prisma.user.update({
      where: {
        id_user: duplicate.id_user,
      },
      data: {
        friend_user: {
          disconnect: {
            id_user: duplicate.id_friend,
          },
        },
      },
    });
    if (!result || !updateUser)
      return {
        message: "Can't delete a friendship !",
        Object: null,
      };
    return {
      message: 'Friendship Deleted Succefully',
      Object: result,
    };
  }

  // 	async opInit(user: string, friend: string, op: string) {
  // 		const fr = await this.findUser.finduserByUserName(friend);
  // 		if (!fr)
  // 			throw new NotFoundException(`no such user ${friend}`);
  // 		const us = await this.findUser.finduserById(user);
  // 		if (!us)
  // 			throw new NotFoundException(`no such user`);
  // 		if (us.id_user === fr.id_user)
  // 			throw new ForbiddenException(`can't ${op} yourself!`);
  // 		return {us, fr};
  // 	}

  // 	async send(user: string, friend: string) {
  // 		const init = await this.opInit(user, friend, 'add');
  // 		try {
  // 			await this.prisma.freindship.create({
  // 				data: {
  // 					id_freind: init.fr.id_user,
  // 					id_user: init.us.id_user,
  // 					id_freindship : init.us.id_user + init.fr.id_user,
  // 					state: "PENDING"
  // 				}
  // 			});
  // 			return ({satue: 'SUCCESS'});
  // 		} catch(error) {
  // 			if (error.code == 'P2002')
  // 				throw new BadRequestException("A relation already exists");
  // 			throw new BadRequestException(error);
  // 		}
  // 	}

  // 	async accept(user: string, friend: string) {
  // 		const init = await this.opInit(user, friend, 'accept');

  // 		// check if req is sent
  // 		const req = await this.prisma.freindship.findUnique({
  // 			where: {
  // 				id_freindship: init.fr.id_user + init.us.id_user,
  // 				state: 'PENDING'
  // 			}
  // 		});
  // 		if (!req)
  // 			throw new BadRequestException(`no req was sent!`);
  // 		try {
  // 			await this.prisma.freindship.create({
  // 				data: {
  // 					id_freind: init.fr.id_user,
  // 					id_user: init.us.id_user,
  // 					id_freindship : init.us.id_user + init.fr.id_user,
  // 					state: "ACCEPTED"
  // 				}
  // 			});
  // 			await this.prisma.freindship.update({
  // 				where: {
  // 					id_freindship: init.fr.id_user + init.us.id_user
  // 				},
  // 				data: {
  // 					state: 'ACCEPTED'
  // 				}
  // 			});
  // 			return ({satue: 'SUCCESS'});
  // 		} catch(error) {
  // 			throw new BadRequestException(error);
  // 		}
  // 	}

  // 	async decline(user: string, friend: string) {
  // 		const init = await this.opInit(user, friend, 'decline');
  // 		const req = await this.prisma.freindship.findUnique({
  // 			where: {
  // 				id_freindship: init.fr.id_user + init.us.id_user,
  // 				state: 'PENDING'
  // 			}
  // 		});
  // 		if (!req)
  // 			throw new BadRequestException(`no req was sent!`);
  // 		try {
  // 			await this.prisma.freindship.delete({
  // 				where: {
  // 					id_freindship: init.fr.id_user + init.us.id_user,
  // 					state: 'PENDING'
  // 				}
  // 			});
  // 			return ({satue: 'SUCCESS'});
  // 		} catch (error) {
  // 			throw new BadRequestException(error);
  // 		}
  // 	}

  // 	async remove(user: string, friend: string) {
  // 		const init = await this.opInit(user, friend, 'remove');
  // 		const req = await this.prisma.freindship.findUnique({
  // 			where: {
  // 				id_freindship: init.fr.id_user + init.us.id_user,
  // 				state: 'ACCEPTED'
  // 			}
  // 		});
  // 		if (!req)
  // 			throw new BadRequestException(`you're not friend with ${friend}`);
  // 		try {
  // 			await this.prisma.freindship.deleteMany({
  // 				where:{
  // 					OR: [
  // 						{id_freindship: init.fr.id_user + init.us.id_user},
  // 						{id_freindship: init.us.id_user + init.fr.id_user}
  // 					],
  // 				},
  // 			});
  // 			return ({satue: 'SUCCESS'});
  // 		} catch (error) {
  // 			throw new BadRequestException(error);
  // 		};
  // 	};

  // 	async block(user: string, friend: string) {
  // 		const init = await this.opInit(user, friend, 'block');
  // 		const req = await this.prisma.freindship.findUnique({
  // 			where: {
  // 				id_freindship: init.fr.id_user + init.us.id_user,

  // 				NOT: [
  // 					{ state: 'BLOCKED' },
  // 				],
  // 			},
  // 		});
  // 		if (!req)
  // 		{
  // 			try {
  // 				await this.prisma.freindship.create({
  // 					data: {
  // 						id_freindship: init.us.id_user  + init.fr.id_user,
  // 						id_freind: init.fr.id_user,
  // 						id_user: init.us.id_user,
  // 						state: 'BLOCKED'
  // 					}
  // 				});
  // 			} catch (error) {
  // 				if (error.code == 'P2002')
  // 					throw new BadRequestException("You've already blocked this contact");
  // 				throw new BadRequestException(error);
  // 			}
  // 		}
  // 		else if (req.state == 'BLOCKED')
  // 		{
  // 			try {
  // 				await this.prisma.freindship.update({
  // 					where: {
  // 						id_freindship: init.us.id_user  + init.fr.id_user
  // 					},
  // 					data: {
  // 						state: 'BLOCKED'
  // 					}
  // 				});
  // 				return ({satue: 'SUCCESS'});
  // 			} catch (error) {
  // 				if (error.code == 'P2002')
  // 					throw new BadRequestException("You've already blocked this contact");
  // 				throw new BadRequestException(error);
  // 			};
  // 		};
  // 	};

  // 	// send wich object wich status
  // 	async fillArr(us: any, state: state) {
  //         const objArray: {
  // 			avatar: string;
  // 			username: string;
  // 			status: string
  // 		}[] = [];
  // 		const obj = await this.prisma.freindship.findMany({
  // 			where: {
  // 				id_user: us.id_user,
  // 				state,
  // 			}
  // 		});
  // 		for (const i of obj) {
  // 			try {
  // 				const fr = await this.findUser.finduserById(i.id_freind);
  // 				objArray.push({
  // 					avatar: fr.avatar,
  // 					username: fr.username,
  // 					status: fr.status
  // 				});
  // 			} catch(error) {
  // 				throw new BadRequestException(error);
  // 			}
  // 		}
  // 		return objArray;
  // 	}

  // 	async sort(user: string) {
  // 		// get friends
  // 		const us = await this.findUser.finduserById(user);
  // 		if (!us)
  // 			throw new NotFoundException(`no such user`);
  // 		const blocked = await this.fillArr(us, 'BLOCKED');
  // 		const accepted = await this.fillArr(us, 'ACCEPTED');
  // 		const pending = await this.fillArr(us, 'PENDING');
  // 		return {accepted, pending, blocked};
  // 	};

  // 	async search(_id: string) {
  // 		try {
  // 			const user = this.findUser.finduserById(_id);
  // 			const bar = await this.prisma.user.findMany({
  // 				where: {
  // 					id_user: {
  // 						not: (await user).id_user
  // 					},
  // 					freindship_freind: {
  // 						every: {
  // 							OR: [
  // 								{id_freind: (await user).id_user},
  // 								{id_user: (await user).id_user},
  // 							],
  // 							state: {
  // 								not : "BLOCKED"
  // 							}
  // 						},
  // 					},
  // 					freindship_user: {
  // 						every: {
  // 							OR: [
  // 								{id_freind: (await user).id_user},
  // 								{id_user: (await user).id_user},
  // 							],
  // 							state: {
  // 								not : "BLOCKED"
  // 							}
  // 						},
  // 					},
  // 				},
  // 			});
  // 			const objArray: {
  // 				avatar: string;
  // 				username: string;
  // 				status: string
  // 			}[] = [];
  // 			for(const i of bar) {
  // 				objArray.push({
  // 					avatar: i.avatar,
  // 					username: i.username,
  // 					status: i.status
  // 				});
  // 			}
  // 			return (objArray);
  // 		} catch (error) {
  // 			throw new BadRequestException(error);
  // 		}
  // 	};
}
