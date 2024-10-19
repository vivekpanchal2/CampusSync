const cron = require("node-cron");
const prisma = require("../config/database.js");

const deleteOldEvents = async () => {
  const threeDaysAgo = new Date();
  threeDaysAgo.setDate(threeDaysAgo.getDate() - 3);

  try {
    const deletedEvents = await prisma.event.deleteMany({
      where: {
        timeDate: {
          lt: threeDaysAgo,
        },
      },
    });

    console.log(`${deletedEvents.count} events deleted.`);
  } catch (error) {
    console.error("Error deleting old events:", error);
  } finally {
    await prisma.$disconnect();
  }
};

//Every day 12 o'clock
cron.schedule(
  "0 0 * * *",
  () => {
    console.log("Running scheduled event cleanup");
    deleteOldEvents();
  },
  {
    scheduled: true,
    timezone: "Asia/Kolkata",
  }
);
