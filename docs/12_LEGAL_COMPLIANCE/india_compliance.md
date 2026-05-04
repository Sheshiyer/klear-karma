# Legal & Compliance — Klear Karma v2 (India)

## Jurisdiction

Primary: **India** (Bangalore launch, expanding to other metros)
No international operations in MVP.

---

## Business Registration

| Item | Status | Notes |
|------|--------|-------|
| Company type | To register | Private Limited (Pvt Ltd) recommended |
| GST registration | Required if revenue >₹20L | Apply when nearing threshold |
| MSME registration | Optional | Good for government scheme benefits |
| Shop & Establishment Act | Required | State-specific (Karnataka for Bangalore) |

---

## Key Regulations

### Information Technology Act, 2000 (IT Act)
- **Applicability**: All digital platforms in India
- **Requirements**: Privacy policy, terms of service, data protection
- **Compliance**: Standard ToS + Privacy Policy + Cookie consent

### Digital Personal Data Protection Act, 2023 (DPDPA)
- **Applicability**: Processing personal data of Indian residents
- **Key requirements**:
  - Consent before collecting personal data
  - Purpose limitation (only collect what's needed)
  - Data retention limits (delete when purpose served)
  - Right to erasure (user can request data deletion)
  - Data breach notification (72 hours to Data Protection Board)
- **Our approach**: Privacy-by-design, minimal data collection, clear consent flows

### Consumer Protection Act, 2019
- **Applicability**: E-commerce platforms and marketplaces
- **Key requirements**:
  - Clear pricing (no hidden fees)
  - Refund/cancellation policy displayed prominently
  - Grievance redressal mechanism
  - No misleading claims
- **Our approach**: Transparent commission model, clear cancellation policy, in-app complaint system

### Payment and Settlement Systems Act (RBI)
- **Applicability**: Handling customer payments
- **Key requirements**:
  - Use RBI-authorized payment aggregator (Razorpay — compliant)
  - No storing card data on our servers
  - Settlement within T+2 days
- **Our approach**: Razorpay handles all PCI compliance; we never touch card data

---

## Platform Disclaimers

### Health Disclaimer (Required on every page)
> "Klear Karma is a marketplace platform connecting users with independent alternative healing practitioners. We do not provide medical advice, diagnosis, or treatment. Services offered through our platform are complementary/alternative in nature and should not replace professional medical care. Always consult a qualified healthcare provider for medical conditions."

### Practitioner Disclaimer
> "Practitioners on Klear Karma are independent service providers, not employees of Klear Karma. While we verify credentials and facilitate community reviews, we do not guarantee outcomes of any session."

### No Medical Claims Policy
- Platform content MUST NOT claim to "cure", "treat", or "heal" any specific disease
- Practitioners who make such claims will be deplatformed
- Marketing materials use "wellness", "wellbeing", "support" — never "treatment", "cure", "therapy" (except for modalities where "therapy" is the accepted name, e.g., "sound therapy")

---

## Terms of Service (Key Clauses)

1. **Platform role**: Marketplace facilitator only (not service provider)
2. **Practitioner independence**: Not employees; independent contractors
3. **Commission disclosure**: Platform fee clearly stated (no hidden charges)
4. **Cancellation/refund**: Policy as described in Operations Manual
5. **Content ownership**: User-generated reviews belong to users; platform has license to display
6. **Liability limitation**: Platform not liable for session outcomes
7. **Dispute resolution**: Arbitration in Bangalore
8. **Account termination**: Platform can remove users violating ToS
9. **Governing law**: Laws of India, courts of Bangalore

---

## Data Protection Implementation

### Data We Collect

| Data | Purpose | Retention | Basis |
|------|---------|-----------|-------|
| Name, email, phone | Account | Until deletion | Consent |
| Location | Practitioner search | Session only | Consent |
| Payment info | Transactions | As per Razorpay | Contract |
| Session history | Service delivery | 2 years | Legitimate interest |
| Reviews | Community trust | Until deleted by user | Consent |
| Device info | App functionality | 1 year | Legitimate interest |

### Data We Do NOT Collect
- Health conditions or diagnoses
- Biometric data
- Religious or political information
- Genetic data
- Session notes or recordings

### User Rights (DPDPA Compliance)
- **Access**: Users can export their data (JSON download)
- **Correction**: Users can edit profile data anytime
- **Erasure**: Users can delete account (removes all PII within 30 days)
- **Portability**: Data export in machine-readable format

---

## Insurance (Recommended)

| Type | Coverage | Priority |
|------|----------|:---:|
| Professional liability (E&O) | Platform errors causing financial harm | Phase 2 |
| Cyber liability | Data breach costs | Phase 2 |
| General liability | Physical harm claims | Phase 3 |

---

## Compliance Checklist (Pre-Launch)

- [ ] Privacy Policy published (in-app + website)
- [ ] Terms of Service published
- [ ] Health disclaimer on all relevant screens
- [ ] Cookie consent (if web component)
- [ ] Razorpay compliance docs signed
- [ ] DPDPA consent collection flows in signup
- [ ] Data deletion request flow implemented
- [ ] Grievance Officer details displayed (required by IT Act)
- [ ] GST registration (if revenue threshold met)
