Yes — **this is normal with your current setup**, but it’s also **not what you want long-term**.

Let’s break this down precisely and then I’ll give you **the correct production-grade model**.

---

## Why this is happening (what Docker actually sees)

Each **git worktree is a separate directory**:

```
/Projects/Doc-Consult-Agent
/Projects/worktrees/feat-frontend
/Projects/worktrees/feat-backend
```

From Docker’s perspective:

* Different **build context**
* Different **working directory**
* Often different `.env` files
* Sometimes different `docker-compose.yml` paths

➡️ Docker therefore treats them as **separate projects**.

So when you run:

```bash
docker build .
docker compose up
```

inside each worktree, Docker:

* rebuilds images
* creates new containers
* creates new networks
* creates new volumes (unless named)

This is **expected behavior**, not a bug.

---

## What is NOT normal (and should be fixed)

What you’re seeing becomes **problematic** when:

* Images are identical but rebuilt
* Containers duplicate services (ports conflict)
* Volumes are duplicated unintentionally
* Orchestrator agents fight over infra

That means **infra concerns are leaking into feature worktrees**.

---

## The correct mental model (important)

### Git worktrees ≠ runtime environments

| Layer         | Should be shared?                 |
| ------------- | --------------------------------- |
| Source code   | ❌ separate (worktrees)            |
| Docker images | ✅ shared                          |
| Databases     | ✅ shared (or explicitly isolated) |
| Networks      | ✅ shared                          |
| Secrets       | ✅ shared                          |
| Agent logic   | ❌ separate                        |

---

## The CORRECT solution (recommended architecture)

### 🔒 One “infra root”, many code worktrees

Create **one canonical infra directory**:

```
/Projects/infra/
├── docker-compose.yml
├── .env
├── volumes/
└── Makefile
```

Then:

* Docker is run **only from infra/**
* Worktrees are mounted as volumes

---

## Example: shared Docker Compose

```yaml
services:
  backend:
    image: doc-consult-backend:dev
    build:
      context: ../Doc-Consult-Agent
    volumes:
      - ../worktrees/feat-backend:/app
    ports:
      - "8000:8000"
```

Now:

* One image
* One container
* Code swaps instantly when branch changes

---

## If you need multiple environments (rare)

Only then do this:

```bash
docker compose -p doc-consult-frontend up
docker compose -p doc-consult-backend up
```

But this is **explicit isolation**, not accidental.

---

## Quick fixes you can apply TODAY

### 1. Use fixed image names

```dockerfile
FROM node:20
LABEL project=doc-consult-agent
```

and in compose:

```yaml
image: doc-consult-agent:dev
```

---

### 2. Name your volumes explicitly

```yaml
volumes:
  db-data:
    name: doc-consult-db
```

---

### 3. Never build from worktrees

🚫 Do not run Docker inside:

```
/worktrees/*
```

Only from:

```
/Doc-Consult-Agent
```

---

## Best practice for your AI-agent workflow

| Component         | Where it runs          |
| ----------------- | ---------------------- |
| Gemini agents     | Inside worktrees       |
| Docker infra      | Repo root / infra      |
| Databases         | Single shared instance |
| Orchestrator      | Control worktree       |
| Merge coordinator | Control worktree       |

---

## Final verdict (TL;DR)

| Question                                  | Answer                      |
| ----------------------------------------- | --------------------------- |
| Is Docker rebuilding per worktree normal? | ✅ Yes                       |
| Is it desirable?                          | ❌ No                        |
| Should it be changed?                     | ✅ Absolutely                |
| Best fix                                  | Centralized infra directory |

---

If you want next, I can:

* refactor your docker-compose for shared infra
* add guardrails preventing docker runs in worktrees
* add branch-aware container hot-reloading
* add CI that validates compose once

Just say the word.
