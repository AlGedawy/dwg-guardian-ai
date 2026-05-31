# DWG Guardian AI — Production Roadmap

This roadmap converts the current prototype into a production-ready CAD audit product through sequential implementation phases.

## Phase 1 — Persistent Audit Registry

**Status:** In progress

### Objective
Replace one-off browser session results with a reliable audit registry that users can reopen and manage.

### Deliverables
- Persistent local audit registry
- Stable audit IDs
- Audit history page backed by actual generated results
- Open specific audit by ID
- Delete stored audit results
- Route consistency for new scans

### Acceptance criteria
- Every completed audit is stored with a unique ID
- The latest 100 audits remain available after browser refresh
- A stored audit can be opened directly from history
- Audit history no longer depends on demo records

---

## Phase 2 — Cloud Data Layer

**Status:** Planned

### Objective
Move audit persistence from browser-only storage to a secure backend.

### Deliverables
- Firebase project configuration via environment variables
- Firestore collections for users, projects, audits, and findings
- Cloud Storage integration for uploaded files and generated artifacts
- Repository adapter with local fallback for development
- Server-side validation for audit payloads

### Acceptance criteria
- Audit records persist across devices for authenticated users
- Uploaded files are stored securely outside the Git repository
- Audit records are isolated by workspace and user identity

---

## Phase 3 — Real Authentication and Workspace Isolation

**Status:** Planned

### Objective
Replace simulated login with secure identity and workspace access control.

### Deliverables
- Firebase Authentication
- Email/password login
- Demo workspace access mode
- Organization model
- Roles: admin, auditor, viewer
- Protected dashboard routes

### Acceptance criteria
- Unauthorized users cannot access private audit data
- Workspace data is isolated
- Demo mode is visibly separated from authenticated usage

---

## Phase 4 — Deterministic CAD Parsing Engine

**Status:** Planned

### Objective
Introduce rule-driven engineering analysis instead of relying only on an AI prompt.

### Deliverables
- DXF parser worker
- Normalized drawing model
- Layer validation rules
- Duplicate geometry detection
- Text consistency checks
- Scale and plotting readiness checks
- Rule evidence payloads

### Acceptance criteria
- Findings reference actual drawing entities or layers
- Rules are deterministic and testable
- AI explanations are generated from verified findings only

---

## Phase 5 — Reports and Remediation

**Status:** Planned

### Objective
Turn audit results into actionable outputs.

### Deliverables
- PDF report generation
- JSON export
- Report download endpoint
- Remediation suggestions linked to actual findings
- Revision comparison
- Before/after result summary

### Acceptance criteria
- A user can download a real report for any stored audit
- Remediation output is traceable to specific findings
- Revision improvements are measurable

---

## Phase 6 — Production Hardening

**Status:** Planned

### Objective
Prepare the product for real users and pilot customers.

### Deliverables
- Build validation and CI
- Error monitoring
- Rate limiting
- File-size limits
- Storage retention policy
- Security review
- Privacy and terms pages
- Demo-data labels for remaining mock screens

### Acceptance criteria
- CI validates every push
- Production errors are observable
- Uploaded files follow documented retention rules
- Demo values cannot be mistaken for real operational telemetry
