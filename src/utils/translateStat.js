export function translateStat(stat) {
    // Translate the name of the pokemon to french
    switch (stat) {
        case "hp":
            return "HP";
        case "attack":
            return "Attaque";
        case "defense":
            return "Défense";
        case "special-attack":
            return "Attaque Spéciale";
        case "special-defense":
            return "Défense Spéciale";
        case "speed":
            return "Vitesse";
        default:
            return stat;
    }
}
