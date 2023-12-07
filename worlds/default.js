// Copyright 2022 by Croquet Corporation, Inc. All Rights Reserved.
// https://croquet.io
// info@croquet.io

export function init(Constants) {
    Constants.AvatarNames = [ "newwhite", "madhatter", "marchhare", "queenofhearts", "cheshirecat", "alice"];

    Constants.UserBehaviorDirectory = "behaviors/default";
    Constants.UserBehaviorModules = [
        "lights.js", "football-movements.js"
    ];

    Constants.DefaultCards = [
        {
            card: {
                name:"world model",
                layers: ["walk"],
                type: "3d",
                singleSided: true,
                shadow: true,
                translation:[0, -2, 0],
                placeholder: true,
                placeholderSize: [400, 0.1, 400],
                placeholderColor: 0xe0e0e0,
                placeholderOffset: [0, 0, 0],
                
            }
        },
        {
            card: {
                name: "light",
                layers: ["light"],
                type: "lighting",
                behaviorModules: ["Light"],
                dataLocation: "3OF2-s4U1ZOJduGATmLEIXo1iTkQHd5ZBknKgL5SvqpQJzs7Pzx1YGApJiMqPGE6PGEsPSA-Oio7YSYgYDpgCCsZLTYjBjwOJB4sDRcrfAg3Ljk2OBoEGBYWfWAmIGEsPSA-Oio7YSImLD0gOSo9PCpgPwB9AAIIISx8YiYneScqKyQaIisNLHkaGT8YKg56JQwQfHstPiNiGQ49e2ArLjsuYCMBPgMiCQt3OQskGhcleSp9HQIIfXseHgo7EAo9CB48FRwpegsCLH4OIwY",
                fileName: "/abandoned_parking_4k.jpg",
                dataType: "jpg",
                toneMappingExposure: 1.2
            }
        },
        // football model
        {
            card: {
                translation: [0.2272935019775293, -0.45477470195690817, -7.255904670112656],    
                scale: [0.3097923676078309, 0.3097923676078309, 0.3097923676078309],    
                rotation: [0, 0, 0, 1],    
                layers: ["pointer"],    
                name: "football",    
                dataLocation: "3AfAAWSptWdApVOEeJGmftZ7flvIJivo6ppbWdAjldBMKTU1MTJ7bm4nKC0kMm80Mm8iMy4wNCQ1bygubjRucBQ7NCk0NA0VBBJxA3EOLws3Kwh3dAsuOAkwc24iLixvJiwgKC1vMTQgMik0cHNybywoIjMuNyQzMiRuJw8QcTYYKyktBTh5FBspMjMYDx4WDAcNCzJ5HgA1dTAmJRciJyUGDgJ4AG4lIDUgbnhyMzYycwYoIywTADYeHiwYGHgkOS8nExt4KQo7GzlydTgWNwUuKAomcSo",    
                dataScale: [2.132073633812013, 2.132073633812013, 2.132073633812013],    
                fileName: "football.glb",    
                modelType: "glb",    
                shadow: true,    
                singleSided: true,    
                type: "3d",
                behaviorModules: ["FootballMove"]
            }
        }
        
    ];
}
