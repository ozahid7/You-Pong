import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

/*
[
  {
    "username": "ajafy",
    "firstname": "Abdelhamid",
    "lastname": "Jafy",
    "hash": "password",
    "email": "ajafy@student.1337.ma"
  },
  {
    "username": "ayassir",
    "firstname": "Abderrachid",
    "lastname": "Yassir",
    "hash": "password",
    "email": "ayassir@student.1337.ma"
  },

  {
    "username": "ygbouri",
    "firstname": "Youssef",
    "lastname": "Gbouri",
    "hash": "password123",
    "email": "ygbouri@student.1337.ma"
  },
  {
    "username": "ozahid-",
    "firstname": "Oussama",
    "lastname": "Zahid",
    "hash": "password",
    "email": "ozahid-@student.1337.ma"
  },
  {
    "username": "akharraz",
    "firstname": "Adam",
    "lastname": "Kharraz",
    "hash": "password",
    "email": "akharraz@student.1337.ma"
  },
  {
    "username": "abazerou",
    "firstname": "Abdellah",
    "lastname": "Azeroual",
    "hash": "password123",
    "email": "abazerou@student.1337.ma"
  },
  {
    "username": "momayaz",
    "firstname": "Mohammed",
    "lastname": "Mayaz",
    "hash": "password123",
    "email": "momayaz@student.1337.ma"
  }
]
*/

/*
//CHANNELS DATA


[
    {
        "name": "you pong",
        "description": "9W9",
        "avatar": null,
        "hash": null,
        "type": "PRIVATE"
    },
    {
        "name": "dar",
        "description": "CW9",
        "avatar": null,
        "hash": null,
        "type": "PROTECTED"
    },
    {
        "name": "kooora",
        "description": "chi match",
        "avatar": null,
        "hash": null,
        "type": "PUBLIC"
    }
]




//ROOMS DATA
const rooms = [
    {
        user_role: "MEMBER",
        member_status: "MUTED",
        blocked_users: users[2],
        id_user: users[0],
        id_channel: channels[0]
    }
];

//MESSAGES DATA
const messages = [
    {
        content: "hello from here",
        id_room: rooms[0]
    }
];

//EXECUTE DATA
async function main() {
  await users.forEach((user) => {
    this.prisma.user.create({
      data: {
        username: user.username,
        firstname: user.firstname,
        lastname: user.lastname,
        hash: user.hash,
        email: user.email,
      },
    });
  });

  await channels.forEach((channel)=> {
    this.prisma.channel.create({
        data: {
            name : channel.name,
            description: channel.description,
            type: channel.type,
            users: channel.users
        }
    })
  })

  await rooms.forEach((room) => {
        // this.prisma.
  })
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
*/
