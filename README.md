# Projet Netflix

## Qui suis-je?
Je suis GORCE Max du groupe G4A étudiant en BUT informatique à l'IUT du Limousin. 

## Ce que j’ai retenu du cours

Au travers de ce cours, j’ai surtout retenu que l’architecture logicielle ne consiste pas uniquement à « faire fonctionner » une application, mais à la structurer de manière claire, maintenable et évolutive. L’objectif principal est d’anticiper les évolutions futures, de limiter les dépendances fortes entre les différentes parties du système et de faciliter la compréhension du projet, aussi bien pour soi que pour d’autres développeurs.
J’ai également compris l’importance de la séparation des responsabilités (principe de Single Responsibility), ainsi que la notion de couches (présentation, logique métier, accès aux données). Ces concepts permettent d’avoir un code plus lisible, plus testable et plus simple à faire évoluer.
Enfin, le cours m’a permis de mieux comprendre que les choix d’architecture sont toujours des compromis : il faut trouver un équilibre entre complexité, besoins réels du projet et contraintes de temps ou de technologies.

### Application des concepts d’architecture à partir du titre du projet

Rien qu’à partir du titre du projet, je pense pouvoir appliquer les concepts d’architecture vus en cours en définissant dès le départ une structure claire du site. Cela passe par :

Une séparation nette entre le front-end (interface utilisateur) et le back-end (logique métier et accès aux données)

Une organisation du code en modules ou composants ayant chacun un rôle bien défini

La mise en place de services dédiés pour gérer la logique métier, afin d’éviter qu’elle soit mélangée avec l’affichage ou les contrôleurs

Le titre du site me donne une vision globale de son objectif, ce qui permet d’identifier les grandes responsabilités fonctionnelles. À partir de là, je peux réfléchir à une architecture cohérente avant même d’entrer dans les détails de l’implémentation.

## Commentaires sur le cours

J’ai trouvé ce cours particulièrement intéressant car il apporte une vision plus « professionnelle » du développement. Contrairement à des projets plus simples où l’on se concentre surtout sur le résultat final, ce cours met l’accent sur la qualité du code et de la structure globale du projet.
Même si certains concepts peuvent sembler abstraits au début, ils prennent tout leur sens lorsqu’on commence à travailler sur un projet un peu plus conséquent. Le cours m’a aussi aidé à prendre conscience de certaines erreurs que je faisais auparavant, comme mélanger la logique métier et l’interface utilisateur.

## Où je pense arriver avec ce projet

Avec ce projet, je pense arriver à une application mieux structurée que celles que j’ai pu réaliser auparavant. Mon objectif est de produire un site dont l’architecture est claire, compréhensible et évolutive, même si toutes les fonctionnalités prévues ne sont pas parfaitement abouties.
Je pense également que ce projet va me permettre de gagner en rigueur dans ma façon de coder, notamment en réfléchissant davantage en amont à l’organisation du projet plutôt que de coder directement sans structure définie.
Enfin, j’espère que ce travail me servira de base pour les projets futurs, en réutilisant les bonnes pratiques d’architecture vues en cours et en les adaptant aux besoins spécifiques de chaque projet.

## les trois couches de l'application Netflix
### Couche Présentation (Front-end)
C’est la partie visible par l’utilisateur. Elle permet d’interagir avec le site.

Pages / vues :
- Page d’accueil
- Liste des films / séries
- Page de détail d’un contenu

Composants d’interface :
- Cartes de films/séries
- Boutons (lecture, ajout aux favoris, etc.)

Gestion des actions utilisateur :
- Clics
- Formulaires
- Navigation

### Couche Logique Métier (Back-end)
C’est la couche qui décide quoi faire avec les données.

Contrôleurs / services :
- Récupération des films/séries
- Gestion des utilisateurs
- Gestion des favoris ou de l’historique

Règles métier :
- Quels contenus afficher
- Vérifier si un utilisateur est connecté
- Associer un contenu à un utilisateur

API :
- Endpoints appelés par le front-end

### Couche Données (Persistence)
Elle s’occupe du stockage des informations.

Base de données :
- Films / séries
- Utilisateurs
- Catégories
- Favoris / historique

Entités / modèles :
- Film
- Série
- Utilisateur

Repositories / DAO :
- Accès aux données
- Requêtes SQL ou ORM

# Sur ma page d'accueil voici ce que je vais trouver:
## En-tête (header)
- Nom du site
Menu de navigation :
- Accueil
- Films
- Séries
- Mon profil (ou Connexion)
- Barre de recherche
## Body 
Sous forme de listes ou carrousels :
- 🎥 Films populaires
- ⭐ Contenus recommandés
- 🆕 Nouveautés
- 📂 Par catégories (Action, Comédie, Drame…)
Chaque contenu peut être représenté par :
- Une image (affiche)
- Un titre
- Un bouton « Voir » ou « Détails »
## Pied de page (footer)
- Informations sur le projet
- Mention « Projet étudiant »
- Liens simples (à propos, contact si tu veux)
