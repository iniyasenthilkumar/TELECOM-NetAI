# NetSentry AI

## AI-Powered Network Incident Triage Assistant

> **Turn Network Noise Into Actionable Incidents.**

NetSentry AI is an AI-assisted Network Operations platform designed to help network teams handle large volumes of network alerts by correlating related events, identifying meaningful incidents, prioritizing their potential impact, and providing evidence-backed troubleshooting recommendations.

The project is developed for **NexusTiq24 – PS07: Telecom – Network Incident Triage Assistant**.

---

## Live Application

**Live Demo:**  
https://telecom-net-ai.vercel.app/

---

## Project Overview

Modern network environments generate a large number of alerts from routers, switches, links, authentication systems, and monitoring tools.

A single underlying network failure can generate multiple alerts within a short period of time. Manually investigating every alert can result in:

- Alert fatigue
- Duplicate investigations
- Delayed incident response
- Difficulty identifying the actual issue
- Increased workload for network engineers

NetSentry AI addresses this problem by transforming individual alerts into a structured incident view.

Instead of treating every alert independently, the system analyzes relationships between alerts and helps determine which events belong to the same incident.

---

## Problem Statement

### PS07 – Telecom: Network Incident Triage Assistant

Network operations teams receive many overlapping alerts from different network components. Several alerts may represent symptoms of the same underlying failure.

The objective is to build an assistant that can:

- Group duplicate and related alerts into incidents
- Prioritize incidents based on likely impact
- Consult troubleshooting runbooks
- Recommend an initial response
- Provide supporting evidence for recommendations
- Leave unrelated alerts as noise
- Escalate incidents when available runbooks do not provide sufficient guidance

NetSentry AI is designed around these requirements.

---

## Our Approach

The system follows a hybrid architecture that combines **deterministic processing** with **AI-assisted reasoning**.

### Processing Pipeline

