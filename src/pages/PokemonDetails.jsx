import { useEffect, useRef, useState } from "react";
import { upperFirst } from "../utils/upperFirst";
import { translateName } from "../utils/translateName";
import Pokecard from "../components/Pokecard/Pokecard";
import { createPortal } from "react-dom";
import MakeForm from "../components/MakeForm/MakeForm";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useQuery, useMutation } from "@tanstack/react-query";
import { usePureFetch } from "../hooks/usePureFetch";
import { queryClient } from "../utils/query";
import { motion, AnimatePresence } from "framer-motion";

export default function PokemonDetails() {
  // Variables
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    data: pokemon,
    isLoading: loadingPokemon,
    isError,
    error,
  } = useQuery({
    queryKey: ["pokemon", { id }],
    queryFn: () =>
      usePureFetch(
        isNaN(id)
          ? `https://pokedex-ee6f8-default-rtdb.europe-west1.firebasedatabase.app/pokemons/${id}.json`
          : `https://pokeapi.co/api/v2/pokemon/${id}`,
        (data) => {
          isNaN(id) ? (data.id = id) : (data.id = data.id);
        }
      ),
  });

  const {
    mutate,
    isError: isErrorBis,
    error: errorBis,
  } = useMutation({
    mutationFn: async (updatedPokemon) => {
      const response = await fetch(
        `https://pokedex-ee6f8-default-rtdb.europe-west1.firebasedatabase.app/pokemons/${id}.json`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedPokemon),
        }
      );

      // Error
      if (!response.ok) {
        toast.error("Une erreur est intervenue");
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["pokemon", { id }],
        exact: true,
      });
      setUpdatePokemon(false);
    },
    onMutate: (updatedPokemon) => {
      const previousUpdate = queryClient.getQueryData(["pokemon", { id }]);

      queryClient.setQueryData(["pokemon", { id }], updatedPokemon);

      return { previousUpdate };
    },
    onError: (context) => {
      queryClient.setQueryData(["pokemon", { id }], [context.previousUpdate]);
    },
  });

  const { mutate: onDeletePokemonHandler } = useMutation({
    mutationFn: async () => {
      // Delete
      if (window.confirm("Voulez-vous vraiment supprimer ce pokémon ?")) {
        // Delete from firebase realtime
        const response = await fetch(
          `https://pokedex-ee6f8-default-rtdb.europe-west1.firebasedatabase.app/pokemons/${id}.json`,
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        // Error
        if (!response.ok) {
          toast.error("Une erreur est intervenue.");
        }
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["pokemons"]);
      queryClient.invalidateQueries(["pokemon", { id }]);
      navigate("/");
    },
  });

  // Refs
  const name = useRef("");
  const height = useRef("");
  const weight = useRef("");
  const hp = useRef("");
  const attack = useRef("");
  const defense = useRef("");
  const specialAttack = useRef("");
  const specialDefense = useRef("");
  const speed = useRef("");
  const image = useRef("");
  const types = useRef([]);

  const [loading, setLoading] = useState(false);
  const [updatePokemon, setUpdatePokemon] = useState(false);

  // useEffect(() => {
  //     fetchPokemon();
  // }, []);

  // Modale
  useEffect(() => {
    if (updatePokemon) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [updatePokemon]);

  useEffect(() => {
    if (isError) {
      toast.error(error);
    }
  }, [error, isError]);

  useEffect(() => {
    if (isErrorBis) {
      toast.error(errorBis);
    }
  }, [errorBis, isErrorBis]);

  // Function
  const beforeMutate = () => {
    const updatedPokemon = {
      // General
      id,
      name: name.current.value,
      height: height.current.value / 10, // cm to decimeter
      weight: weight.current.value * 10, // kg to hectogram
      sprites: {
        other: {
          home: {
            front_default: image.current.value,
          },
        },
      },
      // Stats
      stats: [
        {
          base_stat: hp.current.value,
          stat: {
            name: "hp",
          },
        },
        {
          base_stat: attack.current.value,
          stat: {
            name: "attack",
          },
        },
        {
          base_stat: defense.current.value,
          stat: {
            name: "defense",
          },
        },
        {
          base_stat: specialAttack.current.value,
          stat: {
            name: "special-attack",
          },
        },
        {
          base_stat: specialDefense.current.value,
          stat: {
            name: "special-defense",
          },
        },
        {
          base_stat: speed.current.value,
          stat: {
            name: "speed",
          },
        },
      ],
      // Types
      types: [],
    };

    // Loop on types to add them to pokemon if checked
    const typesKeys = Object.keys(types.current);
    typesKeys.forEach((type) => {
      if (types.current[type].checked) {
        updatedPokemon.types.push({
          type: {
            name: type,
          },
        });
      }
    });

    mutate(updatedPokemon);
  };

  if (loading || loadingPokemon) return <div className="text-center">Chargement...</div>;

  if (!pokemon || !pokemon.name) return <div className="text-center">Pokemon non trouvé</div>;

  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 10 },
        visible: { opacity: 1, y: 0 },
      }}
      className="max-w-7xl mx-auto"
      initial="hidden"
      animate="visible"
    >
      <Pokecard pokemon={pokemon} details />

      {isNaN(id) && (
        <div className="flex justify-end gap-4 mt-5">
          <div
            className="text-yellow-pokemon font-semibold hover:text-yellow-300 cursor-pointer"
            onClick={() => setUpdatePokemon(true)}
          >
            Modifier
          </div>
          <div
            className="text-yellow-pokemon font-semibold hover:text-yellow-300 cursor-pointer"
            onClick={onDeletePokemonHandler}
          >
            Supprimer
          </div>
        </div>
      )}

      {createPortal(
        <AnimatePresence>
          {updatePokemon && (
            <div className="bg-black bg-opacity-90 fixed top-0 right-0 bottom-0 left-0 flex justify-center text-black">
              <motion.div
                variants={{
                  hidden: { opacity: 0, y: 50 },
                  visible: { opacity: 1, y: 0 },
                }}
                initial="hidden"
                animate="visible"
                exit="hidden"
                // transition={{ duration: 1, type: "spring" }}
                className="p-8 bg-white cursor-auto rounded-xl max-w-xl w-full my-10 overflow-y-auto"
              >
                {/* Close */}
                <div className="flex justify-end text-black hover:text-yellow-pokemon cursor-pointer">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8"
                    viewBox="0 0 24 24"
                    onClick={(e) => {
                      e.stopPropagation();
                      setUpdatePokemon(false);
                    }}
                  >
                    <g fill="currentColor">
                      <path d="M10.03 8.97a.75.75 0 0 0-1.06 1.06L10.94 12l-1.97 1.97a.75.75 0 1 0 1.06 1.06L12 13.06l1.97 1.97a.75.75 0 0 0 1.06-1.06L13.06 12l1.97-1.97a.75.75 0 1 0-1.06-1.06L12 10.94l-1.97-1.97Z"></path>
                      <path
                        fillRule="evenodd"
                        d="M12.057 1.25h-.114c-2.309 0-4.118 0-5.53.19c-1.444.194-2.584.6-3.479 1.494c-.895.895-1.3 2.035-1.494 3.48c-.19 1.411-.19 3.22-.19 5.529v.114c0 2.309 0 4.118.19 5.53c.194 1.444.6 2.584 1.494 3.479c.895.895 2.035 1.3 3.48 1.494c1.411.19 3.22.19 5.529.19h.114c2.309 0 4.118 0 5.53-.19c1.444-.194 2.584-.6 3.479-1.494c.895-.895 1.3-2.035 1.494-3.48c.19-1.411.19-3.22.19-5.529v-.114c0-2.309 0-4.118-.19-5.53c-.194-1.444-.6-2.584-1.494-3.479c-.895-.895-2.035-1.3-3.48-1.494c-1.411-.19-3.22-.19-5.529-.19ZM3.995 3.995c.57-.57 1.34-.897 2.619-1.069c1.3-.174 3.008-.176 5.386-.176s4.086.002 5.386.176c1.279.172 2.05.5 2.62 1.069c.569.57.896 1.34 1.068 2.619c.174 1.3.176 3.008.176 5.386s-.002 4.086-.176 5.386c-.172 1.279-.5 2.05-1.069 2.62c-.57.569-1.34.896-2.619 1.068c-1.3.174-3.008.176-5.386.176s-4.086-.002-5.386-.176c-1.279-.172-2.05-.5-2.62-1.069c-.569-.57-.896-1.34-1.068-2.619c-.174-1.3-.176-3.008-.176-5.386s.002-4.086.176-5.386c.172-1.279.5-2.05 1.069-2.62Z"
                        clipRule="evenodd"
                      ></path>
                    </g>
                  </svg>
                </div>

                <h2 className="text-3xl font-semibold mb-5">Modifier un pokémon</h2>

                <MakeForm
                  name={name}
                  height={height}
                  weight={weight}
                  hp={hp}
                  attack={attack}
                  defense={defense}
                  specialAttack={specialAttack}
                  specialDefense={specialDefense}
                  speed={speed}
                  image={image}
                  types={types}
                  onFormSubmittedHandler={beforeMutate}
                  pokemon={pokemon}
                />
              </motion.div>
            </div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </motion.div>
  );
}

// export  async function loader({request, params}) {
//     const id = params.id;
// }
