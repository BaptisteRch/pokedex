export function translateType(type) {
    switch (type) {
        case "water":
            return "eau";
        case "fire":
            return "feu";
        case "grass":
            return "plante";
        case "electric":
            return "électrique";
        case "ice":
            return "glace";
        case "fighting":
            return "combat";
        case "poison":
            return "poison";
        case "ground":
            return "sol";
        case "flying":
            return "vol";
        case "psychic":
            return "psy";
        case "bug":
            return "insecte";
        case "rock":
            return "roche";
        case "ghost":
            return "spectre";
        case "dark":
            return "ténèbres";
        case "dragon":
            return "dragon";
        case "steel":
            return "acier";
        case "fairy":
            return "fée";
        default:
            return "normal";
    }
}
