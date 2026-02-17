# Resume Traps & Safe Answers Guide

This document focuses on "Trapping Questions"—questions designed to test if you *really* did what you claim or if you just know the buzzwords.

## 🚨 Section 1: The "Monolith" Traps

### Trap Q1: "You listed 'Monolithic Architecture' as a key strength. Isn't that outdated? Why didn't you migrate to Microservices?"
**The Trap:** They want to see if you are defensive or if you blindly follow trends.
**❌ Wrong Answer:** "Microservices are too complex" or "We didn't have time."
**✅ Safe Answer:** "For our scale (50K transactions/month), a **Modular Monolith** was the pragmatic choice. It eliminated network latency issues (sub-200ms response), simplified our deployment pipeline (single JAR), and maintained transactional integrity (ACID) without complex distributed patterns like Sagas. We designed strictly defined modules (Controller-Service-Repository boundaries) so we *could* split them into microservices later if load increased 10x, but for now, the Monolith offered better performance and lower infrastructure costs."

### Trap Q2: "You claim 'Modular Monolith'. How exactly did you prevent spaghetti code if it's all in one repo?"
**The Trap:** Checking if "Modular" is just a buzzword.
**❌ Wrong Answer:** "We just organized by packages."
**✅ Safe Answer:** "We enforced strict package boundaries. For example, the `Payment` module cannot directly import classes from the `User` module's repository. All communication happens via Service interfaces. We also used specific Maven/Gradle modules (or package-private visibility) to enforce encapsulation, ensuring that a change in one module implies minimal risk to others."

---

## 🚨 Section 2: The "Performance & Reliability" Traps

### Trap Q3: "You claim '99.9% Uptime' and 'Zero Downtime Deployments'. How do you achieve detailed zero downtime with a single Monolith JAR?"
**The Trap:** Catching you on the definition of "Zero Downtime". Restarting a Java app takes time.
**❌ Wrong Answer:** "We just restart the server quickly at night."
**✅ Safe Answer:** "We use a **Blue-Green Deployment** (or Rolling Update) strategy behind a Load Balancer (like Nginx or AWS ALB). We spin up the new version (Green) alongside the old one (Blue). Once the Green instance passes health checks, the Load Balancer switches traffic to it. This ensures users never experience a 'Connection Refused' error during the restart process."

### Trap Q4: "You claim '100% Data Integrity'. What happens if the database crashes *after* you charge the user but *before* you update the order status?"
**The Trap:** The "Two Generals Problem" or distributed transaction failure.
**❌ Wrong Answer:** "We use `@Transactional`, so it never happens." (Exceptions can happen outside the transaction boundary).
**✅ Safe Answer:** "We use **Spring's `@Transactional`** to ensure atomicity within the database. For external calls (like Payment Gateways), we can't roll back the external bank transaction. So, we rely on **Idempotency Keys** and a **Reconciliation Job**. If our DB crashes after payment, a scheduled job queries the Payment Gateway API using the unique Order ID to check the status and syncs our system eventually. '100%' refers to our reconciliation process catching every discrepancy."

---

## 🚨 Section 3: The "AI & Tools" Traps

### Trap Q5: "You use 'Antigravity' and 'GitHub Copilot'. Do you rely on them to write your logic? How do you ensure you understand the code?"
**The Trap:** Suspecting you are a "Script Kiddie" who copy-pastes AI code.
**❌ Wrong Answer:** "It writes 30% of my code, it's great! I barely type anymore."
**✅ Safe Answer:** "I use AI as a 'Pair Programmer', not a replacement. It handles the boilerplate—generating DTOs, unit test scaffolds, and regex patterns—which frees me to focus on the **Business Logic** and **Architecture**. I treat AI suggestions like a junior developer's code: I review every line for security flaws, hallucinations, and performance issues before merging."

### Trap Q6: "If Copilot goes down today, how much does your productivity drop?"
**The Trap:** Testing your fundamental coding skills.
**❌ Wrong Answer:** "I'd stick be really slow."
**✅ Safe Answer:** "My velocity on *boilerplate* tasks would drop, but my problem-solving capability remains the same. I know the Java/Spring APIs by heart; the AI just speeds up the typing and syntax lookup for less common libraries."

---

## 🚨 Section 4: The "DevOps" Traps

### Trap Q7: "You removed Docker/Kubernetes from your skills but list 'AWS Deployment'. How do you deploy without containers?"
**The Trap:** Checking if you understand "Old School" vs "Modern" deployment.
**❌ Wrong Answer:** "I don't know, I just copy files."
**✅ Safe Answer:** "For this architecture, we deploy the executable JAR directly to EC2 instances using **Systemd services** to manage the process lifecycle. While containers are great, running a JAR directly on the VM removes the virtualization overhead for our specific performance needs. We use simple **Bash scripts** triggered by **GitHub Actions** to copy the JAR and restart the service."

### Trap Q8: "You moved from Jenkins to GitHub Actions. Why? What's the downside of GitHub Actions?"
**The Trap:** Expecting you to praise the new tool blindly.
**❌ Wrong Answer:** "GitHub Actions is just better/newer."
**✅ Safe Answer:** "We moved to GitHub Actions for better integration with our repo and to reduce the maintenance overhead of managing a Jenkins master server. However, the downside is **vendor lock-in** (harder to move to GitLab later) and debugging local pipeline failures is harder compared to running a local Jenkins agent."
