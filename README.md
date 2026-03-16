![Security](https://github.com/programmingp999/devsecops-pipeline-tp/actions/workflows/security.yml/badge.svg)

# DevSecOps Pipeline - Secure Node.js API

[![Security Pipeline](https://github.com/programmingp999/devsecops-pipeline-tp/actions/workflows/security.yml/badge.svg)](https://github.com/programmingp999/devsecops-pipeline-tp/actions)

## Architecture du Pipeline DevSecOps

Le pipeline GitHub Actions (`.github/workflows/security.yml`) est composé de plusieurs étapes de vérification strictes :

1. **🏗️ Build** : Conteneurisation de l'application via Docker.
2. **🔍 SAST (Static Application Security Testing)** : 
   - **Semgrep** : Détection des failles logiques (OWASP Top 10) et des mauvaises pratiques.
   - **CodeQL** : Analyse sémantique native de GitHub pour le suivi des flux de données.
3. **📦 SCA (Software Composition Analysis)** : 
   - **npm audit** : Détection des vulnérabilités (CVE) dans les dépendances tierces.
4. **🔐 Secrets Detection** : 
   - **Gitleaks** : Scan complet de l'historique Git pour empêcher la fuite de credentials (clés API, mots de passe).
5. **🐳 Container Scan** : 
   - **Trivy** : Analyse de l'image Docker (Alpine) pour détecter les failles critiques liées à l'OS.
6. **🚦 Security Gate** : Juge de paix qui bloque le pipeline si l'une des étapes précédentes échoue.
7. **📊 Report** : Génération d'un rapport de sécurité global au format JSON.
8. **⚡ DAST (OWASP ZAP)** : *Optionnel (configuré mais commenté pour optimiser le temps de CI)* - Scan dynamique de l'application en cours d'exécution.

---

## 🔒 Mesures de Sécurité Implémentées (Application)

L'API Node.js a été durcie pour répondre aux standards de sécurité :
- **Protection des En-têtes** : Implémentation de `helmet`.
- **Anti-Bruteforce** : Limitation du nombre de requêtes avec `express-rate-limit`.
- **Validation des Entrées** : Assainissement des données avec `express-validator` pour contrer les injections.
- **Gestion des Secrets** : Utilisation exclusive de variables d'environnement (via `dotenv`), avec obligation d'un JWT Secret robuste (>32 caractères).
- **Conteneur Sécurisé** : Image `node:22-alpine` minimaliste, exécution avec un utilisateur `non-root` (nodejs), et ajout d'un `HEALTHCHECK`.

---


### 1. Cloner le dépôt
```bash
git clone [https://github.com/programmingp999/devsecops-pipeline-tp.git](https://github.com/programmingp999/devsecops-pipeline-tp.git)
cd devsecops-pipeline-tp