```text
Network Alerts
      │
      ▼
Alert Processing
      │
      ▼
Alert Validation
      │
      ▼
Incident Correlation
      │
      ▼
Incident Prioritization
      │
      ▼
Relevant Runbook Retrieval
      │
      ▼
Gemini AI Investigation
      │
      ▼
Evidence-Based Recommendation
      │
      ├──────────────► Human Escalation
      │
      ▼
Incident Dashboard

This separation ensures that predictable operations are handled deterministically while AI is used where contextual reasoning is beneficial.

Key Features
1. Intelligent Alert Correlation

NetSentry AI analyzes incoming alerts and identifies relationships between them using factors such as:

Device
Alert type
Timestamp
Network dependency
Related events
Similar incident patterns

Multiple related alerts can therefore be represented as a single meaningful incident.

2. Incident Prioritization

Identified incidents are prioritized according to their potential operational impact.

Priority levels include:

Critical
High
Medium
Low

This helps network operators focus on the most important incidents first.

3. Alert Noise Reduction

Not every alert represents a separate incident.

The system attempts to distinguish between:

Duplicate alerts
Related alerts
Independent alerts
Unrelated network events

Unrelated alerts are not unnecessarily forced into an incident.

4. Runbook-Based Troubleshooting

NetSentry AI maintains a collection of troubleshooting runbooks for known network conditions.

Example runbooks include:

Router Unreachable
Link Failure
High Latency
Authentication Failure
Packet Loss

Relevant runbooks are retrieved based on the incident context.

5. Retrieval-Augmented Generation

The system uses a Retrieval-Augmented Generation approach to ground AI recommendations in available troubleshooting information.

The process is:

Incident Context
      │
      ▼
Generate / Retrieve Embedding
      │
      ▼
FAISS Similarity Search
      │
      ▼
Relevant Runbook
      │
      ▼
Gemini AI
      │
      ▼
Grounded Recommendation

The system uses:

gemini-embedding-001 for embeddings
FAISS for local similarity retrieval
Gemini for AI-assisted reasoning

This approach helps ensure that recommendations are based on available evidence instead of unsupported assumptions.

AI-Assisted Investigation

Gemini is used for contextual analysis of incidents.

The AI can assist with:

Understanding incident context
Interpreting related alerts
Summarizing the situation
Connecting the incident with relevant troubleshooting guidance
Generating an initial response recommendation

The AI does not replace deterministic incident processing.

Explainability & Evidence

A key design principle of NetSentry AI is explainability.

Instead of providing only an AI-generated answer, the system is designed to present:

Related alerts
Correlation reasoning
Incident priority
Relevant runbook
Supporting evidence
Recommended initial response
Confidence information

This allows a network engineer to understand why the recommendation was generated.

Human-in-the-Loop Escalation

AI should not invent a solution when reliable information is unavailable.

When an incident:

Does not match a known runbook
Contains insufficient information
Has low-confidence reasoning
Represents an unsupported condition

NetSentry AI can recommend escalation to a network engineer.

Example
Unknown Network Condition
          │
          ▼
Available Evidence Checked
          │
          ▼
No Reliable Runbook Found
          │
          ▼
Human Escalation
          │
          ▼
Network Engineer Investigation

This provides a safer approach than forcing every unknown alert into a predefined category.

Incident Scenarios
Scenario 1 – Known Network Failure
Router Unreachable
        +
Link Down
        +
Device Unreachable
        ↓
Correlated Incident
        ↓
Relevant Runbook
        ↓
AI-Assisted Recommendation
Scenario 2 – Duplicate Alerts

Multiple alerts are generated for the same underlying condition.

Alert A
Alert B
Alert C
Alert D
   ↓
Correlation
   ↓
Single Incident

This reduces unnecessary duplicate investigation.

Scenario 3 – Related Alerts

Different alerts occur because of a common network dependency.

Network Link Failure
        ↓
Router Unreachable
        ↓
Multiple Device Alerts
        ↓
Correlation Analysis
        ↓
Single Underlying Incident
Scenario 4 – Unknown Incident

An alert pattern is not covered by the available runbooks.

Unknown Alert
     ↓
No Reliable Match
     ↓
Evidence Presented
     ↓
Human Escalation

The system should not invent a troubleshooting procedure when sufficient evidence is unavailable.

Technology Stack
Technology	Purpose
Python	Backend and core processing
Flask	Web application backend
HTML	Frontend structure
CSS	User interface and styling
JavaScript	Frontend interactions
Gemini API	AI-assisted reasoning
gemini-embedding-001	Text embeddings
FAISS	Local vector similarity search
SQLite	Local data storage
JSON	Alert and configuration data
System Architecture
Frontend Layer

Responsible for:

Dashboard
Incident overview
Alert monitoring
Device information
Runbook information
Analytics
Settings
Backend Layer

Responsible for:

Alert processing
Incident correlation
Priority calculation
Runbook retrieval
AI integration
Evidence handling
Escalation logic
AI Layer

Responsible for:

Contextual investigation
Recommendation generation
Natural language reasoning
Retrieval Layer

Responsible for:

Runbook embeddings
Similarity search
Relevant evidence retrieval
Project Structure
NetSentryAI/
│
├── app.py
├── requirements.txt
├── README.md
│
├── data/
│   ├── alerts.json
│   ├── devices.json
│   └── incidents.json
│
├── runbooks/
│   ├── router_failure.txt
│   ├── link_failure.txt
│   ├── high_latency.txt
│   ├── authentication_failure.txt
│   └── packet_loss.txt
│
├── src/
│   ├── alert_processor.py
│   ├── incident_engine.py
│   ├── risk_engine.py
│   ├── rag_engine.py
│   └── gemini_client.py
│
├── frontend/
│   ├── index.html
│   ├── dashboard.html
│   ├── incident.html
│   ├── style.css
│   └── script.js
│
└── faiss_index/

The structure may evolve during implementation as additional modules are introduced.

Dashboard

The dashboard provides a centralized operational view of network incidents.

It is designed to display information such as:

Critical incidents
High-priority incidents
Active alerts
Affected devices
Incident status
Alert relationships
AI investigation
Runbook recommendations
Evidence
Escalation status

The objective is to allow a network operator to understand the current situation quickly.

Data Flow
                    ┌───────────────────┐
                    │   Network Alerts  │
                    └─────────┬─────────┘
                              │
                              ▼
                    ┌───────────────────┐
                    │ Alert Processing  │
                    └─────────┬─────────┘
                              │
                              ▼
                    ┌───────────────────┐
                    │ Incident Engine   │
                    └─────────┬─────────┘
                              │
                              ▼
                    ┌───────────────────┐
                    │ Priority Engine   │
                    └─────────┬─────────┘
                              │
                              ▼
                    ┌───────────────────┐
                    │ Runbook Retrieval │
                    └─────────┬─────────┘
                              │
                              ▼
                    ┌───────────────────┐
                    │    Gemini AI      │
                    └─────────┬─────────┘
                              │
                    ┌─────────┴─────────┐
                    ▼                   ▼
          ┌──────────────────┐  ┌──────────────────┐
          │ Recommendation   │  │ Human Escalation │
          └──────────────────┘  └──────────────────┘
Installation
Prerequisites

Make sure the following are installed:

Python 3.10 or later
Git
Gemini API key
Clone the Repository
git clone https://github.com/iniyasenthilkumar/NetSentryAI.git
cd NetSentryAI
Install Dependencies
pip install -r requirements.txt
Configure Gemini API

Create a .env file in the project root:

GEMINI_API_KEY=your_api_key_here

Do not commit the .env file or expose your API key publicly.

Run the Application
python app.py

The application runs on:

http://localhost:8000
Development Principles

NetSentry AI follows these principles:

Deterministic Where Possible

Predictable operations such as validation, correlation rules, and prioritization should remain deterministic.

AI Where Reasoning Helps

Gemini is used for contextual interpretation and recommendation generation.

Evidence Before Recommendation

AI recommendations should be supported by retrieved runbook information whenever applicable.

Escalation Over Hallucination

When sufficient evidence is unavailable, the system should escalate rather than invent an answer.

Human-in-the-Loop

The system assists network engineers instead of autonomously making high-impact network changes.

Hackathon Alignment

Hackathon: NexusTiq24

Track: PS07 – Telecom

Problem: Network Incident Triage Assistant

NetSentry AI directly addresses the major requirements of the problem statement:

Requirement	NetSentry AI Approach
Alert grouping	Incident correlation
Duplicate reduction	Alert deduplication and correlation
Impact prioritization	Priority engine
Runbook consultation	Local runbook retrieval
Initial response	AI-assisted recommendation
Evidence	Runbook-based supporting context
Unknown alerts	Human escalation
Explainability	Correlation and recommendation context
Reliability & Failure Handling

The system is designed to handle common failure situations gracefully.

Examples include:

Invalid alert data
Empty alert input
Missing runbooks
AI API failures
Low-confidence results
Unknown alert patterns
Insufficient incident context

Instead of failing silently or producing unsupported recommendations, the system should provide a clear status or escalation path.

Security Considerations

The project follows basic security practices including:

API keys stored outside source code
Environment-based configuration
No hard-coded credentials
Validation of incoming data
Controlled AI inputs
Human approval for high-impact decisions
Future Enhancements

Future versions could include:

Real-time network monitoring integration
SNMP integration
Syslog integration
Network topology visualization
Advanced root-cause analysis
Historical incident analysis
Incident timeline generation
Automated notification systems
Additional troubleshooting runbooks
Role-based access control
Advanced operational analytics
Project Status

Status: Active Development

The project is being developed incrementally with focus on:

Functional incident triage
Alert correlation
Incident prioritization
Gemini integration
Runbook retrieval
Evidence-backed recommendations
Human escalation
End-to-end testing
Project Lead

Iniya S.
Computer Science and Engineering

Developed as part of the NexusTiq24 Hackathon.

Repository

GitHub:
https://github.com/iniyasenthilkumar/TELECOM-NetAI

Vision

NetSentry AI aims to reduce network alert fatigue, accelerate incident triage, and help network engineers make faster, evidence-based decisions.
