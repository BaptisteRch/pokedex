import { motion } from "framer-motion";

export default function About() {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 10 },
        visible: { opacity: 1, y: 0 },
      }}
      initial="hidden"
      animate="visible"
    >
      <h1 className="text-3xl font-semibold text-center mb-10">À Propos</h1>

      <div className="max-w-2xl mx-auto">
        Pokémon, connue au Japon sous le nom de Pocket Monsters est une franchise créée par Satoshi
        Tajiri en 1996, présente en particulier en jeu vidéo, dans des séries éditées par Nintendo.
        Selon les statistiques de Nintendo en 2010, les jeux Pokémon se sont vendus à environ 250
        millions d’unités. Le jeu vidéo Pokémon Rouge et Bleu s’est vendu à plus de 30 millions
        d’exemplaires, ce qui en fait un record des ventes dans l’histoire du jeu vidéo.
        <br />
        <br />
        La franchise est également exploitée sous forme d'anime, de mangas, et de jeux de cartes à
        collectionner. Dans la série animée homonyme, le personnage principal, Sacha, voyage à
        travers diverses régions fictives dans le but d’attraper de nouvelles sortes de monstres
        éponymes, un concept qu’on retrouve également dans les jeux vidéo de la franchise. Pokémon a
        eu un impact culturel très important dans les pays où il a été introduit, dont le Japon, les
        États-Unis, le Canada, la France et d'autres pays européens.
      </div>
    </motion.div>
  );
}
