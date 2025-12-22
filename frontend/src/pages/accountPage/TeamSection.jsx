import { Card } from "../../components/layout/Card.jsx";

const members = [
  {
    name: "Alice Manager",
    email: "alice@acme.com",
    role: "Admin",
    status: "Active",
  },
  { name: "Bob Ops", email: "bob@acme.com", role: "Manager", status: "Active" },
  {
    name: "Cara Finance",
    email: "cara@acme.com",
    role: "Billing",
    status: "Invited",
  },
];

const TeamSection = () => {
  return (
    <Card
      title="Team"
      subtitle="Manage workspace roles and invitations."
      actions={<button className="btn btn-primary">Invite user</button>}
    >
      <div className="table-wrapper">
        <table className="data-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Status</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {members.map((member) => (
              <tr key={member.email}>
                <td>{member.name}</td>
                <td>{member.email}</td>
                <td>{member.role}</td>
                <td>{member.status}</td>
                <td>
                  <button className="btn" type="button">
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
};

export default TeamSection;
