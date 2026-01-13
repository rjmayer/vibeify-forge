Alright. Here’s a **clean, architecture-conformant MVP roadmap** for **Vibeify Forge**, written as if the **MVP Proposal** and **Architecture Brief** were the only inputs. No legacy baggage, no references to anything that came before.

---

# Vibeify Forge — MVP Roadmap

*Architecture-Aligned, Deterministic, Offline-First*

---

## 1. Roadmap Intent

This roadmap defines the concrete delivery plan for the **Vibeify Forge MVP**, strictly aligned with the locked architecture:

* deterministic prompt rendering
* offline-first trust model
* strict engine / extension separation
* minimal, stable contracts
* no accounts, no backend, no silent behaviour

The roadmap prioritises **architectural correctness over feature velocity**. Any milestone that would violate boundaries is explicitly excluded.

---

## 2. Phased Delivery Overview

| Phase | Name                          | Outcome                                 |
| ----: | ----------------------------- | --------------------------------------- |
|     0 | Repo & Guardrails             | Enforced architectural boundaries       |
|     1 | Shared Engine v0.1            | Pure, testable prompt engine            |
|     2 | Extension Skeleton            | Browser shell wired to engine           |
|     3 | Prompt Design Core            | Template → Form → Preview loop          |
|     4 | Local Library & Persistence   | IndexedDB-backed templates & snapshots  |
|     5 | ChatGPT Adapter Integration   | Copy / Insert with fail-soft guarantees |
|     6 | Hardening & Release Readiness | Store-ready, trust-preserving MVP       |

---

## 3. Phase 0 — Repo & Architectural Guardrails

**Goal:** Make it hard to accidentally violate the architecture.

### Deliverables

* Monorepo with enforced package boundaries:

  ```
  packages/
    engine/
    extension/
  ```
* Shared tooling (TypeScript config, linting, formatting)
* CI checks preventing:

  * engine importing browser / DOM APIs
  * circular dependencies
* Architecture README pinned at repo root

### Exit Criteria

* Engine can be built and tested independently
* Extension cannot compile if it imports forbidden engine internals
* Boundaries are mechanically enforced, not “by convention”

---

## 4. Phase 1 — Shared Engine v0.1

**Goal:** Ship a boring, deterministic, reusable prompt engine.

### Scope (Engine Only)

**Must implement:**

* Template parsing
* Placeholder metadata model
* Input validation
* Deterministic rendering
* Snapshot creation
* Engine-owned types and error models

**Must not implement:**

* Defaults injection
* UI concepts
* Storage
* Browser APIs
* Any form of execution logic

### Deliverables

* `parseTemplate(source)`
* `deriveFormSpec(template)`
* `validateInput(template, input)`
* `render(template, input)`
* `createSnapshot(...)`
* Full unit test suite:

  * determinism tests
  * golden render tests
  * validation matrix tests

### Exit Criteria

* Same input → same output, always
* Engine usable from Node without modification
* 100% of prompt rendering logic lives in the engine

---

## 5. Phase 2 — Extension Skeleton

**Goal:** Establish the browser shell without adding logic prematurely.

### Deliverables

* WebExtension scaffold (Chrome first)
* Side-panel UI loads reliably
* Engine imported and callable
* No persistence yet
* No ChatGPT interaction yet

### Architectural Constraints

* Extension orchestrates engine calls
* Engine remains the single source of truth for prompt logic
* UI is allowed to be visually minimal at this stage

### Exit Criteria

* Side panel loads on supported pages
* Engine functions can be called from the extension
* No engine code duplicated in the extension

---

## 6. Phase 3 — Prompt Design Core (Happy Path)

**Goal:** Enable the core loop: *Template → Inputs → Preview*.

### Deliverables

* Template selection (hardcoded examples initially)
* Form auto-generated from engine `FormSpec`
* Live validation feedback
* Live rendered preview
* Strict invariant:

  > Preview text == text that will be copied/inserted

### Explicit Non-Goals

* No template inheritance UI
* No AI assistance
* No execution history
* No “smart defaults” injected silently

### Exit Criteria

* User can fill inputs and see a deterministic preview
* Validation errors are field-level and explicit
* No mutation of prompt text outside the engine

---

## 7. Phase 4 — Local Library & Persistence

**Goal:** Make prompts reusable without introducing trust risk.

### Deliverables

* IndexedDB schema v1:

  * templates
  * snapshots
  * settings
* Versioned migration framework
* Save / load templates
* Save snapshots (inputs + rendered text)
* Export capability (engine-portable)

### Architectural Invariants

* Rendered text is stored verbatim
* Snapshots remain usable even if templates break later
* No cascading deletes
* No cloud sync

### Exit Criteria

* Data survives reloads and extension updates
* Migration code exists from day one
* User can export everything without hidden state

---

## 8. Phase 5 — ChatGPT Adapter Integration

**Goal:** Integrate with ChatGPT without becoming fragile or invasive.

### Deliverables

* Isolated ChatGPT adapter module
* Capability detection (`canInsert`, `canFocus`)
* Copy action (always available)
* Insert action (best-effort)
* Fail-soft behaviour:

  * Copy still works if Insert fails

### Explicit Constraints

* No DOM scraping beyond composer detection
* No reading conversation content
* No auto-send
* No undocumented APIs

### Exit Criteria

* Insert works on supported ChatGPT UI
* Clear user feedback when insertion is unavailable
* Adapter is the only place touching DOM selectors

---

## 9. Phase 6 — Hardening & Release Readiness

**Goal:** Ship a trustworthy MVP, not a fragile demo.

### Deliverables

* UX polish (clarity > beauty)
* Human-readable error messages
* Manual QA checklist completed
* Store assets (description, screenshots)
* Versioned release build
* Changelog with trust disclosures

### Pre-Release Gate (All Must Pass)

* Engine determinism tests green
* Storage migration tested on non-empty DB
* Copy works even if Insert fails
* No new permissions introduced accidentally
* Export/import round-trips cleanly

### Exit Criteria

* Extension approved by store
* New user succeeds without explanation
* Trust claims are technically true

---

## 10. Explicitly Out of Scope for MVP

These are *intentionally excluded* despite being obvious future ideas:

* Accounts or authentication
* Cloud sync
* Prompt marketplaces
* AI-assisted prompt generation
* Template inheritance UI
* Execution analytics
* Codaira integration

Each of these requires a **new trust contract** and therefore a post-MVP phase.

---

## 11. MVP Definition of “Done”

The MVP is complete when:

* Prompt rendering is deterministic and transparent
* Engine is reusable outside the extension
* Data is local, durable, and exportable
* ChatGPT integration is helpful but non-essential
* The system is easy to explain **without caveats**

Or, in Forge terms:

> *If it ever feels like the system is doing something behind the user’s back, it’s not ready to ship.*

---

