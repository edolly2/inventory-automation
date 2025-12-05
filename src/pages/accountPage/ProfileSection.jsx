import { useState } from "react";

const ProfileSection = ({ onSubmit }) => {
  const [form, setForm] = useState({
    companyName: "",
    street: "",
    street2: "",
    city: "",
    state: "",
    zip: "",
    country: "United States",
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    onSubmit?.(form);
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Company Name:
        <input
          type="text"
          name="companyName"
          value={form.companyName}
          onChange={handleChange}
          // required
        />
      </label>

      <label>
        Company Address:
        <input
          type="text"
          name="street"
          value={form.street}
          onChange={handleChange}
          // required
        />
      </label>

      <label>
        Apt / Suite (optional):
        <input
          type="text"
          name="street2"
          value={form.street2}
          onChange={handleChange}
        />
      </label>

      <label>
        City:
        <input
          type="text"
          name="city"
          value={form.city}
          onChange={handleChange}
          // required
        />
      </label>

      <div style={{ display: "flex", gap: 8 }}>
        <label style={{ flex: 1 }}>
          State:
          <input
            type="text"
            name="state"
            value={form.state}
            onChange={handleChange}
            // required
          />
        </label>

        <label style={{ flex: 1 }}>
          ZIP Code:
          <input
            type="text"
            name="zip"
            value={form.zip}
            onChange={handleChange}
            // required
          />
        </label>
      </div>

      <label>
        Country
        <select name="country" value={form.country} onChange={handleChange}>
          <option>United States</option>
          <option>Canada</option>
          <option>Mexico</option>
          <option>United Kingdom</option>
        </select>
      </label>

      <button type="submit" style={{ marginTop: 12 }}>
        Save Changes
      </button>
    </form>
  );
};
export default ProfileSection;
