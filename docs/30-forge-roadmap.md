# Vibeify Forge — MVP Project Roadmap

## 1. Overview

**Vibeify Forge** is a browser-based plugin that enables users to design, preview, and reuse structured prompt templates directly alongside ChatGPT.
This roadmap outlines the phases, milestones, dependencies, and success criteria required to bring the MVP from concept to public release while preserving the core design goals:

* Low friction
* Deterministic behaviour
* Offline-first trust
* No forced workflows or accounts

The roadmap is intentionally conservative to avoid over-engineering and to preserve momentum.

---

## 2. Roadmap at a Glance

| Phase | Name                      | Duration | Outcome                                  |
| ----- | ------------------------- | -------- | ---------------------------------------- |
| 1     | Foundation                | 2 weeks  | Stable core engine + extension skeleton  |
| 2     | Core MVP Functionality    | 4 weeks  | Usable prompt designer with live preview |
| 3     | Integration & Reliability | 2 weeks  | Robust ChatGPT interaction + persistence |
| 4     | Polish & Release Prep     | 2 weeks  | Store-ready MVP                          |

**Total Estimated Timeline:** ~10 weeks (including buffer)

---

## 3. Phase 1 — Foundation

**Goal:** Establish a solid technical base without UI or feature creep.

### Milestones

| Milestone              | Deliverable                                          | Dependencies      |
| ---------------------- | ---------------------------------------------------- | ----------------- |
| Engine extraction      | `vibeify-engine` (TypeScript) isolated and buildable | None              |
| Template model         | Canonical template + placeholder model               | Engine extraction |
| Deterministic renderer | Pure render function (inputs → prompt text)          | Template model    |
| Extension shell        | Browser extension loads, panel renders               | None              |
| Build pipeline         | Vite + linting + formatting                          | Extension shell   |

### Key Deliverables

* Shared TypeScript engine (no browser dependencies)
* Deterministic prompt renderer
* Empty but functional side-panel UI

### Resources

* TypeScript
* Vite
* Minimal React scaffold
* WebExtension API

### Risks & Mitigation

| Risk                    | Mitigation                                  |
| ----------------------- | ------------------------------------------- |
| Over-abstracting engine | Keep API surface minimal; no plugins        |
| Browser API friction    | Target Chrome first, abstract Firefox later |

### Success Metrics

* Engine can render a prompt deterministically from fixtures
* Extension loads without errors in Chrome

---

## 4. Phase 2 — Core MVP Functionality

**Goal:** Make Forge genuinely useful for prompt creation and reuse.

### Milestones

| Milestone             | Deliverable                                | Dependencies    |
| --------------------- | ------------------------------------------ | --------------- |
| Template-driven forms | Auto-generated form from template metadata | Engine          |
| Live preview          | Real-time rendered prompt                  | Form system     |
| Local library         | Save/edit/delete templates locally         | Browser storage |
| Snapshot model        | Rendered prompt + inputs captured          | Live preview    |
| Basic UX flow         | End-to-end happy path                      | All above       |

### Key Deliverables

* Form generation from template placeholders
* Live, side-by-side prompt preview
* Local prompt/template persistence (IndexedDB)

### Resources

* React state management
* Browser storage APIs
* Engine renderer

### Risks & Mitigation

| Risk                      | Mitigation                                      |
| ------------------------- | ----------------------------------------------- |
| Form complexity explosion | Limit v1 placeholder types (string, list, enum) |
| Confusing UX              | Always show raw rendered prompt                 |

### Success Metrics

* User can create → preview → save → reopen a prompt
* Zero hidden AI behaviour (preview matches execution)

---

## 5. Phase 3 — Integration & Reliability

**Goal:** Make Forge feel native to the ChatGPT workflow.

### Milestones

| Milestone           | Deliverable                            | Dependencies      |
| ------------------- | -------------------------------------- | ----------------- |
| Insert into ChatGPT | Inject rendered prompt into chat input | Browser APIs      |
| Copy workflows      | One-click copy prompt                  | Snapshot model    |
| Error handling      | Validation + user-visible errors       | All core features |
| Template management | Rename, duplicate, delete              | Local library     |
| Storage hardening   | Migration-safe local storage           | Library           |

### Key Deliverables

* Seamless ChatGPT interaction
* Predictable failure modes
* Stable persistence layer

### Resources

* DOM injection logic
* Defensive validation
* Manual QA passes

### Risks & Mitigation

| Risk                | Mitigation                         |
| ------------------- | ---------------------------------- |
| ChatGPT DOM changes | Isolate selectors, fail gracefully |
| Data loss           | Version storage schema early       |

### Success Metrics

* Prompt insertion works reliably
* No silent failures or corrupted data

---

## 6. Phase 4 — Polish & Release Preparation

**Goal:** Make the MVP presentable, trustworthy, and shippable.

### Milestones

| Milestone           | Deliverable                     | Dependencies     |
| ------------------- | ------------------------------- | ---------------- |
| UX refinement       | Spacing, copy, visual hierarchy | Core MVP         |
| Validation feedback | Inline, human-readable errors   | Error handling   |
| Documentation       | README + onboarding copy        | Feature complete |
| Store packaging     | Chrome Web Store assets         | Stable build     |
| Release candidate   | Tagged MVP build                | All above        |

### Key Deliverables

* Clean, restrained UI
* Clear user guidance
* Store-ready extension package

### Resources

* Copywriting
* Minimal branding
* Store submission checklists

### Risks & Mitigation

| Risk           | Mitigation           |
| -------------- | -------------------- |
| Over-polishing | Timebox UX tweaks    |
| Scope creep    | Hard freeze after RC |

### Success Metrics

* Extension approved by store
* New user can succeed without explanation

---

## 7. Dependencies Summary

* **Critical Path:** Engine → Forms → Preview → Storage → ChatGPT integration
* **Non-blocking:** Firefox support, WASM portability, sync features
* **Explicitly Out of Scope (MVP):**

  * Accounts
  * Cloud sync
  * Marketplaces
  * AI-assisted prompt generation

---

## 8. Resource Assumptions

* 1 primary developer
* Occasional design/UX input
* No backend infrastructure
* No accounts or auth

---

## 9. Risk Register (High-Impact Only)

| Risk                    | Impact     | Mitigation                    |
| ----------------------- | ---------- | ----------------------------- |
| Over-engineering        | Delays MVP | Ruthless scope discipline     |
| ChatGPT UI changes      | Breakage   | Fail-soft design              |
| Feature envy (V2 ideas) | Focus loss | Park in “Future Enhancements” |

---

## 10. MVP Success Criteria (Go / No-Go)

The MVP is **successful** if:

* Users can **design once and reuse prompts effortlessly**
* Rendered prompts are **fully deterministic**
* The tool feels **invisible, not heavy**
* Users trust it without accounts or cloud storage

If those are met, Forge is ready to act as the **entry point** into the wider Vibeify / Codaira ecosystem.

---

