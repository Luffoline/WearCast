export function getOutfitByTemperature(temp) {

  let folder = "";

  if (temp < 0) {
    folder = "01_freezing";
  } 
  else if (temp <= 8) {
    folder = "02_chilly";
  } 
  else if (temp <= 14) {
    folder = "03_cool";
  } 
  else if (temp <= 20) {
    folder = "04_mid";
  } 
  else if (temp <= 29) {
    folder = "05_warm";
  } 
  else if (temp <= 35) {
    folder = "06_hot";
  } 
  else {
    folder = "07_scortching";
  }

  if (folder === "01_freezing") {
    return [
      "/assets/01_freezing/jacket.png",
      "/assets/01_freezing/pants_freezing.png",
      "/assets/01_freezing/scarf_freezing.png",
      "/assets/01_freezing/background_freezing.png"
    ];
  }

  if (folder === "02_chilly") {
    return [
      "/assets/02_chilly/sweater.png",
      "/assets/02_chilly/pants_chilly.png",
      "/assets/02_chilly/scarf_chilly.png",
      "/assets/02_chilly/background_chilly.png"
    ];
  }

  if (folder === "03_cool") {
    return [
      "/assets/03_cool/hoodie.png",
      "/assets/03_cool/pants_cool.png",
      "/assets/03_cool/headset.png",
      "/assets/03_cool/background_cool.png"
    ];
  }

  if (folder === "04_mid") {
    return [
      "/assets/04_mid/longsleeve.png",
      "/assets/04_mid/pants_mid.png",
      "/assets/04_mid/backpack.png",
      "/assets/04_mid/background_mid.png"
    ];
  }

  if (folder === "05_warm") {
    return [
      "/assets/05_warm/white_tshirt.png",
      "/assets/05_warm/shorts_warm.png",
      "/assets/05_warm/pixel_sunglasses_warm.png",
      "/assets/05_warm/background_warm.png"
    ];
  }

  if (folder === "06_hot") {
    return [
      "/assets/06_hot/shakasinglet.png",
      "/assets/06_hot/dongri_shorts.png",
      "/assets/06_hot/pixel_sunglasses.png",
      "/assets/06_hot/background_hot.png"
    ];
  }
  
  return [
    "/assets/07_scortching/shorts_scortching.png",
    "/assets/07_scortching/shorts_scortching.png",
    "/assets/07_scortching/firesunglasses.png",
    "/assets/07_scortching/background_scortching.png"
  ];

}