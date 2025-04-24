import { translateName } from "../../utils/translateName";
import { translateType } from "../../utils/translateType";
import { translateStat } from "../../utils/translateStat";
import { upperFirst } from "../../utils/upperFirst";
import "./Pokecard.css";
import { Link } from "react-router-dom";

export default function Pokecard({ ref, pokemon, details, ...props }) {
    if (details) {
        return (
            <div
                ref={ref}
                className={`pokecard text-base relative flex md:flex-row flex-col items-center justify-between p-5 m-5 rounded-lg shadow-2xl mt-10 ${pokemon.types[0].type.name} overflow-hidden`}
            >
                {/* Infos */}
                <div className="flex flex-col gap-1 md:w-6/12 w-full md:order-1 order-2 md:mt-0 mt-5 md:text-left text-center">
                    {/* Pokemon ID */}
                    <span
                        className="text-xl font-extrabold"
                        style={{ color: "#0006" }}
                    >
                        #{pokemon.id}
                    </span>
                    {/* Pokemon Name */}
                    <span
                        className="text-5xl font-semibold text-white"
                        style={{
                            textShadow: "0px 0px 10px rgba(0, 0, 0, 0.3)",
                        }}
                    >
                        {upperFirst(translateName(pokemon.name))}
                    </span>
                    {/* Pokemon Types */}
                    <div className="types flex gap-1 text-white text-sm md:justify-normal justify-center mt-1">
                        {pokemon.types.map((type) => (
                            <div
                                key={`${pokemon.name}-${type.type.name}}`}
                                className={`rounded px-1.5 py-1 ${type.type.name} flex items-center gap-1`}
                            >
                                <img
                                    src={`/types/${type.type.name}.svg`}
                                    alt={type.type.name}
                                    className="w-3 h-3"
                                />
                                {upperFirst(translateType(type.type.name))}
                            </div>
                        ))}
                    </div>

                    <div className="bg-black bg-opacity-40 p-5 rounded-lg mt-5 text-left">
                        {/* Pokemon Stats */}
                        <h2 className="text-2xl font-semibold text-white">
                            Statistiques
                        </h2>
                        <div className="stats flex flex-col gap-1 text-white text-base mt-4">
                            {pokemon.stats.map((stat) => (
                                <div
                                    key={`${pokemon.name}-${stat.stat.name}}`}
                                    className={`rounded px-1.5 py-1 ${stat.stat.name} flex items-center justify-between gap-10`}
                                >
                                    <div className="flex items-center gap-1">
                                        <div className="font-extralight min-w-[140px]">
                                            {translateStat(stat.stat.name)}
                                        </div>
                                        <div className="font-bold min-w-[70px]">
                                            {stat.base_stat} %
                                        </div>
                                    </div>
                                    {/* Progression */}
                                    <div className="w-1/2 h-2 bg-black rounded-full">
                                        <div
                                            className={`h-full ${
                                                stat.base_stat < 50
                                                    ? "bg-red-500"
                                                    : "bg-green-500"
                                            } rounded-full`}
                                            style={{
                                                width: `${stat.base_stat / 2}%`,
                                            }}
                                        ></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Image */}
                <div className="md:w-6/12 relative flex flex-col md:order-2 order-1">
                    <img
                        src={pokemon.sprites.other.home.front_default}
                        alt="pokemon"
                        className="md:w-1/2 w-2/3 mx-auto"
                    />
                    <div className="inline-flex gap-5 mx-auto mt-1">
                        {/* Pokemon Height */}
                        <div>
                            <div
                                key={`${pokemon.name}-height}`}
                                className="rounded-xl flex-1 flex items-center justify-between gap-5 bg-black bg-opacity-50 px-4 py-3"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="1em"
                                    height="1em"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        fill="currentColor"
                                        fillRule="evenodd"
                                        d="m13.688 4.142l.964.964a.75.75 0 0 1-1.061 1.06l-.964-.964l-1.06 1.06l1.67 1.672a.75.75 0 0 1-1.06 1.06l-1.671-1.67l-1.061 1.06l.964.964a.75.75 0 1 1-1.06 1.061l-.965-.964l-1.06 1.06l1.67 1.672a.75.75 0 1 1-1.06 1.06l-1.671-1.67l-1.06 1.06l.963.964a.75.75 0 1 1-1.06 1.06l-.964-.963c-.464.469-.799.821-1.034 1.13c-.29.38-.358.604-.358.798c0 .193.068.417.358.797c.303.398.77.868 1.468 1.565l1.446 1.446c.697.697 1.167 1.165 1.565 1.468c.38.29.604.358.797.358c.194 0 .418-.068.798-.358c.397-.303.868-.77 1.564-1.468l8.678-8.678c.697-.696 1.165-1.167 1.468-1.564c.29-.38.358-.604.358-.798c0-.193-.068-.417-.358-.797c-.303-.398-.77-.868-1.468-1.565l-1.446-1.446c-.697-.697-1.167-1.165-1.565-1.468c-.38-.29-.604-.358-.797-.358c-.194 0-.418.068-.798.358c-.309.235-.661.57-1.13 1.034Zm.22-2.227c.514-.392 1.054-.665 1.708-.665c.653 0 1.194.273 1.707.665c.487.372 1.028.913 1.679 1.563l1.52 1.52c.65.65 1.191 1.192 1.563 1.679c.392.513.665 1.054.665 1.707c0 .654-.273 1.194-.665 1.708c-.372.487-.913 1.028-1.563 1.678l-8.752 8.752c-.65.65-1.191 1.191-1.678 1.563c-.514.392-1.054.665-1.708.665c-.653 0-1.194-.273-1.707-.665c-.487-.372-1.028-.913-1.679-1.563l-1.52-1.52c-.65-.65-1.191-1.192-1.563-1.679c-.392-.513-.665-1.054-.665-1.707c0-.654.273-1.194.665-1.708c.372-.487.913-1.028 1.563-1.678l8.752-8.752c.65-.65 1.191-1.191 1.678-1.563Z"
                                        clipRule="evenodd"
                                    ></path>
                                </svg>
                                {pokemon.height / 10} m
                            </div>
                        </div>

                        {/* Pokemon Weight */}
                        <div>
                            <div
                                key={`${pokemon.name}-weight}`}
                                className="rounded-xl flex-1 flex items-center justify-between gap-5 bg-black bg-opacity-50 px-4 py-3"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="1em"
                                    height="1em"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        fill="currentColor"
                                        fillRule="evenodd"
                                        d="M10.944 1.25h2.112c1.838 0 3.294 0 4.433.153c1.172.158 2.121.49 2.87 1.238c.748.749 1.08 1.698 1.238 2.87c.153 1.14.153 2.595.153 4.433v4.112c0 1.838 0 3.294-.153 4.433c-.158 1.172-.49 2.121-1.238 2.87c-.749.748-1.698 1.08-2.87 1.238c-1.14.153-2.595.153-4.433.153h-2.112c-1.838 0-3.294 0-4.433-.153c-1.172-.158-2.121-.49-2.87-1.238c-.748-.749-1.08-1.698-1.238-2.87c-.153-1.14-.153-2.595-.153-4.433V9.944c0-1.838 0-3.294.153-4.433c.158-1.172.49-2.121 1.238-2.87c.749-.748 1.698-1.08 2.87-1.238c1.14-.153 2.595-.153 4.433-.153ZM6.71 2.89c-1.006.135-1.586.389-2.01.812c-.422.423-.676 1.003-.811 2.009c-.138 1.028-.14 2.382-.14 4.289v4c0 1.907.002 3.262.14 4.29c.135 1.005.389 1.585.812 2.008c.423.423 1.003.677 2.009.812c1.028.138 2.382.14 4.289.14h2c1.907 0 3.262-.002 4.29-.14c1.005-.135 1.585-.389 2.008-.812c.423-.423.677-1.003.812-2.009c.138-1.027.14-2.382.14-4.289v-4c0-1.907-.002-3.261-.14-4.29c-.135-1.005-.389-1.585-.812-2.008c-.423-.423-1.003-.677-2.009-.812c-1.027-.138-2.382-.14-4.289-.14h-2c-1.907 0-3.261.002-4.29.14Zm2.042 1.89a19.75 19.75 0 0 1 6.494 0l.425.072a2.75 2.75 0 0 1 2.101 3.734l-.665 1.664a2.02 2.02 0 0 1-2.365 1.209a11.309 11.309 0 0 0-5.486 0a2.02 2.02 0 0 1-2.365-1.21l-.666-1.663a2.75 2.75 0 0 1 2.102-3.734l.425-.071ZM15 6.26a18.25 18.25 0 0 0-6 0l-.426.071A1.25 1.25 0 0 0 7.62 8.03l.666 1.664a.52.52 0 0 0 .608.31c.159-.039.318-.076.477-.109L8.8 8.299a.75.75 0 0 1 1.412-.506l.672 1.877a12.811 12.811 0 0 1 4.224.334a.52.52 0 0 0 .608-.311l.666-1.664a1.25 1.25 0 0 0-.955-1.698L15 6.261ZM7.25 18a.75.75 0 0 1 .75-.75h8a.75.75 0 0 1 0 1.5H8a.75.75 0 0 1-.75-.75Z"
                                        clipRule="evenodd"
                                    ></path>
                                </svg>
                                {pokemon.weight / 10} kg
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
    return (
        <Link to={`/pokemon/${pokemon.id}`}>
            <div
                ref={ref}
                className={`pokecard relative flex items-center hover:scale-105 duration-150 justify-between p-5 cursor-pointer rounded-lg shadow-2xl h-[170px] ${pokemon.types[0].type.name}`}
            >
                {/* Infos */}
                <div className="flex flex-col gap-1 w-5/12">
                    {/* Pokemon ID */}
                    <span
                        className="text-sm font-extrabold"
                        style={{ color: "#0006" }}
                    >
                        #{pokemon.id}
                    </span>
                    {/* Pokemon Name */}
                    <span className="text-3xl font-semibold text-white">
                        {upperFirst(translateName(pokemon.name))}
                    </span>
                    {/* Pokemon Types */}
                    <div className="types flex gap-1 text-white text-xs">
                        {pokemon.types.map((type) => (
                            <div
                                key={`${pokemon.name}-${type.type.name}}`}
                                className={`rounded px-1.5 py-1 ${type.type.name} flex items-center gap-1`}
                            >
                                <img
                                    src={`/types/${type.type.name}.svg`}
                                    alt={type.type.name}
                                    className="w-3 h-3"
                                />
                                {upperFirst(translateType(type.type.name))}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Image */}
                <div className="w-7/12 relative h-[190px]">
                    <div className="absolute right-0 -top-14">
                        <img
                            src={pokemon.sprites.other.home.front_default}
                            alt="pokemon"
                            style={{ maxWidth: "190px", height: 190 }}
                        />
                    </div>
                </div>
            </div>
        </Link>
    );
}
