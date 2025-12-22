import { useState } from "react";
import FormField from "../../components/layout/FormField.jsx";
import { Card } from "../../components/layout/Card.jsx";

const ProfileSection = ({ onSubmit }) => {
  const [org, setOrg] = useState({
    companyName: "Acme Distribution",
    website: "https://acme.example.com",
    timezone: "US/Central",
    industry: "Automotive",
  });

  const [address, setAddress] = useState({
    street: "123 Oak St",
    street2: "Suite 200",
    city: "Omaha",
    state: "NE",
    zip: "68134",
    country: "United States",
  });

  function handleOrgChange(e) {
    const { name, value } = e.target;
    setOrg((prev) => ({ ...prev, [name]: value }));
  }

  function handleAddressChange(e) {
    const { name, value } = e.target;
    setAddress((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    onSubmit?.({ org, address });
  }

  return (
    <div className="grid grid-2">
      <Card
        title="Organization profile"
        subtitle="Update what teammates and invoices see."
      >
        <form
          onSubmit={handleSubmit}
          style={{ display: "grid", gap: "0.9rem" }}
        >
          <FormField
            label="Company name"
            name="companyName"
            value={org.companyName}
            onChange={handleOrgChange}
            required
            autoComplete="organization"
          />

          <FormField
            label="Website"
            name="website"
            value={org.website}
            onChange={handleOrgChange}
            autoComplete="url"
          />

          <div className="grid grid-2">
            <FormField
              label="Timezone"
              name="timezone"
              value={org.timezone}
              onChange={handleOrgChange}
            />
            <FormField
              label="Industry"
              name="industry"
              value={org.industry}
              onChange={handleOrgChange}
            />
          </div>

          <button className="btn btn-primary" type="submit">
            Save profile
          </button>
        </form>
      </Card>

      <Card
        title="Billing address"
        subtitle="Used on receipts and tax documents."
      >
        <form
          onSubmit={handleSubmit}
          style={{ display: "grid", gap: "0.9rem" }}
        >
          <FormField
            label="Street"
            name="street"
            value={address.street}
            onChange={handleAddressChange}
            required
            autoComplete="address-line1"
          />
          <FormField
            label="Unit / Suite"
            name="street2"
            value={address.street2}
            onChange={handleAddressChange}
            autoComplete="address-line2"
          />
          <div className="grid grid-2">
            <FormField
              label="City"
              name="city"
              value={address.city}
              onChange={handleAddressChange}
              required
              autoComplete="address-level2"
            />
            <FormField
              label="State/Province"
              name="state"
              value={address.state}
              onChange={handleAddressChange}
              required
              autoComplete="address-level1"
            />
          </div>
          <div className="grid grid-2">
            <FormField
              label="Postal code"
              name="zip"
              value={address.zip}
              onChange={handleAddressChange}
              required
              autoComplete="postal-code"
            />
            <label className="form-field">
              <span>Country</span>
              <select
                name="country"
                value={address.country}
                onChange={handleAddressChange}
              >
                <option>United States</option>
                <option>Canada</option>
                <option>Mexico</option>
                <option>United Kingdom</option>
              </select>
            </label>
          </div>

          <button className="btn btn-primary" type="submit">
            Save address
          </button>
        </form>
      </Card>
    </div>
  );
};
export default ProfileSection;
