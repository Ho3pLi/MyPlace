import React from "react"
import "./developerTools.css"

const TermsOfService = () => {
  return (
    <section className="devtools__section">
      <div className="container devtools__container">
        <article className="privacy__card privacy__monochrome">
          <h2>Terms of Service</h2>
          <p><em>Last updated: October 29, 2025</em></p>

          <h3>1. Agreement</h3>
          <p>
            These Terms of Service (“Terms”) govern your use of the Developer
            Tools Chrome extension (the “Service”), developed and operated by
            Daniele Barile, Rho, Italy. By installing or using the Service, you
            agree to these Terms. If you do not agree, you must uninstall and
            discontinue use.
          </p>

          <h3>2. Description of Service</h3>
          <p>
            Developer Tools is a Chrome browser extension designed to improve
            developer productivity by offering utilities such as JSON
            formatting, data conversion, color tools, and workflow dashboards.
            The Service may offer optional Pro features accessible through a
            valid license.
          </p>

          <h3>3. License to Use</h3>
          <p>
            We grant you a personal, non-exclusive, non-transferable, revocable
            license to use the extension for personal or professional purposes,
            in accordance with these Terms.
          </p>
          <p>You may not:</p>
          <ul>
            <li>Reverse-engineer, decompile, or modify the source code;</li>
            <li>Redistribute or resell the extension or its components;</li>
            <li>Use it for unlawful or harmful activities.</li>
          </ul>

          <h3>4. Pro License and Payments</h3>
          <p>
            Certain features are available only under a paid Pro license.
            Payments are processed securely through Stripe. No payment data is
            stored or processed directly by the developer. Licenses are personal
            and may not be shared, sold, or transferred.
          </p>

          <h3>5. Disclaimer of Warranties</h3>
          <p>
            The Service is provided “as is” and “as available.” No guarantees
            are made regarding availability, performance, or fitness for a
            particular purpose.
          </p>
          <p>We disclaim any liability for:</p>
          <ul>
            <li>Loss of data,</li>
            <li>Malfunctions, errors, or downtime,</li>
            <li>Damages arising from improper use or integration with third-party tools.</li>
          </ul>

          <h3>6. Limitation of Liability</h3>
          <p>
            To the maximum extent permitted by law, the developer shall not be
            liable for any indirect, incidental, or consequential damages
            resulting from the use or inability to use the Service.
          </p>

          <h3>7. Modifications</h3>
          <p>
            We reserve the right to modify or discontinue the Service or these
            Terms at any time. Any changes will be published on our website with
            an updated “Last updated” date.
          </p>

          <h3>8. Governing Law and Jurisdiction</h3>
          <p>
            These Terms shall be governed by and construed in accordance with
            the laws of Italy, without regard to conflict-of-law principles. Any
            dispute shall be submitted to the competent courts of Milan, Italy.
          </p>

          <h3>9. Contact</h3>
          <p>
            For questions regarding these Terms or the Privacy Policy, contact:
          </p>
          <p>
            Daniele Barile<br />
            Email: <a href="mailto:daniele.barile.lavoro@gmail.com">daniele.barile.lavoro@gmail.com</a>
          </p>
        </article>
      </div>
    </section>
  )
}

export default TermsOfService
