export function getOutfitByTemperature(tempCelsius) {

  if (tempCelsius < 0) {
    return [
      "main_app/assets/01_freezing/jacket.png",
      "01_freezing/pants_freezing.png",
      "01_freezing/scarf_freezing.png"
    ];
  }

  return [];
}
