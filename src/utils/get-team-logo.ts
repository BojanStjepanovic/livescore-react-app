const images = import.meta.glob("/src/assets/images/logo_*.png", { as: "url" });

const getTeamLogo = async (teamId: number): Promise<string> => {
  const imagePath = `/src/assets/images/logo_${teamId}.png`;

  if (images[imagePath]) {
    try {
      return await images[imagePath]();
    } catch (error: unknown) {
      console.log("Error loading image dynamically:", error);
    }
  }
  return "";
};

export default getTeamLogo;
