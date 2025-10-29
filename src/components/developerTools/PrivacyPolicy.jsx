import React from "react"
import "./developerTools.css"

const PrivacyPolicy = () => {
  return (
    <section className="devtools__section">
      <div className="container devtools__container">
        <article className="privacy__card privacy__monochrome">
          <h2>Privacy Policy</h2>
          <p><em>Last updated: October 29, 2025</em></p>
          <p><em>Effective date: October 29, 2025</em></p>

          <h3>1. Overview</h3>
          <p>
            This Privacy Policy explains how Developer Tools (the “Extension” or
            the “Service”) handles information when you use our Chrome
            extension.
          </p>
          <p>The developer and data controller is:</p>
          <p>
            <strong>Daniele Barile</strong><br />
            Rho, Italy<br />
            Email: <a href="mailto:daniele.barile.lavoro@gmail.com">daniele.barile.lavoro@gmail.com</a>
          </p>
          <p>
            We are committed to protecting your privacy and providing clear
            information about how data is handled.
          </p>

          <h3>2. Data Collection and Use</h3>
          <p>
            The Extension does not collect or store personal data such as names,
            email addresses, browsing history, or personal identifiers.
          </p>
          <p>The only data that may be temporarily accessed includes:</p>
          <ul>
            <li>
              <strong>Clipboard contents</strong> when you actively use
              clipboard‑related features (for example, the JSON formatter). This
              data is processed locally on your device and is not transmitted,
              logged, or stored on any server.
            </li>
            <li>
              <strong>License verification</strong> via a lightweight, anonymous
              check to confirm whether you hold a valid Pro license. This may
              involve a license key or unique token, but not personal data.
            </li>
          </ul>
          <p>
            We do not create or maintain user accounts. License management is
            performed through token‑based validation.
          </p>

          <h3>3. Backend and API Requests</h3>
          <p>
            The Extension may make secure requests to a backend API hosted and
            maintained by the developer (Daniele Barile). These requests:
          </p>
          <ul>
            <li>are used solely to verify license validity or provide specific developer utilities,</li>
            <li>do not include personal information, and</li>
            <li>are transmitted securely using HTTPS.</li>
          </ul>
          <p>
            No data is shared with external parties except as strictly necessary
            for license validation and payment processing.
          </p>

          <h3>4. Payment Processing</h3>
          <p>
            Payments for the Pro license are processed by Stripe, Inc., a
            third‑party payment provider. We do not store or have access to your
            payment details. All payment information is collected and processed
            directly by Stripe in accordance with <a href="https://stripe.com/privacy" target="_blank" rel="noreferrer">Stripe’s Privacy Policy</a>.
          </p>

          <h3>5. Data Retention</h3>
          <p>
            We do not store or retain user data beyond what is technically
            necessary for real‑time functionality or license validation. Where
            used, license tokens are stored securely and can be revoked upon
            request.
          </p>

          <h3>6. Data Security</h3>
          <p>
            We implement reasonable technical and organizational safeguards to
            protect information against unauthorized access, disclosure,
            alteration, or destruction. All communication between the Extension
            and our backend uses encrypted HTTPS connections.
          </p>

          <h3>7. User Rights (GDPR)</h3>
          <p>
            If you are located in the European Economic Area (EEA), you may:
          </p>
          <ul>
            <li>Request access to, correction of, or deletion of data associated with your license,</li>
            <li>Restrict or object to processing, and</li>
            <li>Request information about data handling or lodge a complaint with a supervisory authority.</li>
          </ul>
          <p>
            To exercise these rights, contact us at
            {" "}
            <a href="mailto:daniele.barile.lavoro@gmail.com">daniele.barile.lavoro@gmail.com</a>.
          </p>

          <h3>8. International Use</h3>
          <p>
            Although the developer is based in Italy, the Service is available
            worldwide. By using the Service, you acknowledge that your use may
            involve cross‑border data transfer, handled in accordance with
            applicable data protection laws.
          </p>

          <h3>9. Changes to This Policy</h3>
          <p>
            We may update this Privacy Policy from time to time. Updates will be
            posted on our official website on the Developer Tools page. The
            “Last updated” date reflects the latest revision.
          </p>
        </article>
      </div>
    </section>
  )
}

export default PrivacyPolicy

