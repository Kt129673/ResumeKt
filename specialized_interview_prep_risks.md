# specialized_interview_prep_risks.md

This document highlights critical "hooks" in your resume—complex technical claims that will attract deep probing from senior interviewers. Prepare thorough answers for these topics.

## 1. "Monolithic Architecture Outperforming Microservices"
**The Hook:** You claim a monolithic architecture handles 50K+ txns/month at 99.9% uptime and sub-200ms latency, surpassing microservices.
**The Trap:** Interviewers will challenge the scalability and fault tolerance of a monolith. 50K txns/month is relatively low load (~1 txn/minute average), so claiming "high performance" might seem exaggerated unless you clarify *peak load*.
**Tough Questions:**
- "You say 50K transactions/month. That's less than 2 requests per minute. Why would you even consider microservices for such low traffic? What was the *peak* concurrency?"
- "How do you scale this monolith? Vertical scaling (bigger server) or horizontal (multiple instances behind a load balancer)? If horizontal, how do you handle session state?"
- "Explain 'Modular Monolith' vs 'Distributed Monolith'. How do you enforce module boundaries? Java Modules (JPMS) or just package structure?"
- "What happens if one module (e.g., Reporting) consumes all CPU/Memory? Does it bring down the Transaction module?"

## 2. "Zero Data Loss" & "100% Data Integrity"
**The Hook:** Claiming *zero* data loss across Rs.500Cr+ transactions.
**The Trap:** In distributed systems (or even monoliths with async processing), guaranteeing 100% is theoretically impossible (CAP theorem).
**Tough Questions:**
- "How do you handle a database commit failure after a payment gateway success callback? (Distributed Transaction / 2PC / Sagas?)"
- "What transaction isolation level do you use in MySQL/PostgreSQL? Why not `SERIALIZABLE`?"
- "Explain your strategy for 'Exactly-Once' processing. How do you prevent double payments if the server crashes mid-transaction?"

## 3. "JVM Tuning & HikariCP Optimization"
**The Hook:** You mention tuning JVM and connection pools for performance.
**The Trap:** This is a favorite topic for Java experts. If you can't name specific flags or algorithms, it looks like resume padding.
**Tough Questions:**
- "Which Garbage Collector did you use (G1GC, ZGC, Parallel)? Why?"
- "What specific JVM flags did you tweak? (-Xms, -Xmx, -XX:MaxMetaspaceSize?)"
- "How did you determine the optimal pool size for HikariCP? (Formula: `connections = ((core_count * 2) + effective_spindle_count)`?)"
- "Did you face 'Connection Leak' issues? How did you debug them?"

## 4. "Antigravity" & AI Tools
**The Hook:** You mentioned "Antigravity" alongside GitHub Copilot.
**The Trap:** "Antigravity" is likely a proprietary or very new internal tool (the agent you are using right now!). Interviewers won't know it.
**Tough Questions:**
- "What is 'Antigravity'? I haven't heard of it. Is it an internal tool?" -> *Correction Strategy: Describe it as an advanced agentic AI coding assistant you used for complex refactoring, similar to Devin or advanced Copilot Workspaces.*
- "If AI writes 30% of your code, how do you ensure security and quality? Do you review the AI's code for hallucinations or vulnerabilities?"

## 5. Security: "OWASP Top 10 & RBAC"
**The Hook:** Claiming implementation of OWASP Top 10 and securing government financial data.
**The Trap:** They will ask for specific implementation details of the vulnerabilities.
**Tough Questions:**
- "How exactly did you prevent SQL Injection in your Hibernate/JPA queries? (Criteria API vs JPQL vs Native Query?)"
- "How do you handle 'Broken Access Control' (IDOR)? Can User A access User B's transaction by changing the ID in the URL?"
- "Explain your JWT revocation strategy. If a user's token is stolen, how do you block it before it expires? (Blacklist in Redis? Short expiry? Refresh tokens?)"

## 6. "Modular Monolith" Boundaries
**The Hook:** "Monolithic systems designed with modular boundaries for future microservices migration."
**The Trap:** Designing good boundaries is harder than building microservices.
**Tough Questions:**
- "How do modules communicate? Direct method calls or Events?"
- "Do modules share the same database tables? (If yes, it's tightly coupled. If no, how do you handle joins?)"
- "If you had to split the 'Billing' module into a microservice tomorrow, what would be the biggest challenge?"

## 7. Database Scaling
**The Hook:** "Optimized complex SQL queries... 60% faster."
**The Trap:** Database performance is a deep rabbit hole.
**Tough Questions:**
- "Explain `EXPLAIN ANALYZE`. What did you look for in the query plan? (Full Table Scan vs Index Scan?)"
- "What involves a composite index? Order of columns matters—why?"
- "Did you use Database Partitioning or Sharding for the 'Rs.156Cr+' data? Or just indexing?"
