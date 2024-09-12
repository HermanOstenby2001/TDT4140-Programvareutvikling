import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient()

async function main() {
    const musikkleker = await prisma.category.upsert({
        where: {name: 'musikkleker'},
        update: {},
        create: {
            name: "musikkleker"
        }
    })

    const sportOgAktivitet = await prisma.category.upsert({
        where: {name: 'sports- og aktivitetsleker'},
        update: {},
        create: {
            name: "sports- og aktivitetsleker"
        }
    })

    const drikkeleker = await prisma.category.upsert({
        where: {name: 'drikkeleker'},
        update: {},
        create: {
            name: "drikkeleker"
        }
    })

    const mimeleker = await prisma.category.upsert({
        where: {name: 'mimeleker'},
        update: {},
        create: {
            name: "mimeleker"
        }
    })

    const quiz = await prisma.category.upsert({
        where: {name: 'quiz'},
        update: {},
        create: {
            name: "quiz"
        }
    })

    const tegneleker = await prisma.category.upsert({
        where: {name: 'tegneleker'},
        update: {},
        create: {
            name: "tegneleker"
        }
    })

    const toPersoner = await prisma.category.upsert({
        where: {name: '2 personer'},
        update: {},
        create: {
            name: "2 personer"
        }
    })

    const annenKategori = await prisma.category.upsert({
        where: {name: 'annet'},
        update: {},
        create: {
            name: "annet"
        }
    })

    const defaultUser = await prisma.user.upsert({
        where: { username: 'Default', },
        update: {},
        create: {
            username: 'Default',
            password: "password",
        }
    });

    const adminUser = await prisma.user.upsert({
        where: { username: 'Admin', },
        update: {},
        create: {
            username: 'Admin',
            password: "password",
            admin: 'ADMIN'
        }
    });

    const gjemsel = await prisma.icebreaker.upsert({
        where: {title: 'Gjemsel'},
        update: {},
        create: {
            title: "Gjemsel",
            description: "Gjem deg!",
            duration: 30,
            difficulty: 1,
            category: sportOgAktivitet.categoryID,
            userID: defaultUser.username
        }
    });

    const sjakk = await prisma.icebreaker.upsert({
        where: {title: 'Sjakk'},
        update: {},
        create: {
            title: "Sjakk",
            description: "Tenk smart",
            duration: 60,
            difficulty: 3,
            category: sportOgAktivitet.categoryID,
            userID: defaultUser.username
        }
    });

    const playstation = await prisma.icebreaker.upsert({
        where: {title: 'Playstation'},
        update: {},
        create: {
            title: "Playstation",
            description: "Game on!",
            duration: 20,
            difficulty: 1,
            category: toPersoner.categoryID,
            userID: defaultUser.username
        }
    });

    const ludo = await prisma.icebreaker.upsert({
        where: {title: 'Ludo'},
        update: {},
        create: {
            title: "Ludo",
            description: "Har du flaks?",
            duration: 40,
            difficulty: 1,
            category: drikkeleker.categoryID,
            userID: defaultUser.username
        }
    });

    const gjemselScore = await prisma.icebreakerScore.create({
        data: {
            icebreaker: gjemsel.icebreakerID,
            userID: defaultUser.username,
            score: 10,
        },
    });

    const gjemselReview1 = await prisma.review.upsert({
        where: {reviewID: 1},
        update: {},
        create: {
            title: "GjemselReview",
            description: "something smart",
            user: adminUser.username,
            icebreaker: gjemsel.icebreakerID
        }
    })

    const queue1 = await prisma.playlist.upsert({
        where: {title: 'playlist1'},
        update: {},
        create: {
            title: "playlist1",
            user: defaultUser.username,
        }
    })

    const report1 = await prisma.report.upsert({
        where: {title: "report1",},
        update: {},
        create: {
            title: "report1",
            admin: "Admin",
            review: gjemselReview1.reviewID
        }
    })
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
